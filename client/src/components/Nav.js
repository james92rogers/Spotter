import React, { useState, useEffect } from 'react'
import { removeToken, removeUserId, setSearch, setSearchType, removeSearch, removeSearchType, removeGender, getUserId } from '../helpers/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Squash as Hamburger } from 'hamburger-react'
import { Offcanvas } from 'react-bootstrap'
import { getMessages } from '../helpers/api'


const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [messages, setMessages] = useState([])
  const [unreadMessages, setUnreadMessages] = useState([])
  const [url, setUrl] = useState(null)
  const [data, setData] = useState({
    type: null,
    search: null,
  })

  useEffect(() => {
    

    const getEmailData = async () => {
      if (window.location.href !== url) setUrl(window.location.href)
      console.log(url)
      const user = getUserId()
      console.log(user)
      if (!user) return
      const allMessages = await getMessages()
      console.log(allMessages)
      const userMessages = allMessages.filter(message => message.receiver.id === Number(user))
      console.log(userMessages)
      setMessages(userMessages)
      const unread = messages.filter(message => message.isRead === false)
      console.log(unread)
      setUnreadMessages(unread)
      console.log(unreadMessages)
    }
    getEmailData()

  }, [url])



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

  const options = [
    {
      name: 'Disable body scrolling',
      scroll: false,
      backdrop: true,
    }
  ]

  const goToInbox = () => {
    navigate('/inbox')
  }

  return (
    <nav className='navbar'>
      <Hamburger color='white' toggled={show} toggle={setShow} { ...options } />
      <Offcanvas show={show}>
        <ul className='hamburger-list'>
          <li><Link onClick={handleClose} to='/'>Home</Link></li>
          <li><Link onClick={handleClose} to='/shouts'>Shouts</Link></li>
          <li><Link onClick={handleClose} to='/spotmes'>Spot Me</Link></li>
          {isLoggedIn ?
            <>
              <li>Profile</li>
              <li><Link onClick={handleClose} to='/profile/edit'>Edit Profile</Link></li>
              <button onClick={handleLogout}>Logout</button>
            </>
            :
            <>
              <li><Link onClick={handleClose} to='/login'>Log In</Link></li>
              <li><Link onClick={handleClose} to='/register'>Register</Link></li>
            </>
          }
        </ul>
      </Offcanvas >
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
            <input type='text' className='text-input' name='search' onChange={handleChange}/>
          </div>
          <div className='form-field-submit'>
            <input type='submit' value='search'/>
          </div>
        </form>
      </div>
      {isLoggedIn ?
        <div className='nav-messages' onClick={goToInbox}>
          <i className="far fa-envelope"></i>
          <div className='unread'>
            <p>{unreadMessages.length}</p>
          </div>
        </div>
        :
        <div>
        </div>
      }
    </nav>
  )
}

export default Nav