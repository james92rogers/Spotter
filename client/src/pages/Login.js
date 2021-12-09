import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../helpers/api'
import { setCity, setGender, setToken, setUserId } from '../helpers/auth'



const Login = ({ setIsLoggedIn }) => {

  const [data, setData] = useState({
    email: '',
    password: '',
  })


  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(data).then(handleSuccessfulLogin).catch(handleError)

  }
  const handleSuccessfulLogin = ({ token, id, gender, city }) => {
    setToken(token)
    setUserId(id)
    setGender(gender)
    setCity(city)
    setIsLoggedIn(true)
    setIsError(false)
    navigate('/')
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
        <h2>Sign In</h2>
        <input type='email' name='email' placeholder='email' onChange={handleFormChange}/>
        <input type='password' name='password' placeholder='password' onChange={handleFormChange}/>

        <div className='submit-section'>
          <input type='submit' value='Login' />
        </div>
        {isError ? (
          <div className='error'>
            <p>There appears to have been an error. Please try again.</p>
          </div>
        ) : (
          <></>
        )}
      </form>
      <div className='signup'>
        <p> Not a Member? <Link to='/register'>Sign up here</Link>   
        </p>     
      </div>
    </section>
  )
}
export default Login