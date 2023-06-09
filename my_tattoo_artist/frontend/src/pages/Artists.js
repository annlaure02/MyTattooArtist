import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayArtists from '../components/DisplayArtists';


function Artists() {

  return (
    <div >
      <div>
      <Navbar />
      </div>
      <div className='container'>
        <DisplayArtists />
      </div>
    </div>
  )
}

export default Artists
