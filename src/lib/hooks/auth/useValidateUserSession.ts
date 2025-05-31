import { useQuery } from '@tanstack/react-query'
import { getValidateData } from '@/api/userApi'

export const useValidationUserSession = (enabled = true) => {
  return useQuery({
    queryKey: ['validate-user-session'],
    queryFn: async () => await getValidateData(),
    refetchInterval: 1000 * 60 * 1,
    retry: false,
    enabled,
  })
}
