'use client'

import { useEffect, useState } from 'react'

export function useMotionReady() {
  const [isMotionReady, setIsMotionReady] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydration-safe motion gate, post-mount flag flip
    setIsMotionReady(true)
  }, [])

  return isMotionReady
}
