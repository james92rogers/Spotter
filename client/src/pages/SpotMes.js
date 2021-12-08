import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SpotMeCard from '../components/SpotMeCard'
import { Link } from 'react-router-dom'
import { getCity, getGender } from '../helpers/auth'


const SpotMes = () => {
  const [spotMes, setSpotMes] = useState([])
  const [filter, setFilter] = useState('city')
  const [search, setSearch] = useState(getCity())
  const [searchHolder, setSearchHolder] = useState(null)
  const userGender = getGender()
  let filteredResponse = []
  let filteredGenderUsers = []
  let usersAreSearching = []




  useEffect(() => {
    const getData = async () => {
      console.log('search = ', search)
      console.log('filter = ', filter)

      const res = await axios.get('/api/spotme/')
      console.log(res.data)

      if (filter === 'city'){
        filteredResponse = (res.data.filter(spotme => spotme.location === search))
      } else if (filter === 'area') {
        filteredResponse = (res.data.filter(spotme => spotme.postcode === search))
      }
      console.log(filteredResponse)

      if (userGender === 'male'){
        filteredGenderUsers = filteredResponse.filter(spotme => spotme.owner.allowMales === true)
      } else if (userGender === 'female'){
        filteredGenderUsers = filteredResponse.filter(spotme => spotme.owner.allowFemales === true)
      } else if (userGender === 'non-binary'){
        filteredGenderUsers = filteredResponse.filter(spotme => spotme.owner.allowNonBinary === true)
      }

      console.log(filteredGenderUsers)

      usersAreSearching = filteredGenderUsers.filter(spotme => spotme.owner.isSearching === true)
      usersAreSearching.sort((a,b) => (a.created > b.created ? -1 : 1))
      setSpotMes(usersAreSearching)
    }
    getData()
  }, [search])

  const handleRadio = (event) =>  {
    setFilter(event.target.value)
    console.log(filter)
  }

  const handleInput = (event) => {
    setSearchHolder(event.target.value)
    console.log(searchHolder)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearch(searchHolder)

  }



  return (
    <div className='spotme-page'>
      <div className='spotme-options'>
        <div className='filters'>
          <p>Currently searching in {search}</p>
          <form onSubmit={handleSubmit}>
            <div className='radio'>
              <div className='city-options'>
                <label htmlFor='city'>City</label>
                <input type='radio' id='city' value='city' name='filter' onChange={handleRadio} />
              </div>
              <div className='area-options'>
                <label htmlFor='area'>Area</label>
                <input type='radio' id='area' value='area' name='filter' onChange={handleRadio} />
              </div>
              <input className= 'search' type='text' name="search" placeholder='e.g Manchester?' onChange={handleInput}/> 
            </div>
            <input className='submit' type='submit' value='Submit'/>
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
