import React from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from 'contexts/UserContext/UserContext';

const Auth = ({ location }) => {
  const { auth, setAuth } = React.useContext(UserContext);

  // fetch authentication details from the redirect URL
  React.useEffect(() => {
    const preParsedHash = new URLSearchParams(location.hash.substr(1));
    const accessToken = preParsedHash.get('access_token');
    if (accessToken != null) {
      setAuth(auth => {
        return { ...auth, isAuthenticated: true, access_token: accessToken };
      });
    }
  }, [location.hash, setAuth]);

  // let user proceed to spotify oauth
  const connectToSpotify = () => {
    window.location.href = `${auth.authEndpoint}?client_id=${
      auth.clientId
    }&redirect_uri=${auth.redirectURI}&scope=${auth.scopes.join(
      '%20',
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <React.Fragment>
      {auth.isAuthenticated ? (
        <Redirect to="/playlists" />
      ) : (
        <button type="button" onClick={connectToSpotify}>
          Connect to Spotify
        </button>
      )}
    </React.Fragment>
  );
};
export default Auth;
