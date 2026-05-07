'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { primaryNav } from '@/lib/site-content'

type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'fi-theme'
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme(): ThemeMode {
  return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light'
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark'
}

function getStoredTheme(): ThemeMode | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(saved) ? saved : null
  } catch {
    return null
  }
}

function getDocumentTheme(): ThemeMode | null {
  if (typeof document === 'undefined') return null

  const current = document.documentElement.getAttribute('data-theme')
  return isThemeMode(current) ? current : null
}

function resolveInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  return getStoredTheme() ?? getDocumentTheme() ?? getSystemTheme()
}

function applyTheme(theme: ThemeMode, persist: boolean) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme

  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
}

export default function Navbar() {
  const [theme, setTheme] = useState<ThemeMode>(resolveInitialTheme)

  useEffect(() => {
    const saved = getStoredTheme()
    const initial = saved ?? getDocumentTheme() ?? getSystemTheme()

    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: theme sync from localStorage/system after hydration
    setTheme(initial)
    applyTheme(initial, Boolean(saved))

    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY)
    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (getStoredTheme()) return

      const nextTheme: ThemeMode = event.matches ? 'dark' : 'light'
      setTheme(nextTheme)
      applyTheme(nextTheme, false)
    }

    mediaQuery.addEventListener('change', syncWithSystem)

    return () => {
      mediaQuery.removeEventListener('change', syncWithSystem)
    }
  }, [])

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      applyTheme(nextTheme, true)
      return nextTheme
    })
  }

  return (
    <nav aria-label="Primary navigation" className="fi-nav">
      <div className="fi-shell fi-nav-inner">
        <Link aria-label="Back to homepage" className="fi-brand" href="/">
          <Image
            alt="dr. Ferdi Iskandar"
            className="fi-brand-sig"
            height={44}
            priority
            src="/sign.png"
            width={110}
          />
        </Link>
        <div className="fi-nav-links">
          {primaryNav.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="fi-nav-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <span>Sentra Healthcare AI · Melinda DHAI</span>
          <button
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            className="fi-theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Mode gelap aktif' : 'Mode terang aktif'}
            type="button"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="fi-theme-toggle-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
