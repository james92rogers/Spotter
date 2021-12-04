import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SpotMeCard from '../components/SpotMeCard'
import { Link } from 'react-router-dom'


const SpotMes = () => {
  const [spotMes, setSpotMes] = useState([])
  const [filter, setFilter] = useState('city')

  

  useEffect(() => {
    const getData = async () => {

      const res = await axios.get('/api/spotme/')
      setSpotMes(res.data)
    }
    getData()
    setFilter('city')
  }, [])



  return (
    <div className='spotme-page'>
      <div className='spotme-options'>
        <div className='filters'>
          <p>Currently filtering by your {filter}</p>

        </div>
        <p><Link to='/spotmes/add'>Add a Spot Me!</Link></p>
      </div>
      <div className='spotme-list'>
        <ul>
          {spotMes.map((spotMe) => (
            <li key={spotMe.id}>
              <SpotMeCard {...spotMe} />
            </li>
          ))}
        </ul> 
      </div>
    </div>
  )
}

export default SpotMes
