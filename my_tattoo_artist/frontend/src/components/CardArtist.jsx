import React from 'react'

function CardArtist() {
  return (
    <div>
      <div className='container artists-page'>
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
                    {artist.artist_name}
                  </Card.Title>
                  <Card.Text >
                    <div>
                      <p>Biographie</p>
                      <div className=''>
                        <p>{artist.biography}</p>
                      </div>
                    </div>
                    <div>
                      <p>Adresse</p>
                      <div>
                        <p>
                          <b>{artist.studio_name}</b>
                          <br />
                          {artist.studio_number_street} {artist.studio_street}
                          <br />
                          {artist.studio_post_code} {artist.studio_city}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>Styles</p>
                      <div className=''>
                        {artist.tattoo_style ? (
                          <div className='all-styles'>
                            {artist.tattoo_style.map(style => (
                              <div className='styles' key={style.id}>
                                <p className='style-item'>{style.style_name}</p>
                              </div>
                            ))}
                          </div>
                        ) : (<p>Fail to display tattoo styles</p>)}
                      </div>
                    </div>
                    <div>
                      <p>Photos</p>
                      <div className='album'>
                        {artist.album && artist.album.map(picture => (
                          <img className='album-picture'
                            key={picture.id}
                            src={`http://127.0.0.1:8000${picture.image}`}
                            alt="" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p>Dessins</p>
                      <div className='drawing'>
                        {artist.drawing && artist.drawing.map(drawing => (
                          <img className='drawing-picture'
                            key={drawing.id}
                            src={`http://127.0.0.1:8000${drawing.image}`}
                            alt="" />
                        ))}
                      </div>
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

export default CardArtist
