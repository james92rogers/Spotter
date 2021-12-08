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
  return window.localStorage.getItem('id')
}
  
export const setUserId = (id) => {
  window.localStorage.setItem('id', id)
}
  
export const removeUserId = () => {
  window.localStorage.removeItem('id')
}

export const getSearchType = () => {
  return window.localStorage.getItem('searchType')
}
  
export const setSearchType = (type) => {
  window.localStorage.setItem('searchType', type)
}
  
export const removeSearchType = () => {
  window.localStorage.removeItem('searchType')
}

export const getSearch = () => {
  return window.localStorage.getItem('search')
}
  
export const setSearch = (search) => {
  window.localStorage.setItem('search', search)
}
  
export const removeSearch = () => {
  window.localStorage.removeItem('search')
}

export const getGender = () => {
  return window.localStorage.getItem('gender')
}
  
export const setGender = (gender) => {
  window.localStorage.setItem('gender', gender)
}
  
export const removeGender = () => {
  window.localStorage.removeItem('gender')
}

export const getCity = () => {
  return window.localStorage.getItem('city')
}
  
export const setCity = (city) => {
  window.localStorage.setItem('city', city)
}
  
export const removeCity = () => {
  window.localStorage.removeItem('city')
}