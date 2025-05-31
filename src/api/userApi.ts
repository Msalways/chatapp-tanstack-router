import axiosInstance from '@/lib/axiosInstance'

const API_URL = '/Users'

const listUsers = async () => {
  const response = await axiosInstance.get(`${API_URL}`)
  return response.data
}

const getValidateData = async () => {
  const response = await axiosInstance.get(`${API_URL}/validate`)
  return response.data
}

export { listUsers, getValidateData }
