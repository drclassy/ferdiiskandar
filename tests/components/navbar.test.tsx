import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
  })

  it('renders the route-ready primary navigation', () => {
    render(<Navbar />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    )
    expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute(
      'href',
      '/#impact',
    )
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/#contact',
    )
  })

  it('hydrates the saved theme and persists toggles between light and dark', async () => {
    localStorage.setItem('fi-theme', 'dark')

    const user = userEvent.setup()

    render(<Navbar />)

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    })

    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toHaveTextContent(
      'Dark',
    )

    await user.click(screen.getByRole('button', { name: /switch to light mode/i }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(localStorage.getItem('fi-theme')).toBe('light')
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toHaveTextContent(
      'Light',
    )
  })

  it('toggles immediately from a pre-rendered dark document state', async () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.style.colorScheme = 'dark'

    const user = userEvent.setup()

    render(<Navbar />)

    await user.click(screen.getByRole('button', { name: /switch to dark mode|switch to light mode/i }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(localStorage.getItem('fi-theme')).toBe('light')
  })
})
