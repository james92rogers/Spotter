import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteShout, addLike, getLikes, deleteLike } from '../helpers/api'
import { getUserId } from '../helpers/auth'
import { getDate, getTime } from '../helpers/date'

/*eslint camelcase: ["error", {allow: ["like_set"]}]*/

const ShoutCard = ({ owner, message, created, like_set, id }) => {

  const userId = getUserId()
  const date = getDate(created)
  const time = getTime(created)
  const [hasRated, setHasRated] = useState(false)

  useEffect(() => {
    const userLikeCheck = like_set.filter(like => like.owner === Number(userId))
    if (userLikeCheck.length > 0) setHasRated(true)

  }, [])

  const handleDelete = async () => {
    await deleteShout(id)
    window.location.reload(false)
  }

  const handleAddLike = async () => {
    await addLike(id)
    window.location.reload(false)
  }

  const handleDeleteLike = async () => {
    const allLikes = await getLikes()
    const likeToDelete = allLikes.filter(like => like.owner.id === Number(userId) && like.shout.id === id)
    await deleteLike(likeToDelete[0].id)
    window.location.reload(false)

  }


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
          {hasRated ?
            <p className='user-link' onClick={handleDeleteLike}>Unlike</p>
            :
            <p className='user-link' onClick={handleAddLike}>Like</p>
          }
          {userId == owner.id ?
            <p className='user-link' onClick={handleDelete}>Delete</p>
            :
            <></>
          }
        </div>

      </div>
    </div>
  )
}

export default ShoutCard
