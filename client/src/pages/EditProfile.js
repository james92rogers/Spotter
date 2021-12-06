import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getUserId } from '../helpers/auth'
import EditProfileForm from '../components/EditProfileForm'

const EditProfile = () => {
  const [user, setUser] = useState(null)
  const id = getUserId()
  

  useEffect(() => {
    
    const getUserData = async () => {
      console.log(id)
      const response = await axios.get(`/api/users/${id}`)
      console.log(response.data)
      setUser(response.data)
          
    }
    getUserData()
    
  }, [id])



  return (
    <div>
      {user ?
        <EditProfileForm {...user} />
        :
        <p>Loading</p>
      }
    </div>
  )
}

export default EditProfile
