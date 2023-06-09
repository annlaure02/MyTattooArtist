
async function UpdatePost(data, artistId) {
  try {
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
};

export default UpdatePost
