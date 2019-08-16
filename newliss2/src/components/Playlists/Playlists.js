import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserContext from 'contexts/UserContext/UserContext';

const Playlists = ({ history }) => {
  // ensure the user is authenticated
  const { auth, headers } = React.useContext(UserContext);
  if (!auth.isAuthenticated) {
    history.replace('/');
  }

  const [playlists, setPlaylists] = React.useState([]);

  React.useEffect(() => {
    const getPlaylists = async (
      url = 'https://api.spotify.com/v1/me/playlists',
    ) => {
      try {
        const response = await axios.get(url, {
          params: {
            limit: 50,
          },
          headers,
        });
        setPlaylists([...playlists, ...response.data.items]);
        if (response.data.next) {
          getPlaylists(response.data.next);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylists();
  }, [headers]);
  return (
    <React.Fragment>
      {playlists.length ? (
        <React.Fragment>
          {playlists.map(playlist => (
            <React.Fragment key={playlist.id}>
              <br />
              <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
            </React.Fragment>
          ))}
        </React.Fragment>
      ) : (
        <div>Loading Playlists</div>
      )}
    </React.Fragment>
  );
};

export default Playlists;

//     {
//         href: null,
//         items: [],
//         limit: null,
//         next: null,
//         offset: null,
//         previous: null,
//         total: null
//     }
