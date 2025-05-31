import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNewChat } from '@/api/chatApi'

const useNewChatMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => await postNewChat(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['list-all-chats'],
      }),
  })
}

export default useNewChatMutation
