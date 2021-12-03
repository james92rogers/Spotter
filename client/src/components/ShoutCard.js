import React from 'react'

const ShoutCard = ({ owner, message, created }) => {
  return (
    <div className='shout'>
      <div className='shout-image' style={{ backgroundImage: `url(${owner.image})` }}>
      </div>
      <div className="shout-info">
        <div className='top-row'>
          <h4>{owner.username}</h4>
          <p>{created}</p>
        </div>
        <div className='shout-message'>
          <p>{message}</p>
        </div>
      </div>
            
    </div>
  )
}

export default ShoutCard
