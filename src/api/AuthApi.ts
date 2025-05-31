import axiosInstance from '@/lib/axiosInstance'

const API_URL = '/Auth'

const userLogin = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(`${API_URL}/login`, data)
  return response.data
}

const userLogout = async () => {
  const response = await axiosInstance.post(`${API_URL}/logout`)
  return response
}

const userSignup = async (data: { email: string }) => {
  const response = await axiosInstance.post(`${API_URL}/signup`, data)
  return response.data
}

export { userLogin, userLogout, userSignup }
