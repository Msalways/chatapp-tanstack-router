import axiosInstance from '@/lib/axiosInstance'

const API_URL = '/chats'

const postNewChat = async () => {
  const response = await axiosInstance.post(`${API_URL}/`)
  return response.data
}

const updateChat = async (chatId: string, data: { name: string }) => {
  const response = await axiosInstance.put(`${API_URL}/${chatId}`, data)
  return response.data
}

const sendMessage = async (chatId: string, message: string) => {
  const response = await axiosInstance.post(`${API_URL}/${chatId}/message`, {
    message,
  })
  return response.data
}

const listChatMessages = async (chatId: string) => {
  const response = await axiosInstance.get(`${API_URL}/${chatId}`)
  return response.data
}

const listChatsOfAnUser = async () => {
  const response = await axiosInstance.get(`${API_URL}/`)
  return response.data
}

export {
  postNewChat,
  updateChat,
  sendMessage,
  listChatMessages,
  listChatsOfAnUser,
}
