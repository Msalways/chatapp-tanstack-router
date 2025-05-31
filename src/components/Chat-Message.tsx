import { Bot, User } from 'lucide-react'

interface ChatMessageProps {
  role: string
  content: string
  timestamp?: Date
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user' || role === 'User'

  return (
    <div
      className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 border'
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message Content */}
      <div
        className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        <div
          className={`px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {content}
          </div>
        </div>
        {timestamp && (
          <div className="text-xs text-gray-500 mt-1 px-2">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  )
}
