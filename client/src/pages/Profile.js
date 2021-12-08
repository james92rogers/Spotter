import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ProfileShoutCard from '../components/ProfileShoutCard'
import ProfileSpotMeCard from '../components/ProfileSpotMeCard'
import { addFollow, getUser, removeFollow, addMessage } from '../helpers/api'
import { getUserId } from '../helpers/auth'
import Modal from 'react-bootstrap/Modal'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const { id } = useParams()
  const [pageLoad, setPageLoad] = useState(false)
  const userId = getUserId()
  const [userIsFollowing, setUserIsFollowing] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [data, setData] = useState({
    headline: null,
    message: null,
  })

  useEffect(() => {

    const getData = async () => {
      const userDetails = await getUser(id)
      setProfile(userDetails)
      const userFollowingCheck = userDetails.followers.filter(follower => follower.id === Number(userId))
      if (userFollowingCheck.length > 0) setUserIsFollowing(true)
      setPageLoad(true)
    }
    getData()
  }, [])

  const handleFollow = async () => {
    await addFollow(profile.id)
    window.location.reload(false)
  }
  
  const handleUnfollow = async () => {
    await removeFollow(profile.id)
    window.location.reload(false)
  }

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
    addMessage(profile.id, data).then(handleSuccessfulMessage).catch(handleError)
  }


  return (
    <>
      {pageLoad ?
        <div className='user-page'>
          <h2>{profile.username}</h2>
          <div className='bio'>
            <p>{profile.bio}</p>
          </div>
          <div className='content'>
            <div className='user-info'>
              <p><span className='key'>City: </span>{profile.city}</p>
              <p><span className='key'>Area: </span>{profile.postcode}</p>
              <p><span className='key'>Followers: </span>{profile.followers.length}</p>
              <p><span className='key'>Following: </span>{profile.following.length}</p>
              <div className='workout-section'>
                <p className='key'>Workout Types:</p>
                <div className='workouts'>
                  {profile.workoutTypes.map((workout) => (
                    <p key= {workout.id}>{workout.type}</p>
                  ))}
                </div>
              </div>
              {profile.id !== Number(userId) ?
                userIsFollowing ?
                  <div className='follow'>
                    <button className='create' variant="primary" onClick={handleShow}>
                    Send Message
                    </button>
                    <p className='follow-message' onClick={handleUnfollow}>Unfollow {profile.username}</p>
                  </div>
                  :
                  <div className='follow'>
                    <button className='create' variant="primary" onClick={handleShow}>
                    Send Message
                    </button>
                    <p className='follow-message' onClick={handleFollow}>Follow {profile.username}</p>
                  </div>
                :
                <></>
              }

            </div>
            <div className='user-picture' style={{ backgroundImage: `url(${profile.image})` }}>
            </div>
          </div>
          <div className='user-posts'>
            <div className='profile-shouts'>
              <p className='header'>Shouts:</p>
              <ul>
                {profile.shout_set.map((shout) => (
                  <li key={shout.id}>
                    <ProfileShoutCard {...shout} />
                  </li>
                ))}
              </ul>
            </div>
            <div className='profile-spotmes'>
              <p className='header'>Spot Me&apos;s:</p>
              <ul>
                {profile.spotme_set.map((spotme) => (
                  <li key={spotme.id}>
                    <ProfileSpotMeCard {...spotme} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <>
        
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Send a Message</Modal.Title>
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
        :
        <p>loading</p>
      }  
    </>
  )
}

export default Profile
