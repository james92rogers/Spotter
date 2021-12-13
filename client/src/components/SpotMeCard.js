import React, { useState } from 'react'
import { getDate, getTime } from '../helpers/date'
import { getUserId } from '../helpers/auth'
import { deleteSpotMe, addMessage } from '../helpers/api'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

const SpotMeCard = ({ id, headline, owner, location, postcode, message, searchingFor, created, workoutTypes }) => {

  const date = getDate(created)
  const time = getTime(created)
  const userId = getUserId()
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
    addMessage(owner.id, data).then(handleSuccessfulMessage).catch(handleError)
  }

  const handleDelete = async () => {
    await deleteSpotMe(id)
    window.location.reload(false)
  }
  
  return (
    <div className='spotme'>
      <div className='spotme-info'>
        <div className='top-row'>
          <h3>{headline}</h3>
        </div>
        <div className='second-row'>
          <p>Posted by: <span className='answer'><Link to={`/users/${owner.id}`}>{owner.username}</Link></span></p>
          <div className='date'>
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className='third-row'>
          <p>City: <span className='answer'>{location}</span></p>
          <p>Area: <span className='answer'>{postcode}</span></p>
        </div>
        <div className='fourth-row'>
          <p>Workout Types:</p>
          <div className='workout-types'>
            {workoutTypes.map((workout) => (
              <p key={workout.id} className='workout-type'>{workout.type}</p>
            ))}
          </div>
        </div>
        <div className='fifth-row'>
          <p>Searching for: <span className='answer'>{searchingFor}</span></p>
        </div>
        <div className='sixth-row'>
          <p>{message}</p>
        </div>
        <div className='bottom-row'>
          
          {owner.id === Number(userId) ?
            <>
              <p><Link to={`/spotmes/edit/${id}`}>Edit Spot Me</Link></p>
              <p onClick={handleDelete}>Delete Spot Me</p>
            </>
            :
            <>
              <button className='create' variant="primary" onClick={handleShow}>
                Get in Touch!
              </button>
            </>
          }
        </div>
      </div>
      <div className='spot-me-image' style={{ backgroundImage: `url(${owner.image})` }}>

      </div>
      <>
        
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Send a Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input onChange={handleChange} type='text' name='headline' placeholder='Add your message title here' />
            <textarea onChange={handleChange} name='message' placeholder='Write your message here'></textarea>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleSubmit}>
            Send Message
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

export default SpotMeCard
