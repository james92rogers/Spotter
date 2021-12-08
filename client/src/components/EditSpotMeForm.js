import React, { useEffect, useState } from 'react'
import { editSpotMe } from '../helpers/api'
import { useNavigate } from 'react-router'
import WorkoutCheckbox from './WorkoutCheckbox'
import axios from 'axios'
import TextInput from './TextInput'


const EditSpotMe = ({ id, headline, location, postcode, message, searchingFor }) => {

  const [data, setData] = useState({
    workoutTypes: [],
    headline,
    location,
    postcode,
    message,
    searchingFor,
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
    editSpotMe(id, data).then(handleSuccessfulSpotMe).catch(handleError)
  }

  return (
    <div className="spotme-form">
      <form onSubmit={handleSubmit}>
        <h2>Edit Spot Me</h2>
        <TextInput name='headline' title='Headline:' func={handleChange} placeholder={headline} />
        <TextInput name='location' title='City:' func={handleChange} placeholder={location} />
        <TextInput name='postcode' title='Area:' func={handleChange} placeholder={postcode} />
        <div className='checkboxes'>
          <p>Select the Workout Types that apply:</p>
          <div className='workouts'>
            {workouts.map((workout) => (
              <WorkoutCheckbox {...workout} handleCheckbox={handleCheckbox} key={workout.id}/>
            ))}
          </div>
        </div>
        <label htmlFor="message">Message:</label>
        <textarea onChange={handleChange} name='message' id='message' placeholder={message}></textarea>
        <TextInput name='searchingFor' title='Searching For:' func={handleChange} placeholder={searchingFor} />
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

export default EditSpotMe
