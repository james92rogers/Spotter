import React from 'react'

const Footer = () => {
  return (
    <div className='footer-content'>
      <div className='links'>
        <p>Created by James Rogers</p>
        <a href='https://www.linkedin.com/in/james92rogers/' target='_blank' rel='noreferrer'>
          <i className='fab fa-linkedin'></i>
        </a>
        <a href='https://github.com/james92rogers/' target='_blank' rel='noreferrer'>
          <i className='fab fa-github' />
        </a>

      </div>
      <p className='rights'>&copy; 2021 All rights reserved</p>
    </div>
  )
}

export default Footer
