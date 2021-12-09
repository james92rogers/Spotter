import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from '../components/UserCard'
import { getGender, getSearch, getSearchType, getUserId } from '../helpers/auth'

const Search = () => {
  const [users, setUsers] = useState([])


  useEffect(() => {
    const searchType = getSearchType()
    const search = getSearch()
    const userGender = getGender()
    const userId = getUserId()
    let filteredUsers = []
    let filteredGenderUsers = []


    const getData = async () => {
      const res = await axios.get('/api/users/')
      if (searchType === 'username'){
        filteredUsers = res.data.filter(user => user.username.toLowerCase() === search.toLowerCase())
      } else if (searchType === 'location'){
        filteredUsers = res.data.filter(user => user.city.toLowerCase() === search.toLowerCase())
      } else if (searchType === 'postcode'){
        filteredUsers = res.data.filter(user => user.postcode.toLowerCase() === search.toLowerCase())
      }
      
      if (userGender === 'male'){
        filteredGenderUsers = filteredUsers.filter(user => user.allowMales === true)
      } else if (userGender === 'female'){
        filteredGenderUsers = filteredUsers.filter(user => user.allowFemales === true)
      } else if (userGender === 'non-binary'){
        filteredGenderUsers = filteredUsers.filter(user => user.allowNonBinary === true)
      }

      const filteredSearchingUsers = filteredGenderUsers.filter(user => user.isSearching === true)
      const removeUserFromSearch = filteredSearchingUsers.filter(user => user.id !== Number(userId))
  
      setUsers(removeUserFromSearch)
    }
    getData()
  }, [])


  return (
    <div className='user-list'>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard {...user} />
          </li>
        ))}
      </ul> 
    </div>
  )
}

export default Search
