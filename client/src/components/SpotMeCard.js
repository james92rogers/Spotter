import React from 'react'
import { getDate, getTime } from '../helpers/date'

const SpotMeCard = ({ headline, owner, location, postcode, message, searchingFor, created, workoutTypes }) => {

  const date = getDate(created)
  const time = getTime(created)
  
  
  return (
    <div className='spotme'>
      <div className='spotme-info'>
        <div className='top-row'>
          <h3>{headline}</h3>
        </div>
        <div className='second-row'>
          <p>Posted by: <span className='answer'>{owner.username}</span></p>
          <div className='date'>
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className='third-row'>
          <p>City: <span className='answer'>{location}</span></p>
          <p>Area: <span className='answer'>{postcode}</span></p>
        </div>
        <div className='fourth-row'>
          <p>Workout Types:</p>
          <div className='workout-types'>
            {workoutTypes.map((workout) => (
              <p key={workout.id} className='workout-type'>{workout.type}</p>
            ))}
          </div>
        </div>
        <div className='fifth-row'>
          <p>Searching for: <span className='answer'>{searchingFor}</span></p>
        </div>
        <div className='sixth-row'>
          <p>{message}</p>
        </div>
        <div className='bottom-row'>
          <p>Get in Touch!</p>
        </div>
      </div>
      <div className='spot-me-image' style={{ backgroundImage: `url(${owner.image})` }}>

      </div>
        
    </div>
  )
}

export default SpotMeCard
