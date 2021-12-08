import React, { useState, useEffect } from 'react'
import { getMessage, addMessage, deleteMessage } from '../helpers/api'
import { useParams, useNavigate } from 'react-router'
import { getDate, getTime } from '../helpers/date'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'



const SingleMessage = () => {
  
  const [message, setMessage] = useState(null)
  const { id } = useParams()
  const [pageLoad, setPageLoad] = useState(false)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [data, setData] = useState({
    headline: null,
    message: null,
  })

  const handleError = (error) => {
    if (error.response) {
      console.log(error.response.data)
      setError(true)
    }
  }

  const handleSuccessfulMessage = () => {
    window.location.reload(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(data)
    addMessage(message.sender.id, data).then(handleSuccessfulMessage).catch(handleError)
  }

  const handleDelete = async () => {
    await deleteMessage(id)
    navigate('/inbox')
  }

  useEffect(() => {
    const getMessageData = async () => {
      const singleMessage = await getMessage(id)
      setMessage(singleMessage)
      setDate(getDate(singleMessage.created))
      setTime(getTime(singleMessage.created))
      setPageLoad(true)
    }
    getMessageData()
  },[id])


  return (
    <div className='message-page'>
      <p className='return'><Link to='/inbox'>Return To Inbox</Link></p>
      {pageLoad ?
        <div className='single-message'>
          <div className='message-picture' style={{ backgroundImage: `url(${message.sender.image})` }}></div>
          <div className='message-info'>
            <div className='top-row'>
              <p className='headline'>{message.headline}</p>
              <div className='options'>
                <button className='create' variant="primary" onClick={handleShow}>
                  Reply
                </button>
                <p onClick={handleDelete}>Delete</p>
              </div>
            </div>
            <p className='sender'>from: <Link to={`/users/${message.sender.id}`}>{message.sender.username}</Link></p>
            <p className='message'>{message.message}</p>
            <div className='date'>
              <p>{date}</p>
              <p>{time}</p>
            </div>
          </div>
        </div>
        :
        <>
          <p>Loading</p>
        </>
      }
      <>
        
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Send a Reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input onChange={handleChange} type='text' name='headline' placeholder='Add your message title here'></input>
            <textarea onChange={handleChange} name='message' placeholder='Write your message here'></textarea>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleSubmit}>
            Send Reply
            </button>
            {error ? (
              <div className='error'>
                <p>It looks like something went wrong. Please try again.</p>
              </div>
            ) : (
              <></>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
    
  )
}

export default SingleMessage
