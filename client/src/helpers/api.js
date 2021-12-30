import axios from 'axios'
import { getToken } from './auth'


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

export const getUser = async (id) => {
  const config = {
    method: 'get',
    url: `${baseUrl}/users/${id}/`,
    headers: {},
  }
  
  const response = await axios(config)
  return response.data
}

export const editUser = async (id, data) => {
  const config = {
    method: 'put',
    url: `${baseUrl}/users/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    data,
  }
  
  const response = await axios(config)
  return response.data
}

export const addFollow = async (id) => {
  const config = {
    method: 'put',
    url: `${baseUrl}/users/addfollow/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

export const removeFollow = async (id) => {
  const config = {
    method: 'put',
    url: `${baseUrl}/users/removefollow/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

export const getMessages = async () => {
  const config = {
    method: 'get',
    url: `${baseUrl}/messages/`,
    headers: {},
  }
  
  const response = await axios(config)
  return response.data
}

export const getMessage = async (id) => {
  const config = {
    method: 'get',
    url: `${baseUrl}/messages/${id}/`,
    headers: {},
  }
  
  const response = await axios(config)
  return response.data
}

export const deleteMessage = async (id) => {
  const config = {
    method: 'delete',
    url: `${baseUrl}/messages/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

export const changeMessage = async (id) => {
  const config = {
    method: 'put',
    url: `${baseUrl}/messages/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

export const addMessage = async (id, data) => {
  const config = {
    method: 'post',
    url: `${baseUrl}/messages/send/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    data,
  }

  const response = await axios(config)
  return response.data
}

export const addLike = async (id) => {
  const config = {
    method: 'post',
    url: `${baseUrl}/shouts/${id}/likes/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

export const getLikes = async () => {
  const config = {
    method: 'get',
    url: `${baseUrl}/likes/`,
    headers: {},
  }
  
  const response = await axios(config)
  return response.data
}

export const deleteLike = async (id) => {
  const config = {
    method: 'delete',
    url: `${baseUrl}/likes/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

export const deleteShout = async (id) => {
  const config = {
    method: 'delete',
    url: `${baseUrl}/shouts/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  
  const response = await axios(config)
  return response.data
}

  
export const register = async (data) => {
  const config = {
    method: 'post',
    url: `${baseUrl}/users/register/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,

  }
  const response = await axios(config)
  return response.data
}

export const login = async (data) => {
  const config = {
    method: 'post',
    url: `${baseUrl}/users/login/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }
  const response = await axios(config)
  return response.data
}

export const addShout = async (data) => {
  const config = {
    method: 'post',
    url: `${baseUrl}/shouts/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    data,
  }
  const response = await axios(config)
  return response.data
}

export const deleteSpotMe = async (id) => {
  const config = {
    method: 'delete',
    url: `${baseUrl}/spotme/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  const response = await axios(config)
  return response.data
}

export const addSpotMe = async (data) => {
  const config = {
    method: 'post',
    url: `${baseUrl}/spotme/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    data,
  }
  const response = await axios(config)
  return response.data
}

export const editSpotMe = async (id, data) => {
  const config = {
    method: 'put',
    url: `${baseUrl}/spotme/${id}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    data,
  }
  const response = await axios(config)
  return response.data
}

