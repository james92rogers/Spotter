import React from 'react'
import { Link } from 'react-router-dom'
import { getDate, getTime } from '../helpers/date'
import { changeMessage, deleteMessage } from '../helpers/api'
import { useNavigate } from 'react-router'


const MessageCard = ({ sender, created, headline, isRead, id, message }) => {
  
  const date = getDate(created)
  const time = getTime(created)
  const navigate = useNavigate()

  const messagePreview = message.slice(0, 45) + '...'

  const handleUnread = async () => {
    await changeMessage(id)
    navigate(`/inbox/${id}`)
  }

  const handleMarkUnread = async () => {
    await changeMessage(id)
    window.location.reload(false)
  }
  
  const handleDelete = async () => {
    await deleteMessage(id)
    window.location.reload(false)
  }
  
  return (
    <div className='message-card'>
      <div className='message-picture' style={{ backgroundImage: `url(${sender.image})` }}></div>
      <div className='message-info'>
        <div className='top-row'>
          {isRead ?
            <p><Link to={`/inbox/${id}`}>{headline}</Link></p>
            :
            <p className='unread-headline' onClick={handleUnread}>{headline}</p>
          }
          <div className='date'>
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>
        <p className='sender'>from: <Link to={`/users/${sender.id}`}>{sender.username}</Link></p>
        <p className='message'>{messagePreview}</p>
        {isRead ?
          <p onClick={handleMarkUnread} className='mark-unread'>Mark as Unread</p>
          :
          <></>
        }
        <p onClick={handleDelete} className='delete-cross'>X</p>
      </div>
    </div>
  )
}

export default MessageCard
