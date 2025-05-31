// src/routes/Chat/$chatId.tsx - Debug version
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Bot } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

import useSendMessageMutation from '@/lib/hooks/chat/useSendMessageMutation'
import { useChat } from '@/lib/context/ChatContext'
import { ChatMessage } from '@/components/Chat-Message'
import { ChatInput } from '@/components/Chat-Input'
import useListChatMessages from '@/lib/hooks/chat/useListChatMessages'

export const Route = createFileRoute('/Chat/_layout/$chatId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { chatId } = Route.useParams()
  const { setSelectedChatId, chats } = useChat()
  const [chatName, setChatName] = useState('')
  const queryClient = useQueryClient()

  const [isTyping, setIsTyping] = useState(false)

  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    error: messagesError,
    refetch,
  } = useListChatMessages(chatId)

  useEffect(() => {
    if (chatId) {
      // Remove ALL chat message queries from cache
      // queryClient.removeQueries({
      //   queryKey: ['listChatMessages'],
      // })

      // Set selected chat
      setSelectedChatId(chatId)
      setChatName(chats.find((c) => c.id === chatId)?.name ?? '')
    }
  }, [chatId, setSelectedChatId, queryClient])

  const sendMessageMutation = useSendMessageMutation(chatId)

  const handleSend = async (content: string) => {
    if (!chatId) {
      toast('No chat selected')
      return
    }
    try {
      setIsTyping(true)
      await sendMessageMutation.mutateAsync(content)

      console.log('Message sent successfully, clearing cache and refetching')

      // Clear cache and refetch
      queryClient.removeQueries({
        queryKey: ['listChatMessages', chatId],
      })

      // Wait a bit then refetch
      setTimeout(() => {
        refetch()
      }, 100)
    } catch (error) {
      toast.error('Failed to send message')
      console.error('Send message error:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const isLoading = isLoadingMessages
  const isError = !!messagesError || sendMessageMutation.isError
  const error = messagesError || sendMessageMutation.error
  const isPending = sendMessageMutation.isPending

  return (
    <div className="flex flex-col h-full">
      {/* Debug Panel - Remove this in production */}
      {/* <div className="bg-yellow-100 p-2 text-xs border-b">
        <strong>DEBUG:</strong> ChatId: {chatId} | Messages: {messages.length} |
        Loading: {isLoading.toString()} | Fetching: {isFetching.toString()}
      </div> */}

      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-gray-900">
            Chat:- {chatName || chatId.slice(0, 8)}
          </h2>
          <p className="text-sm text-gray-500">AI Assistant</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-32">
              <div className="text-sm text-gray-500">
                Loading messages for chat {chatId}...
              </div>
            </div>
          )}

          {isError && (
            <div className="p-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">
                  Error loading messages: {(error as any)?.message}
                </p>
                <button
                  onClick={() => refetch()}
                  className="mt-2 text-xs bg-red-100 px-2 py-1 rounded"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!isLoading && messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[400px] text-gray-500">
              <div className="text-center">
                <Bot size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Start a conversation
                </p>
                <p className="text-sm">
                  Send a message to begin chatting with the AI assistant.
                </p>
                <p className="text-xs mt-2 text-gray-400">Chat ID: {chatId}</p>
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="py-4">
              {messages.map(
                (
                  msg: {
                    id: string
                    role: string
                    message: string
                    createdAt: Date
                  },
                  index: number,
                ) => (
                  <div key={`${chatId}-${msg.id}-${index}`} className="mb-1">
                    <div className="text-xs text-gray-400 px-4">
                      Msg ID: {msg.id} | Chat: {chatId}
                    </div>
                    <ChatMessage
                      role={msg.role}
                      content={msg.message}
                      timestamp={msg.createdAt}
                    />
                  </div>
                ),
              )}

              {/* Typing Indicator */}
              {(isTyping || isPending) && (
                <div className="flex gap-3 p-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border">
                    <Bot size={16} className="text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput
        onSend={handleSend}
        disabled={isPending || isTyping}
        placeholder={`Type your message for chat ${chatId.slice(0, 8)}...`}
      />
    </div>
  )
}
