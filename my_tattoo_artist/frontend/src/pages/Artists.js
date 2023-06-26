import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayArtists from '../components/DisplayArtists';
import SearchBar from '../components/SearchBar';


function Artists() {

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <div>
          <div className="container" >
            <div>
              <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
            </div>
            <SearchBar />
          </div>
          <div>
            <DisplayArtists />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Artists
