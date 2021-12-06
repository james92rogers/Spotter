import React, { useEffect, useState } from 'react'
import { addSpotMe } from '../helpers/api'
import { useNavigate } from 'react-router'
import WorkoutCheckbox from '../components/WorkoutCheckbox'
import axios from 'axios'


const CreateSpotMe = () => {

  const [data, setData] = useState({
    workoutTypes: [],
    headline: null,
    location: null,
    postcode: null,
    message: null,
    searchingFor: null,
  })

  const [error, setError] = useState(false)
  const [workouts, setWorkouts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getWorkouts = async () => {
      const res = await axios.get('/api/workouts/')
      setWorkouts(res.data)
    }
    getWorkouts()

  },[])


  
  const handleError = (error) => {
    if (error.response) {
      console.log(error.response.data)
      setError(true)
    }
  }

  const handleSuccessfulSpotMe = () => {
    navigate('/spotmes')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleCheckbox = (event) => {
    const index = data.workoutTypes.indexOf(event.target.value)
    if (index >= 0){
      data.workoutTypes.splice(index, 1)
    } else {
      data.workoutTypes.push(event.target.value)
    }
    data.workoutTypes.sort()
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(data)
    addSpotMe(data).then(handleSuccessfulSpotMe).catch(handleError)
  }

  return (
    <div className="spotme-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="headline">Headline:</label>
        <input onChange={handleChange} type='text' name='headline' id='headline' placeholder='e.g Looking for Running Partner'></input>
        <label htmlFor="location">City:</label>
        <input onChange={handleChange} type='text' name='location' id='location' placeholder='e.g London'></input>
        <label htmlFor="postcode">Area:</label>
        <input onChange={handleChange} type='text' name='postcode' id='postcode' placeholder='e.g SW16'></input>
        <div className='checkboxes'>
          <p>Select the Workout Types that apply:</p>
          {workouts.map((workout) => (
            <WorkoutCheckbox {...workout} handleCheckbox={handleCheckbox} key={workout.id}/>
          ))}
        </div>
        <label htmlFor="message">Message:</label>
        <textarea onChange={handleChange} name='message' id='message' placeholder='e.g Searching for someone local who would like to go running a few nights a week.'></textarea>
        <label htmlFor="searchingFor">Searching For:</label>
        <input onChange={handleChange} type='text' name='searchingFor' id='searchingFor' placeholder='e.g Groups, 1-to-1'></input>
        <input className="submit" type='submit' value='Create Spot Me!'></input>
      </form>
      {error ? (
        <div className='error'>
          <p>It looks like something went wrong. Please try again.</p>
        </div>
      ) : (
        <></>
      )}    
    </div>
  )
}

export default CreateSpotMe
