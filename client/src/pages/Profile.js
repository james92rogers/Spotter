import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getUser } from '../helpers/api'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const { id } = useParams()
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {

    const getData = async () => {
      const userDetails = await getUser(id)
      setProfile(userDetails)
      setPageLoad(true)
    }

    getData()


  }, [id])



  return (
    <>
      {pageLoad ?
        <div className='user-page'>
          <div className='user-info'>
            <h2>{profile.username}</h2>
            <p>City: {profile.city}</p>
            <p>Area: {profile.postcode}</p>
            <p>Followers: {profile.followers.length}</p>
            <p>Following: {profile.following.length}</p>
            <p>Workout Types:</p>
            {profile.workoutTypes.map((workout) => (
              <p key= {workout.id}>{workout.type}</p>
            ))}
            
          </div>
          <div className='user-picture' style={{ backgroundImage: `url(${profile.image})` }}>
          </div>

        </div>
        :
        <p>loading</p>
      }  
    </>
  )
}

export default Profile
