import { useQuery } from '@tanstack/react-query'
import { listChatMessages } from '@/api/chatApi'

const useListChatMessages = (chatId: string) => {
  console.log(chatId)

  return useQuery({
    queryKey: ['listChatMessages', chatId],
    queryFn: async () => {
      const response = await listChatMessages(chatId)
      console.log('Response', response)

      return response
    },
    enabled: !!chatId,
    retry: false,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    networkMode: 'always',
  })
}

export default useListChatMessages
