import React, { useEffect, useState } from 'react'
import { getMessages } from '../helpers/api'
import { getUserId } from '../helpers/auth'
import MessageCard from '../components/MessageCard'

const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {

    const getMessageData = async () => {
      const user = getUserId()
      const allMessages = await getMessages()
      const userMessages = allMessages.filter(message => message.receiver.id === Number(user))
      userMessages.sort((a, b) => (a.created > b.created ? -1 : 1))
      setMessages(userMessages)
      setPageLoad(true)
    }
    getMessageData()

  },[])



  return (
    <div className='inbox'>
      {pageLoad ?
        <>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <MessageCard {...message} />
              </li>
            ))}
          </ul>
        </>
        :
        <p>Loading</p>
      }
    </div>
  )
}

export default Inbox
