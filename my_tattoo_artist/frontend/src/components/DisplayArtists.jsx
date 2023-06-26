import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import '../styles/DisplayPages.css'


function DisplayArtists() {
  const [artists, setArtists] = useState([])

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/ma-page-artiste/')
    const data = await response.json()
    setArtists(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className='artists-page'>
        <div className='custom-page'>
          {artists.map(artist => (
            <div key={artist.id}>
              <Card className='custom-card'>
                <Card.Body >
                  <Card.Title className='card-title'>
                    <img
                      src={`http://127.0.0.1:8000${artist.profile_picture}`}
                      alt=""
                      className='profile-picture'
                    />
                    <p className='card-artist-name'>{artist.artist_name}</p>
                  </Card.Title>
                  <Card.Text >
                    <div>
                      <p className='card-fields'><b>Adresse</b></p>
                      <p className='card-infos'>
                        <b>{artist.studio_name}</b>
                        <br />
                        {artist.studio_number_street} {artist.studio_street}
                        <br />
                        {artist.studio_post_code} {artist.studio_city}
                      </p>
                    </div>
                    <div>
                      <p className='card-fields'><b>Styles</b></p>
                      {artist.tattoo_style ? (
                        <div className='card-all-styles'>
                          {artist.tattoo_style.map(style => (
                            <div className='card-styles' key={style.id}>
                              <p className='card-style-item'>{style.style_name}</p>
                            </div>
                          ))}
                        </div>
                      ) : (<p>Fail to display tattoo styles</p>)}
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))};
        </div>
      </div>
    </div>
  )
}

export default DisplayArtists
