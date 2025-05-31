import { useMutation } from '@tanstack/react-query'
import { userLogout } from '@/api/AuthApi'

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => userLogout(),
    // onSuccess: () =>
    //   queryClient.invalidateQueries({
    //     queryKey: ['validate-user-session'],
    //   }),
  })
}

export default useLogoutMutation
