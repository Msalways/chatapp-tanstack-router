import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userSignup } from '@/api/AuthApi'

const useSignupMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { email: string }) => await userSignup(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['list-all-users'],
      }),
  })
}

export default useSignupMutation
