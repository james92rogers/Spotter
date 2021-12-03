import React from 'react'

export const UserCard = ({ username, image, bio, city, postcode }) => {
    
  return (
    <div className='user-card'>
      <div className='user-card-image' style={{ backgroundImage: `url(${image})` }}>

      </div>
      <div className='user-card-info'>
        <div className='top-line'><h4>{username}</h4></div>
        <div className='bio'>
          <p>{bio}</p>
        </div>
        <div className='bottom-line'>
          <p>{city}</p>
          <p>{postcode}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
