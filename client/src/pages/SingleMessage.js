import React, { useState, useEffect } from 'react'
import { getMessage } from '../helpers/api'
import { useParams } from 'react-router'
import { getDate, getTime } from '../helpers/date'



const SingleMessage = () => {
  
  const [message, setMessage] = useState(null)
  const { id } = useParams()
  const [pageLoad, setPageLoad] = useState(false)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  useEffect(() => {
    const getMessageData = async () => {
      const singleMessage = await getMessage(id)
      setMessage(singleMessage)
      setDate(getDate(singleMessage.created))
      setTime(getTime(singleMessage.created))
      // if (singleMessage.isRead === false){
      //   const readMessage = await axios.put(`/api/messages/${id}/`)
      //   setMessage(readMessage)
      // } else {
      //   setMessage(singleMessage)
      // }
      setPageLoad(true)
    }
    getMessageData()
  },[id])


  return (
    <div className='single-message'>
      {pageLoad ?
        <>
          <div className='message-picture' style={{ backgroundImage: `url(${message.sender.image})` }}></div>
          <div className='message-info'>
            <div className='top-row'>
              <p>{message.headline}</p>
              <div className='options'>
                <p>Reply</p>
                <p>Delete</p>
              </div>
            </div>
            <p className='sender'>from: {message.sender.username}</p>
            <p className='message'>{message.message}</p>
            <div className='date'>
              <p>{date}</p>
              <p>{time}</p>
            </div>
          </div>
        </>
        :
        <>
          <p>Loading</p>
        </>
      }
    </div>
  )
}

export default SingleMessage
