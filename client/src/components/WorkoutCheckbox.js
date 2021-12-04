import React from 'react'

const WorkoutCheckbox = ({ id, type, handleCheckbox }) => {

  const idName = type.toLowerCase().replace(/ /g, '_')

  return (
    <>
      <label htmlFor={idName}>{type}</label>
      <input type="checkbox" id={idName} value={id} name="workoutTypes" onChange={handleCheckbox}></input>
    </>
  )
}

export default WorkoutCheckbox




