import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders the signature plate with the public sign asset', () => {
    render(<Footer />)

    expect(screen.getByRole('img', { name: /signature of dr\. ferdi iskandar/i })).toHaveAttribute(
      'src',
      expect.stringContaining('sign.png'),
    )
  })
})
