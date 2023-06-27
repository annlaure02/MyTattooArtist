import React from 'react'
import Navbar from '../components/header/Navbar';

function TattooStyles() {
  return (
    <div>
      <div className='container'>
        <div>
          <Navbar />
        </div>
        <div style={{ color: "white" }}> Styles</div>
      </div>
    </div>
  )
}

export default TattooStyles
