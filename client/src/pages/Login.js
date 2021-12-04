import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../helpers/api'
import { setGender, setToken, setUserId } from '../helpers/auth'
import FormInput from '../components/FormInput'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(data)
    login(data).then(handleSuccessfulLogin).catch(handleError)
  }
  const handleSuccessfulLogin = ({ token, id, gender }) => {
    setToken(token)
    setUserId(id)
    setGender(gender)
    setIsError(false)
    console.log('successful login')
    navigate('/')
  }
  const handleError = (error) => {
    if (error.response) {
      console.log('error logging in')
      setErrorInfo(error.response.data)
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


  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <FormInput
          placeholder='email'
          type='email'
          name='email'
          {...formInputProps}
        />
        <FormInput
          placeholder='password'
          type='password'
          name='password'
          {...formInputProps}
        />
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