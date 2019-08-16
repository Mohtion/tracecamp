import React from 'react';
import { Route } from 'react-router-dom';

import Playlists from 'components/Playlists/Playlists';
import Playlist from 'components/Playlist/Playlist';

import Auth from 'components/Auth/Auth';
const App = () => {
  return (
    <React.Fragment>
      <Route path="/" exact component={Auth} />
      <Route path="/playlists" exact component={Playlists} />
      <Route path="/playlists/:playlistId" exact component={Playlist} />
    </React.Fragment>
  );
};

export default App;
