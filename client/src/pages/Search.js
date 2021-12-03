import React, { useEffect, useState } from 'react'
import { getUsers } from '../helpers/api'
import axios from 'axios'
import UserCard from '../components/UserCard'

const Search = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await getUsers()
      console.log('config method: ')
      console.log(response.data)

      const res = await axios.get('/api/users/')
      console.log('non-config method: ')
      console.log(res.data)
      setUsers(res.data)
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
