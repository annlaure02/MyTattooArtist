import React, { createContext, useState } from 'react';
// Initiate Context which allows to share the state between components
const ArtistContext = createContext();

/*  Creating a function to provide our initiated context
    This function will be the parent of every other component in our app.

*/
const ArtistProvider = ({ children }) => {
  const [artistId, setArtistId] = useState(null);

// Login updates the artist data with an id parameter
  const login = (id) => {
    setArtistId(id);
  };

// Logout updates the artist data to default
  const logout = () => {
    setArtistId(null);
  };

  return (
    <ArtistContext.Provider value={{ artistId, login, logout }}>
      {children}
    </ArtistContext.Provider>
  );
};

export { ArtistContext, ArtistProvider }