import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '@/api/chatApi'

const useSendMessageMutation = (chatId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: string) => {
      const response = await sendMessage(chatId, payload)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listChatMessages', chatId],
      })
    },
  })
}

export default useSendMessageMutation
