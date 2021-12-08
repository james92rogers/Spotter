import React, { useState, useEffect } from 'react'
import { getDate, getTime } from '../helpers/date'
import axios from 'axios'

const ProfileSpotMeCard = ({ headline, location, postcode, message, searchingFor, created, workoutTypes }) => {

  const date = getDate(created)
  const time = getTime(created)
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const getWorkouts = async () => {
      const res = await axios.get('/api/workouts/')
      const filteredResponse = res.data.filter(workout => workoutTypes.includes(workout.id))
      setWorkouts(filteredResponse)
    }
    getWorkouts()

  },[])
  
  
  return (
    <div className='profile-spotme'>
      <div className='spotme-info'>
        <div className='top-row'>
          <h3>{headline}</h3>
        </div>
        <div className='second-row'>
          <p>City: <span className='answer'>{location}</span></p>
          <p>Area: <span className='answer'>{postcode}</span></p>
        </div>
        <div className='third-row'>
          <p>Workout Types:</p>
          <div className='workout-types'>
            {workouts.map((workout) => (
              <p key={workout.id} className='workout-type'>{workout.type}</p>
            ))}
          </div>
        </div>
        <div className='fourth-row'>
          <p>Searching for: <span className='answer'>{searchingFor}</span></p>
        </div>
        <div className='fifth-row'>
          <p>{message}</p>
        </div>
        <div className='date'>
          <p>{time}</p>
          <p>{date}</p>
        </div>
      </div>
        
    </div>
  )
}

export default ProfileSpotMeCard
