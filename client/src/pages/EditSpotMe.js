import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import EditSpotMeForm from '../components/EditSpotMeForm'

const EditSpotMe = () => {

  const [spotMe, setSpotMe] = useState(null)
  const { id } = useParams()
  

  useEffect(() => {
    
    const getSpotMeData = async () => {
      const response = await axios.get(`/api/spotme/${id}`)
      setSpotMe(response.data)
          
    }
    getSpotMeData()
    
  }, [])


  return (
    <div>
      {spotMe ?
        <EditSpotMeForm {...spotMe} />
        :
        <p>Loading</p>
      }
            
    </div>
  )
}

export default EditSpotMe
