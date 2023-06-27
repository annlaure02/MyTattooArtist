import React from 'react'
import { Card } from 'react-bootstrap';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import '../styles/CardArtist.css'

function CardArtistSearch({ artist }) {
  return (
    <div>
      <Card className='custom-card-artist'>
        <Card.Body >
          <Card.Title className='card-title card-artist'>
            <img
              src={`${artist.profile_picture}`}
              alt=""
              className='profile-picture card-artist'
            />
            <p className='card-artist-name card-artist'>{artist.artist_name}</p>
          </Card.Title>
          <Card.Text >
            <div>
              <h3 className='card-fields card-artist'><b>Biographie</b></h3>
              <p className='card-infos card-artist'>
                {artist.biography}</p>
            </div>
            <div>
              <h3 className='card-fields card-artist'><b>Coordonnées</b></h3>
              <div className='field-contact card-artist'>
                <div className='col'>
                  <div className='card-contact-home card-artist'>
                    <HiHome />
                    <p>
                      <b>{artist.studio_name}</b>
                      <br />
                      {artist.studio_number_street} {artist.studio_street}
                      <br />
                      {artist.studio_post_code} {artist.studio_city}
                    </p>
                  </div>
                </div>
                <div className='col'>
                  <div className='card-contact card-artist'>
                    <BsFillTelephoneFill />
                    <p>{artist.phone}</p>
                  </div>
                  <div className='card-contact card-artist'>
                    <MdEmail />
                    <p>{artist.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='card-fields card-artist'><b>Styles</b></h3>
              {artist.tattoo_style ? (
                <div className='all-styles card-artist'>
                  {artist.tattoo_style.map(style => (
                    <div className='styles card-artist' key={style.id}>
                      <p className='style-item card-artist'>{style.style_name}</p>
                    </div>
                  ))}
                </div>
              ) : (<p>Fail to display tattoo styles</p>)}
            </div>
            <div>
              <h3 className='card-fields card-artist'><b>Photos</b></h3>
              <div className='album card-artist'>
                {artist.album && artist.album.map(picture => (
                  <img className='album-picture card-artist'
                    key={picture.id}
                    src={`${picture.image}`}
                    alt="" />
                ))}
              </div>
            </div>
            <div>
              <h3 className='card-fields card-artist'><b>Dessins</b></h3>
              <div className='drawing card-artist'>
                {artist.drawing && artist.drawing.map(drawing => (
                  <img className='drawing-picture card-artist'
                    key={drawing.id}
                    src={`${drawing.image}`}
                    alt="" />
                ))}
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CardArtistSearch