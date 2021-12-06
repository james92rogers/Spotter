import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../helpers/auth'
import { getDate, getTime } from '../helpers/date'

/*eslint camelcase: ["error", {allow: ["like_set"]}]*/

const ShoutCard = ({ owner, message, created, like_set }) => {

  const userId = getUserId()
  
  const date = getDate(created)
  const time = getTime(created)


  return (
    <div className='shout'>
      <div className='shout-image' style={{ backgroundImage: `url(${owner.image})` }}>
      </div>
      <div className="shout-info">
        <div className='top-row'>
          <p><Link to={`/users/${owner.id}`}>{owner.username}</Link></p>
          <div className="date">
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className='shout-message'>
          <p>{message}</p>
        </div>
        <div className='user-links'>
          <div className='likes'>
            <p>{like_set.length}</p>
            <i className="fas fa-thumbs-up"></i>
          </div>
          <p>Like</p>
          {userId == owner.id ?
            <p>Delete</p>
            :
            <></>
          }
        </div>

      </div>
    </div>
  )
}

export default ShoutCard
