import React from 'react'
import { Link } from 'react-router-dom'


const Home = ({ isLoggedIn }) => {



  return (
    <div className='home'>
      {isLoggedIn ?
        <>
          <h4>Welcome back to Spotter</h4>
          <p>If you haven&apos;t already, we&apos;d advise visiting the <Link to='/profile/edit'>edit profile</Link> page to finish setting up your account.</p>
        </>
        :
        <>
          <h4>Welcome to Spotter</h4>
          <p>Please <Link to='/login'>sign in</Link> or <Link to='/register'>register</Link> to use our service</p>
        </>
      }
    </div>
  )
}

export default Home
