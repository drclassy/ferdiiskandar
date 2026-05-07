import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ChatGuide from '@/components/ChatGuide'

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('ChatGuide', () => {
  it('renders a floating toggle button', () => {
    render(<ChatGuide />)
    expect(
      screen.getByRole('button', { name: /buka chat ai guide/i }),
    ).toBeInTheDocument()
  })

  it('opens the chat panel when toggle is clicked', async () => {
    const user = userEvent.setup()
    render(<ChatGuide />)

    await user.click(screen.getByRole('button', { name: /buka chat ai guide/i }))

    expect(
      screen.getByRole('dialog', { name: /ai guide chat panel/i }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/selamat datang/i)).not.toBeInTheDocument()
  })

  it('closes the chat panel when toggle is clicked again', async () => {
    const user = userEvent.setup()
    render(<ChatGuide />)

    await user.click(screen.getByRole('button', { name: /buka chat ai guide/i }))
    await user.click(screen.getByRole('button', { name: /tutup chat ai guide/i }))

    expect(
      screen.queryByRole('dialog', { name: /ai guide chat panel/i }),
    ).not.toBeInTheDocument()
  })

  it('sends message and displays reply', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          reply: 'Halo! Ada yang bisa saya bantu tentang dr. Ferdi Iskandar?',
        }),
    })

    const user = userEvent.setup()
    render(<ChatGuide />)

    await user.click(screen.getByRole('button', { name: /buka chat ai guide/i }))
    await user.type(
      screen.getByRole('textbox', { name: /ketik pesan/i }),
      'Siapa Ferdi Iskandar?',
    )
    await user.click(screen.getByRole('button', { name: /kirim pesan/i }))

    expect(mockFetch).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Siapa Ferdi Iskandar?' }),
    })

    expect(
      await screen.findByText(
        /Halo! Ada yang bisa saya bantu tentang dr. Ferdi Iskandar\?/,
      ),
    ).toBeInTheDocument()
  })
})
