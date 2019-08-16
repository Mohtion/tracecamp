import React from 'react';
import axios from 'axios';

const UserContext = React.createContext();
export default UserContext;

const defaultAuth = {
  clientId: '',
  clientSecret: '',
  redirectURI: 'http://localhost:3000',
  scopes: [
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
  ],
  authEndpoint: 'https://accounts.spotify.com/authorize',
};

export const UserProvider = props => {
  const [auth, setAuth] = React.useState(defaultAuth);
  const [me, setMe] = React.useState({});
  const [headers, setHeaders] = React.useState({});

  React.useEffect(() => {
    setHeaders({
      Authorization: 'Bearer ' + auth.access_token,
    });
  }, [auth]);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + auth.access_token,
          },
        })
        .then(response => setMe(response.data));
    }
  }, [auth]);

  const value = {
    auth,
    setAuth,
    headers,
    me,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
