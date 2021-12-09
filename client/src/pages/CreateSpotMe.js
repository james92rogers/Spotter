import React, { useEffect, useState } from 'react'
import { addSpotMe } from '../helpers/api'
import { useNavigate } from 'react-router'
import WorkoutCheckbox from '../components/WorkoutCheckbox'
import axios from 'axios'
import TextInput from '../components/TextInput'


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
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    addSpotMe(data).then(handleSuccessfulSpotMe).catch(handleError)
  }

  return (
    <div className="spotme-form">
      <form onSubmit={handleSubmit}>
        <h2>Create Spot Me</h2>
        <TextInput name='headline' title='Headline:' func={handleChange} placeholder= 'e.g Looking for Running Partner' />
        <TextInput name='location' title='City:' func={handleChange} placeholder= 'e.g London' />
        <TextInput name='postcode' title='Area:' func={handleChange} placeholder= 'e.g SW16' />
        <div className='checkboxes'>
          <p>Select the Workout Types that apply:</p>
          <div className='workouts'>
            {workouts.map((workout) => (
              <WorkoutCheckbox {...workout} handleCheckbox={handleCheckbox} key={workout.id}/>
            ))}
          </div>
        </div>
        <label htmlFor="message">Message:</label>
        <textarea onChange={handleChange} name='message' id='message' placeholder='e.g Searching for someone local who would like to go running a few nights a week.'></textarea>
        <TextInput name='searchingFor' title='Searching For:' func={handleChange} placeholder= 'e.g Groups, 1-to-1' />
        <input className="submit" type='submit' value='Create Spot Me'></input>
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
