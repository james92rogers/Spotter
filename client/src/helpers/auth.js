export const getToken = () => {
  return window.localStorage.getItem('token')
}
    
export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}
    
export const removeToken = () => {
  window.localStorage.removeItem('token')
}
  
export const getUserId = () => {
  return window.localStorage.getItem('userId')
}
  
export const setUserId = (userId) => {
  window.localStorage.setItem('userId', userId)
}
  
export const removeUserId = () => {
  window.localStorage.removeItem('userId')
}