import { describe, expect, it } from 'vitest'
import {
  contactCards,
  footerMeta,
  primaryNav,
  sectionIds,
  socialLinks,
  thinkingMeta,
} from '@/lib/site-content'

describe('site content', () => {
  it('defines unique section ids for the homepage architecture', () => {
    const ids = sectionIds.map((section) => section.id)

    expect(ids).toEqual([
      'top',
      'impact',
      'portfolio',
      'expertise',
      'intelligence',
      'vision',
      'field-notes',
      'contact',
    ])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('exposes route-ready navigation while keeping contact targets trust-safe', () => {
    expect(primaryNav[0]).toEqual({ label: 'About', href: '/about' })
    expect(primaryNav.slice(1).every((item) => item.href.startsWith('/#'))).toBe(true)
    expect(contactCards.some((card) => card.href === '#')).toBe(false)
    expect(contactCards[0]?.label).toBe('Strategic Collaboration')
  })

  it('removes stale hard-coded time labels from the thinking surface', () => {
    expect(thinkingMeta.editionLabel).toBe('Current Edition')
    expect(thinkingMeta.lastUpdatedLabel).toBe('Currently evolving')
  })

  it('uses a dynamic footer year', () => {
    expect(footerMeta.year).toBe(new Date().getFullYear())
  })

  it('defines direct social and contact links without placeholders', () => {
    expect(socialLinks).toHaveLength(6)
    expect(
      socialLinks.every((link) => link.href.startsWith('https://') || link.href.startsWith('mailto:')),
    ).toBe(true)
    expect(socialLinks.map((link) => link.href)).not.toContain('#')
  })
})
