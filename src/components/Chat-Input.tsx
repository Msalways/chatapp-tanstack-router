import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from './ui/button'

interface ChatInputProps {
  onSend: (content: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }, [value])

  return (
    <div className="p-4 border-t bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 bg-gray-50 rounded-xl p-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 resize-none bg-transparent border-0 outline-none p-2 text-sm placeholder-gray-500 max-h-[120px] overflow-y-auto"
            rows={1}
          />
          <Button
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className={`p-2 rounded-lg transition-colors ${
              disabled || !value.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            }`}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
