'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { getRevealInitial, motionVariants, staggerContainer, motionViewport, transitions } from '@/lib/motion-variants'
import { useMotionReady } from '@/lib/use-motion-ready'

const briefs = [
  {
    title: 'Local-first medical intelligence',
    body: 'AI kesehatan tidak selalu harus cloud-only. Untuk banyak konteks Indonesia, local inference, privacy boundary, dan modular deployment dapat menjadi pembeda strategis.',
    tag: 'Signal / Infrastructure',
  },
  {
    title: 'Clinical trust is a product feature',
    body: 'Trust tidak muncul dari model yang besar saja. Trust lahir dari audit trail, explainability, calibration, dan proses validasi bersama klinisi.',
    tag: 'Signal / Governance',
  },
  {
    title: 'From chatbot to care layer',
    body: 'Nilai AI di kesehatan akan bergeser dari percakapan menuju lapisan kerja: triage, documentation, retrieval, risk scoring, dan clinical coordination.',
    tag: 'Signal / Product',
  },
]

export default function Intelligence() {
  const shouldReduce = useReducedMotion()
  const isMotionReady = useMotionReady()
  const revealInitial = getRevealInitial(isMotionReady, shouldReduce, 'hidden')

  return (
    <section className="fi-section" id="intelligence">
      <div className="fi-intelligence">
        <motion.div
          className="fi-section-head"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={motionVariants.slideIn}
          transition={shouldReduce ? { duration: 0 } : transitions.medium}
        >
          <div className="fi-kicker">Artificial Intelligence Intelligence Brief</div>
          <div>
            <h2 className="fi-section-title">Signals worth watching.</h2>
            <p className="fi-section-lead">
              Bukan feed berita generik. Ini adalah ruang editorial untuk membaca arah AI
              yang relevan dengan sektor berisiko tinggi, terutama kesehatan: model lokal,
              clinical safety, governance, dan workflow adoption.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="fi-intelligence-grid"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.15, 0.1)}
          transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
        >
          {briefs.map((brief) => (
            <motion.article
              className="fi-brief"
              key={brief.title}
              variants={motionVariants.blurIn}
              transition={shouldReduce ? { duration: 0 } : transitions.slow}
            >
              <div>
                <h3>{brief.title}</h3>
                <p>{brief.body}</p>
              </div>
              <footer>{brief.tag}</footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
