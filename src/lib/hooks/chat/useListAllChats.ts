import { useQuery } from '@tanstack/react-query'
import { listChatsOfAnUser } from '@/api/chatApi'

const useListAllChats = () => {
  return useQuery({
    queryKey: ['list-all-chats'],
    queryFn: async () => await listChatsOfAnUser(),
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    networkMode: 'always',
  })
}

export default useListAllChats
