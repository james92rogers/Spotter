import axios from 'axios'
import { getToken } from './auth'
import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')


const baseUrl = '/api'

export const getUsers = async () => {
  const config = {
    method: 'get',
    url: `${baseUrl}/users/`,
    headers: {},
  }
  
  const response = await axios(config)
  return response.data
}

// export const login = async (data) => {
//   console.log(data)
//   return makeAxiosRequest('/users/login/', data)
// }
  
export const register = (data) => {
  console.log('received data')
  return makeAxiosRequest('/users/register/', data)
}

export const login = async () => {
  const config = {
    method: 'post',
    url: `${baseUrl}/users/login/`,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrftoken,
    },
  }
  const response = await axios(config)
  return response.data
}


const makeAxiosRequest = async (url, data) => {
  const config = getAxiosRequestConfig(url, data)
  console.log('config: ' + config)
  const response = await axios(config)
  return response.data
}
  
export const getAxiosRequestConfig = (requestUrl, data, method = 'post') => {
  const config = {
    method,
    url: `${baseUrl}${requestUrl}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrftoken,
    },
    data,
  }
  return config
}