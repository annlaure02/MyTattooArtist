import { useContext } from "react";
import { ArtistContext } from "./ArtistAuth";


function LoginArtist() {
  const { login } = useContext(ArtistContext)

  const loginProfile = async (data, redirectArtistPage) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login_artist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      const artistId = responseData.id

      login(artistId)

      const artistResponse = await fetch(`http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`);
      const artistData = await artistResponse.json();

      console.log(artistData);

      const redirectUrl = `/ma-page-artiste/${artistId}`;
      redirectArtistPage(redirectUrl);

      await updatePost(data, artistId);

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
  }

  const updatePost = async(data, artistId) => {
    try {
      console.log(artistId)
      if (artistId) {
        const updateResponse = await fetch(`http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        console.log(updateResponse)
  
        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          console.log(responseData);
        }
        else {
          console.log('An error is produced during the request PUT');
        }
      }
    }
    catch (error) {
      console.error('An error is produced during the request:', error);
    }
  }

  return { loginProfile, updatePost };
}
export {LoginArtist}