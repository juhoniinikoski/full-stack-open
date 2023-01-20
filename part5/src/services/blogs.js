import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}