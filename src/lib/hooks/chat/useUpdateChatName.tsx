import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateChat } from '@/api/chatApi'

const useUpdateChatName = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      chatId,
      payload,
    }: {
      chatId: string
      payload: { name: string }
    }) => {
      return await updateChat(chatId, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-all-chats'],
      })
    },
  })
}

export default useUpdateChatName
