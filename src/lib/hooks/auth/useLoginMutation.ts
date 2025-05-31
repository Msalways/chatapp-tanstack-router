import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userLogin } from '@/api/AuthApi'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) =>
      userLogin(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['validate-user-session'],
      }),
  })
}
