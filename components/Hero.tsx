'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import HeroChatColumn from '@/components/HeroChatColumn'

const heroLeftVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
}

const heroItemVariant = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const identityStripVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const identityItems = [
  {
    num: '01',
    title: 'Healthcare Intelligence',
    desc: 'Sistem klinis, care yang akuntabel, dan transformasi institusional',
  },
  {
    num: '02',
    title: 'Education Intelligence',
    desc: 'Pendampingan belajar, dukungan riset, dan structured knowledge work',
  },
  {
    num: '03',
    title: 'Digital Experience Systems',
    desc: 'Website editorial, platform publik, dan permukaan digital berkepercayaan tinggi',
  },
  {
    num: '04',
    title: 'Workforce Intelligence',
    desc: 'Manajemen karyawan, coordination systems, dan visibilitas operasional',
  },
]

export function getHeroMotionState(isMotionReady: boolean, shouldReduce: boolean | null) {
  if (!isMotionReady || shouldReduce) {
    return {
      leftInitial: false as const,
      leftAnimate: 'visible' as const,
      asideInitial: false as const,
      asideAnimate: { x: 0, opacity: 1 },
    }
  }

  return {
    leftInitial: 'hidden' as const,
    leftAnimate: null,
    asideInitial: { x: 60, opacity: 0 },
    asideAnimate: null,
  }
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const leftControls = useAnimation()
  const asideControls = useAnimation()
  const [isMotionReady, setIsMotionReady] = useState(false)
  const heroMotionState = getHeroMotionState(isMotionReady, shouldReduce)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydration-safe motion gate before triggering framer-motion controls
    setIsMotionReady(true)

    if (shouldReduce) {
      leftControls.set('visible')
      asideControls.set({ x: 0, opacity: 1 })
    } else {
      leftControls.start('visible')
      asideControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
      })
    }
  }, [leftControls, asideControls, shouldReduce])

  return (
    <section className="fi-hero">
      <motion.div
        initial={heroMotionState.leftInitial}
        animate={heroMotionState.leftAnimate ?? leftControls}
        variants={heroLeftVariants}
      >
        <motion.div className="fi-eyebrow" variants={heroItemVariant}>
          Founder / Systems Architect / Institutional Operator
        </motion.div>
        <motion.h1 variants={heroItemVariant}>
          Building intelligence systems for
          <br />
          <em>high-responsibility sectors.</em>
        </motion.h1>
        <motion.p className="fi-hero-thesis" variants={heroItemVariant}>
          Founder, systems architect, dan institutional operator yang membangun applied
          intelligence di sektor healthcare, education, workforce, dan digital experience.
        </motion.p>
        <motion.div
          aria-label="Professional identity"
          className="fi-identity-strip"
          variants={identityStripVariants}
        >
          {identityItems.map((id) => (
            <motion.div className="fi-identity-item" key={id.num} variants={heroItemVariant}>
              <span className="fi-num">{id.num}</span>
              <strong>{id.title}</strong>
              <span>{id.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.aside
        className="fi-hero-copy"
        initial={heroMotionState.asideInitial}
        animate={heroMotionState.asideAnimate ?? asideControls}
      >
        <blockquote className="fi-quote">
          &ldquo;Sistem terbaik adalah yang bekerja dalam diam.&rdquo;
          <small>— dr. Ferdi Iskandar</small>
        </blockquote>
        <div className="fi-hero-chat-column">
          <HeroChatColumn />
        </div>
        <div className="fi-hero-actions">
          <Link className="fi-button" href="#vision">
            Baca visinya
          </Link>
          <Link className="fi-button secondary" href="#portfolio">
            Jelajahi systems
          </Link>
        </div>
      </motion.aside>
    </section>
  )
}
