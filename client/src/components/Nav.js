import React, { useState } from 'react'
import { removeToken, removeUserId, setSearch, setSearchType, removeSearch, removeSearchType, removeGender } from '../helpers/auth'
import { Link, useNavigate } from 'react-router-dom'


const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    type: null,
    search: null,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchType(data.type)
    setSearch(data.search)
    if (window.location.href === 'http://localhost:3000/search'){
      window.location.reload(false)
    } else {
      navigate('/search')
    }
  }

  const handleLogout = () => {
    removeToken()
    removeUserId()
    removeSearch()
    removeSearchType()
    removeGender()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <p>hamburger</p>
      <div className='search-area'>
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <select className='select-type' name='type' onChange={handleChange}>
              <option>-Search By-</option>
              <option value='username'>Username</option>
              <option value='location'>City</option>
              <option value='postcode'>Postcode</option>
            </select>
          </div>
          <div className='form-field'>
            <input type='text' name='search' onChange={handleChange}/>
          </div>
          <div className='form-field-submit'>
            <input type='submit' value='search'/>
          </div>
        </form>
      </div>
      <div className='nav-links'>
        {isLoggedIn ?
          <>
            <p>Profile</p>
            <button onClick={handleLogout}>Logout</button>
          </>
          :
          <>
            <p><Link to='/login'>Sign In</Link></p>
            <p><Link to='/register'>Register</Link></p>
          </>
        }
      </div>
    </nav>
  )
}

export default Nav