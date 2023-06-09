import React, { useState, useEffect, useContext, useCallback } from 'react';
import Header from '../components/profile-artist-page/Header'
import ProfilePicture from '../components/profile-artist-page/ProfilePicture'
import Pseudo from '../components/profile-artist-page/Pseudo'
import { ArtistContext } from '../components/header/ArtistAuth';

function ProfileArtistPage() {
  const { artistId } = useContext(ArtistContext)
  const [artist, setArtist] = useState({})

  const url = `http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`
  const fetchData = useCallback(async () => {
    const response = await fetch(url)
    const data = await response.json()
    setArtist(data)
  }, [url]);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    < >
      <div className="container" style={{ color: "white" }}>
            <Header />
            <ProfilePicture />
            <div>
              <h1>Nom Prénom: {artist.last_name} {artist.first_name} </h1>
              <h1>Mon nom d'artiste : {artist.artist_name}</h1>
              <Pseudo />
            </div>

      </div>
    </>
  )
}

export default ProfileArtistPage