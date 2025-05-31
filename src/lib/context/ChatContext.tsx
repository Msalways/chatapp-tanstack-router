import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import useListAllChats from '../hooks/chat/useListAllChats'
import useNewChatMutation from '../hooks/chat/useNewChatMutation'
import useUpdateChatName from '../hooks/chat/useUpdateChatName'
import type { ReactNode } from 'react'

interface ChatType {
  id: string
  name: string
}

type ChatContextType = {
  selectedChatId: string | null
  setSelectedChatId: (id: string | null) => void
  chats: Array<ChatType>
  isLoadingChats: boolean
  createNewChat: () => Promise<void>
  updateChatName: (chatId: string, data: { name: string }) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  const { data: chats = [], isLoading: isLoadingChats } = useListAllChats()

  const newChatMutation = useNewChatMutation()
  const updateChatNameMutation = useUpdateChatName()

  const createNewChat = useCallback(async () => {
    return await newChatMutation.mutateAsync()
  }, [newChatMutation])

  const updateChatName = useCallback(
    async (chatId: string, data: { name: string }) => {
      return await updateChatNameMutation.mutateAsync({
        chatId,
        payload: data,
      })
    },
    [],
  )

  const value = useMemo(
    () => ({
      selectedChatId,
      setSelectedChatId,
      chats,
      isLoadingChats,
      createNewChat,
      updateChatName,
    }),
    [selectedChatId, chats, isLoadingChats, createNewChat, updateChatName],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
