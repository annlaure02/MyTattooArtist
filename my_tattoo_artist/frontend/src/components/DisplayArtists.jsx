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
      <h1 style={{ color: "white" }}>Artistes</h1>
      <div className='custom-page'>
        {artists.map(artist => (
          <div key={artist.id}>
            <Card className='custom-card' style={{ width: '18rem' }}>
              <Card.Body >
                <Card.Title style={{ color: "black" }}>
                  {artist.last_name} {artist.first_name}</Card.Title>
                <Card.Text style={{ color: "black" }}>
                  <div className=''>
                    {artist.artist_name}
                  </div>
                  <div>
                    {artist.email}
                  </div>
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))};
      </div>
    </div>
  )
}

export default DisplayArtists
