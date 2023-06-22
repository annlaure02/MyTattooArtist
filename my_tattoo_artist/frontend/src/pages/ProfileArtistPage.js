import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/private-artist-page/Private-Page-Header.css';
import ProfilePicture from '../components/profile-artist-page/ProfilePicture';
import Pseudo from '../components/profile-artist-page/Pseudo';
import Biography from '../components/profile-artist-page/Biography';
import Studio from '../components/profile-artist-page/Studio';
import TattooStyles from '../components/profile-artist-page/TattooStyles';
import Album from '../components/profile-artist-page/Album';
import Drawing from '../components/profile-artist-page/Drawing';

function ProfileArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});

  // Request GET infos of the artist 
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`);
      if (response.ok) {
        const data = await response.json();
        setArtist(data);
      } else {
        console.error('Une erreur s\'est produite lors de la récupération des informations de l\'artiste.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
  }, [artistId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // For disconnection button 
  const redirectHomePage = useNavigate();
  const Logout = () => {
    redirectHomePage(`/`);
  };

  // Function to update the json after PUT request and display the new info in the db
  const handleUpdate = (dataUpdated) => {
    console.log(dataUpdated);
    setArtist(dataUpdated);
  };

  return (
    <>
      <div className="container">
        <div className='custom-header'>
          <div>
            <h1>Bonjour {artist.first_name}</h1>
          </div>
          <div>
            <Button variant="light" onClick={Logout}>
              Déconnexion
            </Button>
          </div>
        </div>
        <div className='custom-private-artist-page'>
          <div>
            <div className='custom-title'>
              <h1>Photo de Profil</h1>
              <ProfilePicture dataUpdated={handleUpdate} />
            </div>
            <div className='info-artist'>
              <img src={`http://127.0.0.1:8000${artist.profile_picture}`} alt="" height={200} />
            </div>
          </div>
          <div>
            <div className='custom-title'>
              <h1>Mon nom d'artiste</h1>
              <Pseudo dataUpdated={handleUpdate} />
            </div>
            <div className='info-artist'>
              <h1>{artist.artist_name}</h1>
            </div>
          </div>
          <div>
            <div className='custom-title'>
              <h1>Ma bio</h1>
              <Biography dataUpdated={handleUpdate} />
            </div>
            <div className='info-artist'>
              <p>{artist.biography}</p>
            </div>
          </div>
          <div>
            <div className='custom-title'>
              <h1>Coordonnées</h1>
              <h2>Studio</h2>
              <Studio dataUpdated={handleUpdate} />
            </div>
            <div className='info-artist'>
              <p>{artist.studio_name}</p>
              <p>{artist.studio_number_street} {artist.studio_street}</p>
              <p>{artist.studio_post_code} {artist.studio_city}</p>
              <p>{artist.email}</p>
              <p>{artist.phone}</p>
            </div>
          </div>
          <div>
            <div className='custom-title'>
              <h1>Styles de Tatouage</h1>
              <TattooStyles dataUpdated={handleUpdate} />
            </div>
            {artist.tattoo_style ? (
              <div className='info-artist'>
                {artist.tattoo_style.map(style => (
                  <div key={style.id}>
                    <p>{style.style_name}</p>
                  </div>
                ))}
              </div>
            ) : (<p>Fail to display tattoo styles</p>)}
          </div>
          <div>
            <div className='custom-title'>
              <h1>Photos</h1>
              <Album dataUpdated={handleUpdate} />
            </div>
            <div className='info-artist'>
              {artist.album && artist.album.map(picture => (
                <img key={picture.id} src={`http://127.0.0.1:8000${picture.image}`} alt="" height={100} />
              ))}
            </div>
          </div>
          <div>
            <div className='custom-title'>
              <h1>Dessins / Flash</h1>
              <Drawing dataUpdated={handleUpdate} />
            </div>
            <div className='info-artist'>
              {artist.drawing && artist.drawing.map(drawing => (
                <img key={drawing.id} src={`http://127.0.0.1:8000${drawing.image}`} alt="" height={100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileArtistPage;
