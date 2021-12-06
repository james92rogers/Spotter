import axios from 'axios'
import React, { useState } from 'react'
import GendersRadio from './GendersRadio'
import { getUserId } from '../helpers/auth'
import { useNavigate } from 'react-router'
import { editUser } from '../helpers/api'

/*eslint camelcase: ["error", {allow: ["password_confirmation"]}]*/
const EditProfileForm = ({ username, password, password_confirmation, email, image, city, postcode, gender, isSearching, bio, allowMales, allowFemale, allowNonBinary }) => {

  const uploadURL = 'https://api.cloudinary.com/v1_1/dwua03ur6/image/upload'
  const uploadPreset = 'ycrghelo'
  const id = getUserId()
  const navigate = useNavigate()

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
  })


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


  return (
    <div className='edit-profile-form'>
      <form onSubmit={handleSubmit}>
        <div className='edit-image'>
          <img src={data.image} height='300' weight='200' />
          <input type='file' name='image' onChange={handleUpload}/>
        </div>
        <div className='edit-info'>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' name='username' placeholder={username} onChange={handleFormChange}/>
          <label htmlFor='email'>Email:</label>
          <input type='text' id='email' name='email' placeholder={email} onChange={handleFormChange}/>
          <label htmlFor='city'>City:</label>
          <input type='text' id='city' name='city' placeholder={city} onChange={handleFormChange}/>
          <label htmlFor='postcode'>Area:</label>
          <input type='text' id='postcode' name='postcode' placeholder={postcode} onChange={handleFormChange}/>
          <label htmlFor='gender'>What gender do you identify as:</label>
          <select id='gender' name='gender' onChange={handleFormChange}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='non-binary'>Non-Binary</option>
          </select>
          <label htmlFor='bio'>Bio:</label>
          <textarea id='bio' name='bio' placeholder={bio} onChange={handleFormChange}/>
          <p>Limit who&apos;s searches you appear in:</p>
          <div className='filters'>
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
          <p>Would you like to feature in other users&apos; searches?</p>
          <label htmlFor='yes'>Yes</label>
          <input type='radio' id='yes' name='isSearching' value={true} onChange={radioFilter} />
          <label htmlFor='no'>No</label>
          <input type='radio' id='no' name='isSearching' value={false} onChange={radioFilter} />
        </div>
        <div className='submit-section'>
          <input type='submit' value='Update Profile' />
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm
