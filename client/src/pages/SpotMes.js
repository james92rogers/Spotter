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
          <form>
            <div className='radio'>
              <div className='city-options'>
                <label htmlFor='city'>City</label>
                <input type='radio' id='city' value='city' name='filter'></input>
              </div>
              <div className='area-options'>
                <label htmlFor='area'>Area</label>
                <input type='radio' id='area' value='area' name='filter'></input>
              </div>
              <input className= 'search' type='text' name="search" placeholder='e.g Manchester?'></input> 
            </div>
            <input className='submit' type='submit' value='Submit'></input>
          </form>
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
