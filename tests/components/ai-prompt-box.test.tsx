import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { PromptInputBox } from '@/components/ui/ai-prompt-box'

describe('PromptInputBox', () => {
  it('shows the Abby typing line inside the prompt head', () => {
    vi.useFakeTimers()

    render(<PromptInputBox />)

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByText(/meet abby/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(
        /halo! saya abby, selamat datang di website dr\. ferdi iskandar\. ada yang bisa abby bantu\?/i,
      ),
    ).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('sends the typed message through the provided handler', async () => {
    const onSend = vi.fn()
    const user = userEvent.setup()

    render(<PromptInputBox onSend={onSend} />)

    await user.type(screen.getByRole('textbox', { name: /prompt message/i }), 'Halo Dex')
    await user.click(screen.getByRole('button', { name: /kirim pesan/i }))

    expect(onSend).toHaveBeenCalledWith('Halo Dex', [])
  })
})
