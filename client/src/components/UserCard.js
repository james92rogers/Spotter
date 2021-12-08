import React from 'react'
import { Link } from 'react-router-dom'


export const UserCard = ({ id, username, image, bio, city, postcode, workoutTypes }) => {

    
  return (
    <div className='user-card'>
      <div className='user-card-image' style={{ backgroundImage: `url(${image})` }}>

      </div>
      <div className='user-card-info'>
        <div className='top-line'>
          <h4><Link to={`/users/${id}`}>{username}</Link></h4>
        </div>
        <div className='location-line'>
          <p><span className='key'>City:</span> {city}</p>
          <p><span className='key'>Area:</span> {postcode}</p>
        </div>
        <div className='bio'>
          <p>{bio}</p>
        </div>
        <div className='workouts'>
          <p className='key'>Workout Types:</p>
          <div className='workout-types'>
            {workoutTypes.length === 0 ?
              <p>no workout types declared</p>
              :
              workoutTypes.map((workout) => (
                <p key={workout.id} className='workout-type'>{workout.type}</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
