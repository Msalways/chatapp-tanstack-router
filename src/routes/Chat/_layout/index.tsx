// src/routes/Chat/index.tsx - Keep your original route path
import { MessageCircle, Plus } from 'lucide-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useChat } from '@/lib/context/ChatContext'
import { listChatsOfAnUser } from '@/api/chatApi'

// Change back to your original route path
export const Route = createFileRoute('/Chat/_layout/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const { queryClient } = context
    queryClient.ensureQueryData({
      queryKey: ['list-all-chats'],
      queryFn: async () => await listChatsOfAnUser(),
    })
  },
})

function RouteComponent() {
  const navigate = useNavigate()
  const { createNewChat, updateChatName, chats, isLoadingChats } = useChat()
  // const { data: chats, isLoading, error } = useListAllChats()

  // type NewChatResponse = {
  //   chat?: { id?: string; name?: string }
  //   message?: string
  // }
  const handleCreateNewChat = async () => {
    try {
      const newChat: any = await createNewChat()

      // If createNewChat returns void, newChat will be undefined
      const id = newChat?.chat?.id
      console.log(id)

      if (id) {
        navigate({ to: `/Chat/${id}` })
      }
    } catch (error) {
      console.error('Failed to create new chat:', error)
    }
  }

  const handleRename = async (chatId: string) => {
    const newName = prompt('Enter new chat name:')
    if (newName && newName.trim()) {
      try {
        await updateChatName(chatId, { name: newName.trim() })
        toast.success('Chat renamed successfully')
      } catch (err: any) {
        console.error('Rename failed:', err)
        toast.error(err?.response?.data?.message ?? 'Rename failed')
      }
    }
  }

  if (isLoadingChats) return <div>Loading chats...</div>
  // if (error) return <div>Error loading chats.</div>

  return (
    <div className="h-full flex flex-col items-center bg-gray-50 p-8">
      <div className="text-center max-w-md mx-auto mb-10">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle size={32} className="text-blue-500" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Welcome to Chat
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Start a conversation with our AI assistant. Select an existing chat or
          create a new one.
        </p>

        <button
          onClick={handleCreateNewChat}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus size={18} />
          Start New Chat
        </button>
      </div>

      {/* List of Chats */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Chats</h3>
        <ul className="space-y-4">
          {chats?.map((chat: any) => (
            <li
              key={chat.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div className="flex-1">
                <p className="text-gray-900 font-medium">
                  {chat.name || 'Untitled Chat'}
                </p>
                <p className="text-sm text-gray-500">ID: {chat.id}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleRename(chat.id)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate({ to: `/Chat/${chat.id}` })}
                  className="text-green-600 hover:underline text-sm"
                >
                  Open
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        💡 <strong>Tip:</strong> Use Shift + Enter to add line breaks
      </div>
    </div>
  )
}
