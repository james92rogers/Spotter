import React from 'react'

const GendersRadio = ({ name, title, radioFilter }) => {
  return (
    <>
      <label htmlFor={`${name}true`}>Allow {title}</label>
      <input type='radio' id={`${name}true`} name={name} value={true} onChange={radioFilter} />
      <label htmlFor={`${name}false`}>Block {title}</label>
      <input type='radio' id={`${name}false`} name={name} value={false} onChange={radioFilter} />          
    </>
  )
}

export default GendersRadio
