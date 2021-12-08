import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShoutCard from '../components/ShoutCard'
import Modal from 'react-bootstrap/Modal'
import { addShout, getUser } from '../helpers/api'
import { getUserId } from '../helpers/auth'

const Shouts = () => {
  const [shouts, setShouts] = useState([])
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const userId = getUserId()
  const [data, setData] = useState({
    message: null,
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleError = (error) => {
    if (error.response) {
      console.log(error.response.data)
      setError(true)
    }
  }

  const handleSuccessfulShout = () => {
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
    addShout(data).then(handleSuccessfulShout).catch(handleError)
  }
  

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/shouts/')
      const user = await getUser(Number(userId))
      const userFollowingIds = user.following.map(following => following.id)
      const followerShouts = res.data.filter(shout => (userFollowingIds.includes(shout.owner.id)) || (shout.owner.id === user.id))
      followerShouts.sort((a, b) => (a.created > b.created ? -1 : 1))
      setShouts(followerShouts)
    }
    getData()
  }, [])



  return (
    <div className='shout-page'>
      <div className='create-link'>
        <button className='create' variant="primary" onClick={handleShow}>
          Create Shout
        </button>
      </div>
      <div className='shout-list'>
        <ul style={{ paddingLeft: 0 }}>
          {shouts.map((shout) => (
            <li key={shout.id}>
              <ShoutCard {...shout} />
            </li>
          ))}
        </ul> 
      </div>
      <>
        
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Create a shout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea onChange={handleChange} type='text' name='message' placeholder='What would you like to shout about?'></textarea>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleSubmit}>
            Send Shout!
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

export default Shouts
