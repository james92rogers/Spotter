import React from 'react'

const WorkoutCheckbox = ({ id, type, handleCheckbox }) => {

  const idName = type.toLowerCase().replace(/ /g, '_')

  return (
    <div className='workout'>
      <label htmlFor={idName}>{type}</label>
      <input className="checkbox" type="checkbox" id={idName} value={id} name="workoutTypes" onChange={handleCheckbox}></input>
    </div>
  )
}

export default WorkoutCheckbox




