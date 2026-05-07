import { render, screen } from '@testing-library/react'
import { act } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { vi } from 'vitest'
import Hero, { getHeroMotionState } from '@/components/Hero'
import HomePage from '@/components/HomePage'

describe('HomePage', () => {
  it('keeps the hero visible before client motion is ready', () => {
    const state = getHeroMotionState(false, false)

    expect(state.leftAnimate).toBe('visible')
    expect(state.asideAnimate).toEqual({ x: 0, opacity: 1 })
    expect(state.leftInitial).toBe(false)
    expect(state.asideInitial).toBe(false)
  })

  it('server-renders the hero without zero-opacity motion styles', () => {
    const html = renderToString(<Hero />)

    expect(html).toContain('Building intelligence systems for')
    expect(html).not.toContain('opacity:0')
  })

  it('renders a main landmark with the founder sections', () => {
    vi.useFakeTimers()

    render(<HomePage />)

    act(() => {
      // Advance 3s of fake time — enough to complete the typing animation
      // (~2.2s) without infinite-looping under React 19 act-compat.
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('link', { name: /back to homepage/i })).toHaveAttribute(
      'href',
      '/',
    )
    expect(
      screen.getByRole('heading', {
        name: /building intelligence systems for\s*high-responsibility sectors/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /founder, systems architect, dan institutional operator yang membangun applied intelligence di sektor healthcare, education, workforce, dan digital experience\./i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/meet abby/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(
        /halo! saya abby, selamat datang di website dr\. ferdi iskandar\. ada yang bisa abby bantu\?/i,
      ),
    ).toBeInTheDocument()

    vi.useRealTimers()
  })
})
