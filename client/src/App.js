import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import Search from './pages/Search'
import Shouts from './pages/Shouts'
import SpotMes from './pages/SpotMes'
import { getToken } from './helpers/auth'
import CreateShout from './pages/CreateShout'
import CreateSpotMe from './pages/CreateSpotMe'
import Profile from './pages/Profile'
import Inbox from './pages/Inbox'
import SingleMessage from './pages/SingleMessage'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)



  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/users/') // * <-- replace with your endpoint
      console.log(res.data)
    }

    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }

    getData()

  }, [])

  return (
    <Router>
      <header className='app-header'>
        <h1>GymBud</h1>
      </header>
      <nav>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  
          user={user} setUser={setUser}/>
      </nav>
      <main>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/shouts/add' element={<CreateShout />}></Route>
          <Route path='/shouts' element={<Shouts />}></Route>
          <Route path='/spotmes/add' element={<CreateSpotMe />}></Route>
          <Route path='/spotmes' element={<SpotMes />}></Route>
          <Route path='/users/:id' element={<Profile />}></Route>          
          <Route path='/inbox/:id' element={<SingleMessage />}></Route>
          <Route path='/inbox' element={<Inbox />}></Route>
          <Route exact path='/' element={<Home />}></Route>
        </Routes>

      </main>
    </Router>
  )
}

export default App
