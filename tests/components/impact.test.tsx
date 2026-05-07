import { render, screen } from '@testing-library/react'
import Impact from '@/components/Impact'

describe('Impact', () => {
  it('frames leadership as high-responsibility execution rather than clinical-only authority', () => {
    render(<Impact />)

    expect(
      screen.getByRole('heading', { name: /leadership under real responsibility\./i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /ini adalah rekam jejak seorang founder-operator yang membangun intelligence systems di bawah tekanan institusional, kompleksitas operasional, dan tuntutan public trust\./i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/education intelligence systems/i)).toBeInTheDocument()
    expect(screen.getByText(/workforce coordination systems/i)).toBeInTheDocument()
  })
})
