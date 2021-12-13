import React from 'react'

const TextInput = ({ name, title, func, placeholder }) => {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input onChange={func} type='text' name={name} id={name} placeholder={placeholder} />            
    </>
  )
}

export default TextInput
