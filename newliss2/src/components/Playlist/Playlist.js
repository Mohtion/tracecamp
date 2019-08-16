import React from 'react';
import axios from 'axios';

import UserContext from 'contexts/UserContext/UserContext';

const Playlist = ({ match, history }) => {
  // ensure the user is authenticated
  const { auth, me, headers } = React.useContext(UserContext);
  if (!auth.isAuthenticated) {
    history.replace('/');
  }

  // all songs in playlist
  const [playlist, setPlaylist] = React.useState([]);
  // selected songs in playlist
  const [songs, setSongs] = React.useState({});
  // React.useEffect(() => {
  //   let songs = {};
  //   playlist.forEach(song => {
  //     song[song.track.uri] = false;
  //   });
  //   setSongs(songs);
  // }, [playlist]);
  // new playlist information
  const [playlistName, setPlaylistName] = React.useState('');
  const [isPublic, setIsPublic] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getPlaylist = async playlistId => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers,
          },
        );
        setPlaylist([...playlist, ...response.data.items]);
        if (response.data.next) {
          getPlaylist(response.data.next);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylist(match.params.playlistId);
  }, [match.params.playlistId, headers]);

  return (
    <React.Fragment>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log(0);
          if (!loading && playlistName) {
            console.log(1);
            axios
              .post(
                `https://api.spotify.com/v1/users/${me.id}/playlists`,
                {
                  name: playlistName,
                  public: isPublic,
                },
                { headers },
              )
              .then(response => {
                axios
                  .post(
                    `https://api.spotify.com/v1/playlists/${
                      response.data.id
                    }/tracks`,
                    {
                      uris: Object.entries(songs)
                        .map(([key, value]) => {
                          if (value) return key;
                          return null;
                        })
                        .filter(song => {
                          if (song) return song;
                        }),
                    },
                    {
                      headers,
                    },
                  )
                  .then(response => history.push('/playlists'));
              })
              .catch(error => console.log('create', error));
          }
        }}
      >
        <br />
        Playlist name:
        <input
          type="text"
          autoComplete="off"
          value={playlistName}
          onChange={event => {
            const newPlaylistName = event.target.value;
            setPlaylistName(newPlaylistName);
          }}
        />
        <br />
        <input
          type="checkbox"
          checked={isPublic}
          onChange={event => {
            const value =
              event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value;
            setIsPublic(value);
          }}
        />
        Public: {isPublic.toString()}
        <br />
        <br />
        <br />
        <br />
        {playlist.length ? (
          <React.Fragment>
            {playlist.map((song, index) => (
              <React.Fragment key={`${index}-${song.track.id}`}>
                <input
                  type="checkbox"
                  checked={songs[song.track.uri]}
                  onChange={event => {
                    const value =
                      event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value;
                    setSongs({
                      ...songs,
                      [song.track.uri]: value,
                    });
                  }}
                />
                {song.track.name}
                <br />
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : (
          <div>Loading Playlist</div>
        )}
        <button type="submit">Create Playlist</button>
      </form>
    </React.Fragment>
  );
};

export default Playlist;

// const song = {
//   "added_at": "2019-08-09T13:02:59Z",
//   "added_by": {
//     "external_urls": {
//       "spotify": "https://open.spotify.com/user/dd912"
//     },
//     "href": "https://api.spotify.com/v1/users/dd912",
//     "id": "dd912",
//     "type": "user",
//     "uri": "spotify:user:dd912"
//   },
//   "is_local": false,
//   "primary_color": null,
//   "track": {
//     "album": {
//       "album_type": "single",
//       "artists": [
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/2wY79sveU1sp5g7SokKOiI"
//           },
//           "href": "https://api.spotify.com/v1/artists/2wY79sveU1sp5g7SokKOiI",
//           "id": "2wY79sveU1sp5g7SokKOiI",
//           "name": "Sam Smith",
//           "type": "artist",
//           "uri": "spotify:artist:2wY79sveU1sp5g7SokKOiI"
//         },
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/2cWZOOzeOm4WmBJRnD5R7I"
//           },
//           "href": "https://api.spotify.com/v1/artists/2cWZOOzeOm4WmBJRnD5R7I",
//           "id": "2cWZOOzeOm4WmBJRnD5R7I",
//           "name": "Normani",
//           "type": "artist",
//           "uri": "spotify:artist:2cWZOOzeOm4WmBJRnD5R7I"
//         }
//       ],
//       "available_markets": [

// function PlaylistMaker(props){
//     var id = props.match.params.id
//     //outputs the songs on the playlist
//     console.log(id)
//     const [Songs, setSongs] = React.useState([])
//     //add all songs to song state
//     React.useEffect( () => {
//         console.log("in use effect")
//         var songOffset = 0
//         var next = null
//         axios.get(
//             `https://api.spotify.com/v1/playlists/${id}/tracks`,
//             {
//                 params: {
//                     offset: songOffset
//                 },
//                 headers: {
//                     Authorization: 'Bearer ' + props.auth.access_token
//                 }
//             }
//         )
//         .then((response) => {
//             console.log(response.data.items)
//             setSongs(response.data.items)
//             songOffset += 100;
//             next = response.data.next;
//             console.log(next)
//         }
//         )
//         .catch((error) => { console.log("Error, lmao")})
//         },
//         [props.match.params.id]
//     )
//     console.log(Songs)
//     //outputs the images for the playlist
//     const [Images, setImages] = React.useState([])
//     React.useEffect(() => {
//         axios.get(
//             `https://api.spotify.com/v1/playlists/${id}/images`,
//             {
//                 headers: {
//                     Authorization: 'Bearer ' + props.auth.access_token
//                 }
//         })
//         .then((response) => {
//                 setImages(response.data[0])
//             }
//         )
//         .catch((error) => { console.log("Error, lmao")})},
//         [props.match.params.id])

//     //make the playlist for the spotify user
//     /*
//         name,
//         public,
//         collaborative,
//         description
//     */
//     const makePlaylist = () => {
//         axios.get(
//             `https://api.spotify.com/v1/me`,
//             {
//                 headers: {
//                     Authorization: 'Bearer ' + props.auth.access_token
//                 }
//             }
//         )
//         .then((response) => {

//         }
//         )
//         .catch((error) => { console.log("Error, lmao")})
//     }
//     return(
//         <div>
//             <img src={Images.url} alt="it's the cover, yuh" />
//             <p>We out here</p>
//             {Object.keys(Songs).map((key, index) => {
//                 let song = Songs[key]
//                 return (

//                     <React.Fragment>
//                         <div>
//                             {console.log(song)}
//                             <li>{song.track.name}</li>
//                         </div>
//                     </React.Fragment>
//                 )
//             }
//             )}
//             {/*get user data here*/}
//             <Link
//                 to={{
//                     pathname: `Playlist/${id}`
//                 }}
//                 /><button type="button" onClick={makePlaylist} />
//         </div>
//     );
// }

// export default PlaylistMaker
