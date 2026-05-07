import { describe, expect, it } from 'vitest'
import { getRevealInitial } from '@/lib/motion-variants'

describe('getRevealInitial', () => {
  it('disables hidden initial state before client motion is ready', () => {
    expect(getRevealInitial(false, false, 'hidden')).toBe(false)
  })

  it('disables hidden initial state when reduced motion is enabled', () => {
    expect(getRevealInitial(true, true, 'hidden')).toBe(false)
  })

  it('keeps the requested hidden state after motion is ready', () => {
    expect(getRevealInitial(true, false, 'hidden')).toBe('hidden')
  })

  it('supports object-based initial states for slide and fade variants', () => {
    const hiddenState = { x: 48, opacity: 0 }

    expect(getRevealInitial(false, false, hiddenState)).toBe(false)
    expect(getRevealInitial(true, false, hiddenState)).toEqual(hiddenState)
  })
})
