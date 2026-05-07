import { vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: 'font-inter' }),
  Fragment_Mono: () => ({ variable: 'font-fragment-mono' }),
}))

import RootLayout from '@/app/layout'

describe('RootLayout', () => {
  it('suppresses hydration warnings for the html theme attribute', () => {
    const element = RootLayout({
      children: <main id="main-content">Content</main>,
    })

    expect(element.props.suppressHydrationWarning).toBe(true)
  })

  it('bootstraps the stored theme before first paint', () => {
    const html = renderToStaticMarkup(
      RootLayout({
        children: <main id="main-content">Content</main>,
      }),
    )

    expect(html).toContain("var k='fi-theme'")
    expect(html).toContain('localStorage.getItem(k)')
    expect(html).toContain('d.style.colorScheme=t')
  })
})
