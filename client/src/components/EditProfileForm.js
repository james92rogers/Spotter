import axios from 'axios'
import React, { useState, useEffect } from 'react'
import GendersRadio from './GendersRadio'
import { getUserId } from '../helpers/auth'
import { useNavigate } from 'react-router'
import { editUser } from '../helpers/api'
import WorkoutCheckbox from './WorkoutCheckbox'
import TextInput from './TextInput'

/*eslint camelcase: ["error", {allow: ["password_confirmation"]}]*/
const EditProfileForm = ({ username, password, password_confirmation, email, image, city, postcode, gender, isSearching, bio, allowMales, allowFemale, allowNonBinary }) => {

  const uploadURL = 'https://api.cloudinary.com/v1_1/dwua03ur6/image/upload'
  const uploadPreset = 'ycrghelo'
  const id = getUserId()
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([])

  const [data, setData] = useState({
    username,
    password,
    password_confirmation,
    email,
    image,
    city,
    postcode,
    gender,
    isSearching,
    bio,
    allowMales,
    allowFemale,
    allowNonBinary,
    workoutTypes: [],
  })

  useEffect(() => {
    const getWorkouts = async () => {
      const res = await axios.get('/api/workouts/')
      setWorkouts(res.data)
    }
    getWorkouts()

  },[])


  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  const handleUpload = async (event) => {
    const imageData = new FormData()
    imageData.append('file', event.target.files[0])
    imageData.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadURL, imageData)
    setData({ ...data, image: res.data.url })
  }

  const radioFilter = (event) => {
    const updatedValue = JSON.parse(event.target.value)
    const name = event.target.name
    setData({
      ...data,
      [name]: updatedValue,
    })
    console.log(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(data)
    editUser(id, data).then(handleSuccessfulEdit).catch(handleError)
  }

  const handleSuccessfulEdit = () => {
    navigate(`/users/${id}`)
  }

  const handleError = (error) => {
    if (error.response) {
      console.log(error)
    }
  }

  const handlePassword = (event) => {
    setData({
      ...data,
      password: event.target.value,
      password_confirmation: event.target.value,
    })
    console.log(data)

  }

  const handleCheckbox = (event) => {
    const value = Number(event.target.value)
    const index = data.workoutTypes.indexOf(value)
    if (index >= 0) data.workoutTypes.splice(index, 1)
    else data.workoutTypes.push(value)
    data.workoutTypes.sort()
    console.log(data)
  }


  return (
    <div className='edit-profile-form'>
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div className='top-row'>
          <div className='edit-image'>
            <img src={data.image} height='300' width='300' />
            <input type='file' name='image' onChange={handleUpload}/>
          </div>
          <div className='edit-info'>
            <TextInput name='username' title='Username:' fun={handleFormChange} placeholder={username} />
            <TextInput name='email' title='Email:' fun={handleFormChange} placeholder={email} />
            <TextInput name='city' title='City:' fun={handleFormChange} placeholder={city} />
            <TextInput name='postcode' title='Area:' fun={handleFormChange} placeholder={postcode} />
            <label htmlFor='gender'>What gender do you identify as:</label>
            <select id='gender' name='gender' onChange={handleFormChange}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='non-binary'>Non-Binary</option>
            </select>
            <label htmlFor='bio'>Bio:</label>
            <textarea id='bio' name='bio' placeholder={bio} onChange={handleFormChange}/>
          </div>
        </div>
        <div className='bottom-row'>
          <div className='checkboxes'>
            <p>Select the Workout Types that apply:</p>
            <div className='workouts'>
              {workouts.map((workout) => (
                <WorkoutCheckbox {...workout} handleCheckbox={handleCheckbox} key={workout.id}/>
              ))}
            </div>
          </div>
          <div className='filters-submit'>
            <div className='filters'>
              <p>Limit who&apos;s searches you appear in:</p>
              <div className='males'>
                <GendersRadio name='allowMales' title='Males' radioFilter={radioFilter} />
              </div>
              <div className='females'>
                <GendersRadio name='allowFemale' title='Females' radioFilter={radioFilter} />
              </div>
              <div className='non-binary'>
                <GendersRadio name='allowNonBinary' title='Non-Binary' radioFilter={radioFilter} />
              </div>
            </div>
            <div className='searches'>
              <p>Would you like to feature in other users&apos; searches?</p>
              <label htmlFor='yes'>Yes</label>
              <input type='radio' id='yes' name='isSearching' value={true} onChange={radioFilter} />
              <label htmlFor='no'>No</label>
              <input type='radio' id='no' name='isSearching' value={false} onChange={radioFilter} />
            </div>
            <div className='password-section'>
              <label htmlFor='password'>Please put in password to confirm changes:</label>
              <input type='password' id='password' name='password' onChange={handlePassword}/>
            </div>
            <div className='submit-section'>
              <input type='submit' value='Update Profile' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm
