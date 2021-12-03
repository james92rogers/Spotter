import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../helpers/api'
import FormInput from '../components/FormInput'

const Register = () => {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errorInfo, setErrorInfo] = useState({})
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
        <h2>Register</h2>
        <FormInput
          placeholder='username'
          type='text'
          name='username'
          {...formInputProps}
        />
        <FormInput
          placeholder='email@email.com'
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
        <FormInput
          placeholder='password again'
          type='password'
          name='password_confirmation'
          {...formInputProps}
        />
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