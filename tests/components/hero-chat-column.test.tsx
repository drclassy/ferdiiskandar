import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import HeroChatColumn from '@/components/HeroChatColumn'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('HeroChatColumn', () => {
  it('starts without a canned assistant welcome bubble', () => {
    render(<HeroChatColumn />)

    expect(screen.getByText(/meet abby/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/selamat datang\. saya pemandu ai untuk profil dr\. ferdi iskandar/i),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/ruang percakapan awal untuk pertanyaan strategis/i)).not.toBeInTheDocument()
  })

  it('sends a question to the chat route and renders the reply', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          reply: 'Sentra membangun systems yang membantu membaca sinyal, risiko, dan konteks.',
        }),
    })

    const user = userEvent.setup()

    render(<HeroChatColumn />)

    await user.type(
      screen.getByRole('textbox', { name: /prompt message/i }),
      'Apa fokus utama Sentra?',
    )
    await user.click(screen.getByRole('button', { name: /kirim pesan/i }))

    expect(mockFetch).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Apa fokus utama Sentra?' }),
    })

    expect(
      await screen.findByText(
        /Sentra membangun systems yang membantu membaca sinyal, risiko, dan konteks\./i,
      ),
    ).toBeInTheDocument()
  })
})
