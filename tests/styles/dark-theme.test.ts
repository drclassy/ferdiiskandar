import { readFileSync } from 'node:fs'
import path from 'node:path'

const globalsCssPath = path.resolve(__dirname, '../../app/globals.css')

describe('dark theme styling', () => {
  it('defines the obsidian editorial palette tokens', () => {
    const css = readFileSync(globalsCssPath, 'utf8')

    expect(css).toContain('--fi-paper: #0b0a09;')
    expect(css).toContain('--fi-paper-2: #181411;')
    expect(css).toContain('--fi-ink: #f3eadf;')
    expect(css).toContain('--fi-muted: #b8aa97;')
    expect(css).toContain('--fi-blue: #c98a5c;')
  })

  it('gives the dark homepage a unified warm editorial surface', () => {
    const css = readFileSync(globalsCssPath, 'utf8')

    expect(css).toContain('[data-theme="dark"] .fi-intelligence {')
    expect(css).toContain('linear-gradient(180deg, rgba(24, 20, 17, 0.96), rgba(11, 10, 9, 0.98))')
    expect(css).toContain('[data-theme="dark"] .fi-impact-cell {')
    expect(css).toContain('[data-theme="dark"] .fi-note {')
    expect(css).toContain('[data-theme="dark"] .fi-contact-link:hover {')
    expect(css).toContain('color: #c98a5c;')
  })
})
