import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShoutCard from '../components/ShoutCard'
import { Link } from 'react-router-dom'

const Shouts = () => {
  const [shouts, setShouts] = useState([])
  

  useEffect(() => {
    const getData = async () => {

      const res = await axios.get('/api/shouts/')
      console.log('non-config method: ')
      console.log(res.data)
      setShouts(res.data)
    }
    getData()
  }, [])



  return (
    <div className='shout-page'>
      <div>
        <p><Link to='/shouts/add'>Create Shout</Link></p>
      </div>
      <div className='shout-list'>
        <ul>
          {shouts.map((shout) => (
            <li key={shout.id}>
              <ShoutCard {...shout} />
            </li>
          ))}
        </ul> 
      </div>
    </div>
  )
}

export default Shouts
