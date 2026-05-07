import { render, screen } from '@testing-library/react'
import Portfolio from '@/components/Portfolio'

describe('Portfolio', () => {
  it('frames the dossier as cross-sector intelligence systems capability', () => {
    render(<Portfolio />)

    expect(
      screen.getByRole('heading', {
        name: /not products for show\.systems across sectors\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /dari healthcare systems dan education systems hingga workforce systems dan digital experience yang berhadapan langsung dengan publik/i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/education systems/i)).toBeInTheDocument()
    expect(screen.getByText(/workforce systems/i)).toBeInTheDocument()
  })
})
