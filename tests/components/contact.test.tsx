import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'

describe('Contact', () => {
  it('never renders dead placeholder links', () => {
    render(<Contact />)

    expect(screen.getByRole('heading', { name: /the right surface for the right conversation/i })).toBeInTheDocument()
    expect(screen.getByText(/setiap channel memiliki fungsi yang berbeda/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/dr-ferdi-iskandar-1b620a3b5/',
    )
    expect(screen.getByRole('link', { name: /x/i })).toHaveAttribute(
      'href',
      'https://x.com/ClaudesyI81047',
    )
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      'mailto:drferdiiskandar@sentrahai.com',
    )
  })
})
