import { render, screen } from '@testing-library/react'
import AboutPage from '@/components/AboutPage'

describe('AboutPage', () => {
  it('renders the dossier-style authority spread', () => {
    render(<AboutPage />)

    expect(
      screen.getByRole('heading', {
        name: /professional positioning, shaped for high-responsibility systems and institutional reality/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /the founder registry/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /operating articles/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/about index/i)).toBeInTheDocument()
    expect(screen.getByText(/at a glance/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /explore systems thinking/i }),
    ).toHaveAttribute('href', '/#portfolio')
    expect(
      screen.getByRole('img', { name: /portrait of dr. ferdi iskandar/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/licensed general practitioner/i)).toBeInTheDocument()
    expect(screen.getAllByText(/hospital ceo dengan 12 tahun pengalaman kepemimpinan/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/participant, minimax developer program/i)).toBeInTheDocument()
    expect(
      screen.getByText(/dr\. ferdi iskandar adalah seorang physician-founder yang bekerja di pertemuan antara care, law, dan intelligence\./i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /dr\. ferdi iskandar bekerja di pertemuan antara healthcare, law, executive leadership, dan applied intelligence lintas sektor\./i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/^hospital ceo dengan 12 tahun pengalaman kepemimpinan$/i),
    ).not.toBeInTheDocument()
  })
})
