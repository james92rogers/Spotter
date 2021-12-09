import React, { useState } from 'react'
import { addShout } from '../helpers/api'
import { useNavigate } from 'react-router'


const CreateShout = () => {

  const [data, setData] = useState({
    message: null,
  })

  const [error, setError] = useState(false)
  const navigate = useNavigate()
  
  const handleError = (error) => {
    if (error.response) {
      setError(true)
    }
  }

  const handleSuccessfulShout = () => {
    navigate('/shouts')
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
    addShout(data).then(handleSuccessfulShout).catch(handleError)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text-area' name='message' placeholder='What would you like to shout about?'></input>
        <input type='submit' value='Send Shout'></input>
      </form>
      {error ? (
        <div className='error'>
          <p>It looks like something went wrong. Please try again.</p>
        </div>
      ) : (
        <></>
      )}    
    </div>
  )
}

export default CreateShout
