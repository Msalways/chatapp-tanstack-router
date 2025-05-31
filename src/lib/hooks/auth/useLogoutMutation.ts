import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userLogout } from '@/api/AuthApi'

const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => userLogout(),
    // onSuccess: () =>
    //   queryClient.invalidateQueries({
    //     queryKey: ['validate-user-session'],
    //   }),
  })
}

export default useLogoutMutation
