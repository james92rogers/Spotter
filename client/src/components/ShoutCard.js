import React from 'react'
import { getUserId } from '../helpers/auth'

const ShoutCard = ({ owner, message, created }) => {

  const userId = getUserId()

  const day = created.slice(8, 10)
  const month = created.slice(5, 7)
  const year = created.slice(2, 4)

  const date = `${day}.${month}.${year}`

  const time = created.slice(11, 16)
  console.log(time + date)


  return (
    <div className='shout'>
      <div className='shout-image' style={{ backgroundImage: `url(${owner.image})` }}>
      </div>
      <div className="shout-info">
        <div className='top-row'>
          <h4>{owner.username}</h4>
          <div className="date">
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className='shout-message'>
          <p>{message}</p>
        </div>
        {userId == owner.id ?
          <div className='user-links'>
            <p>Edit Shout</p>
            <p>Delete Shout</p>
          </div>
          :
          <></>
        }

      </div>
    </div>
  )
}

export default ShoutCard
