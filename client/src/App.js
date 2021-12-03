import React, { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './components/Nav'
import Search from './pages/Search'


function App() {



  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/users/') // * <-- replace with your endpoint
      console.log(res.data)
    }
    getData()


  })

  return (
    <Router>
      <header className='app-header'>
        <h1>GymBud</h1>
      </header>
      <nav>
        <Nav />
      </nav>
      <main>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route exact path='/' element={<Home />}></Route>
        </Routes>

      </main>
    </Router>
  )
}

export default App
