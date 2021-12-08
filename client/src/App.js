import React, { useEffect, useState } from 'react'
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
import EditProfile from './pages/EditProfile'
import EditSpotMe from './pages/EditSpotMe'
import About from './pages/About'
import Footer from './components/Footer'
import Logo from './assets/spotterlogo5.png'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)



  useEffect(() => {
    
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
    

  }, [])

  return (
    <Router>
      <header className='app-header'>
        <img src={Logo}/>
      </header>
      <nav>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  
          user={user} setUser={setUser}/>
      </nav>
      <main>
        <div className='page-container'>
          <div className='content-wrap'>
            <Routes>
              <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/shouts/add' element={<CreateShout />}></Route>
              <Route path='/shouts' element={<Shouts />}></Route>
              <Route path='/spotmes/add' element={<CreateSpotMe />}></Route>
              <Route path='/spotmes/edit/:id' element={<EditSpotMe />}></Route>
              <Route path='/spotmes' element={<SpotMes />}></Route>
              <Route path='/users/:id' element={<Profile />}></Route>          
              <Route path='/inbox/:id' element={<SingleMessage />}></Route>
              <Route path='/inbox' element={<Inbox />}></Route>
              <Route path='/profile/edit' element={<EditProfile />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route exact path='/' element={<Home isLoggedIn={isLoggedIn}/>}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </main>
    </Router>
  )
}

export default App
