import React from 'react'
import { Link } from 'react-router-dom'
import { getDate, getTime } from '../helpers/date'

const MessageCard = ({ sender, created, headline, isRead, id, message }) => {
  
  const date = getDate(created)
  const time = getTime(created)

  const messagePreview = message.slice(0, 30) + '...'
  
  return (
    <div className='message-card'>
      {isRead ?
        <div className='read-message'>
          <div className='message-picture' style={{ backgroundImage: `url(${sender.image})` }}></div>
          <div className='message-info'>
            <div className='top-row'>
              <p><Link to={`/inbox/${id}`}>{headline}</Link></p>
              <div className='date'>
                <p>{date}</p>
                <p>{time}</p>
              </div>
            </div>
            <p className='sender'>{sender.username}</p>
            <p className='message'>{messagePreview}</p>
          </div>
        </div>
        :
        <div className='unread-message'>
          <div className='message-picture' style={{ backgroundImage: `url(${sender.image})` }}></div>
          <div className='message-info'>
            <div className='top-row'>
              <p><Link to={`/inbox/${id}`}>{headline}</Link></p>
              <div className='date'>
                <p>{date}</p>
                <p>{time}</p>
              </div>
            </div>
            <p className='sender'>{sender.username}</p>
            <p className='message'>{messagePreview}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default MessageCard
