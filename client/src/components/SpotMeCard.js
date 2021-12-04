import React from 'react'

const SpotMeCard = ({ headline, owner, location, postcode, message, searchingFor, created, workoutTypes }) => {

  const day = created.slice(8, 10)
  const month = created.slice(5, 7)
  const year = created.slice(2, 4)

  const date = `${day}.${month}.${year}`

  const time = created.slice(11, 16)
  
  
  return (
    <div className='spotme'>
      <div className='spotme-info'>
        <div className='top-row'>
          <h3>{headline}</h3>
        </div>
        <div className='second-row'>
          <p>Posted by: {owner.username}</p>
          <div className='date'>
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>
        <div className='third-row'>
          <p>City: {location}</p>
          <p>Area: {postcode}</p>
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
          <p>Searching for: {searchingFor}</p>
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
