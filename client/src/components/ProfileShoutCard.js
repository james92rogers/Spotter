import React from 'react'
import { getDate, getTime } from '../helpers/date'


const ProfileShoutCard = ({ message, created }) => {

  
  const date = getDate(created)
  const time = getTime(created)


  return (
    <div className='profile-shout'>
      <div className='top-row'>
        <p>{message}</p>
      </div>
      <div className="date">
        <p>{time}</p>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default ProfileShoutCard
