import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../helpers/api'
import TextInput from '../components/TextInput'

const Register = () => {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    city: '',
    postcode: '',
    gender: '',

  })

  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(data)
    register(data).then(handleSuccessfulRegister).catch(handleError)
  }

  const handleSuccessfulRegister = () => {
    setIsError(false)
    navigate('/login')
  }

  const handleError = (error) => {
    if (error.response) {
      setIsError(true)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }


  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <TextInput name ='username' title='Username:' func={handleFormChange} placeholder='Enter desired username here' />
        <label htmlFor='email'>Email Address:</label>
        <input type='email' name='email' id='email' onChange={handleFormChange} placeholder='Enter valid email address here' />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' onChange={handleFormChange} placeholder='Write password here' />
        <label htmlFor='password_confirmation'>Password Confirmation:</label>
        <input type='password' name='password_confirmation' id='password_confirmation' onChange={handleFormChange} placeholder='Confirm your password' />
        <TextInput name='city' title='City:' func={handleFormChange} placeholder='e.g London' />
        <TextInput name='postcode' title='Area:' func={handleFormChange} placeholder='e.g SW16' />
        <label htmlFor='gender'>What gender do you identify as:</label>
        <select id='gender' name='gender' onChange={handleFormChange}>
          <option>-Select Gender-</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='non-binary'>Non-Binary</option>
        </select>
        <div className='submit-section'>
          <input type='submit' value='Register' />
        </div>
        {isError ? (
          <div className='error'>
            <p>Error in registering. Please try again.</p>
          </div>
        ) : (
          <></>
        )}
      </form>
    </section>
  )
}

export default Register