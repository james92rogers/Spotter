import React from 'react'


const Nav = () => {






  return (
    <nav className='navbar'>
      <p>hamburger</p>
      <div className='search-area'>
        <form>
          <div className='form-field'>
            <select className='select-type'>
              <option>-Search By-</option>
              <option value='username'>Username</option>
              <option value='location'>City</option>
              <option value='postcode'>Postcode</option>
            </select>
          </div>
          <div className='form-field'>
            <input type='text'/>
          </div>
          <div className='form-field-submit'>
            <input type='submit' value='search'/>
          </div>
        </form>
      </div>
      <div className='nav-links'>
        <p>Sign In</p>
        <p>Register</p>
      </div>
    </nav>
  )
}

export default Nav