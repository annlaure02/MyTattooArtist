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
      console.log(artistData)

      const redirectUrl = `/ma-page-artiste/${artistId}`;
      redirectArtistPage(redirectUrl);

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
  }

  return { loginProfile };
}
export {LoginArtist}