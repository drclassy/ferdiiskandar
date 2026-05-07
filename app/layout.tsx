import type { ReactNode } from 'react'
import { Fragment_Mono, Inter } from 'next/font/google'
import { buildSiteMetadata } from '@/lib/site-metadata'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-fragment-mono',
})

export const metadata = buildSiteMetadata()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script: set theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='fi-theme';var d=document.documentElement;var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.setAttribute('data-theme',t);d.style.colorScheme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a className="fi-skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
