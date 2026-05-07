'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  to: number
  duration?: number
  className?: string
}

export default function CountUp({ to, duration = 1.8, className }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: snap to final count when reduced motion is preferred
      setCount(to)
      return
    }
    if (!isInView) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, to, duration, shouldReduce])

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  )
}
