import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { listChatsOfAnUser } from '@/api/chatApi'

const useListAllChats = () => {
  const [enabled, setEnabled] = useState(true)

  return useQuery({
    queryKey: ['list-all-chats'],
    queryFn: async () => await listChatsOfAnUser(),
    enabled,
  })
}

export default useListAllChats
