import React from 'react';
import './App.css';
import Content from './Content'
import PlaylistMaker from './PlaylistMaker'
import {Route} from 'react-router-dom'

function Auth(props) {
  const [authState, setAuthState] = React.useState({
    clientId : "014b962707594a218d30b5e0052143eb",
    clientSecret : "94f66f7a35c44ed589d063cf6abefb74",
    redirectURI : "http://localhost:3000",
    scopes : [
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-private', 
      'playlist-modify-public'
    ],
    authEndpoint: "https://accounts.spotify.com/authorize"
  });

  const [tempHTML, setTempHTML] = React.useState("test string")

  React.useEffect(() => {
    //setTempHTML(<pre>{JSON.stringify(props, null, 2)}</pre>)
    var preParsedHash = new URLSearchParams(props.location.hash.substr(1));
    const accessToken = preParsedHash.get('access_token') 
    if (accessToken != null){
      setAuthState(a => {return {...a, isAuthenticated: true, access_token: accessToken}})
      setTempHTML(accessToken);
    }
  }, [props.location.hash])

  const connectToSpotify = () => {
    window.location.href = `${authState.authEndpoint}?client_id=${authState.clientId}&redirect_uri=${authState.redirectURI}&scope=${authState.scopes.join("%20")}&response_type=token&show_dialog=true`
  }

  const authButton = (
    <div>
      <button type="button" onClick={connectToSpotify}>Connect To Spotify</button>
    </div>
  )
  //returns all code from other components
  return (
    <div className="App">
      {authState.isAuthenticated ? null : authButton}
      {/*token is sent into content */}
      <Route exact path='/' render={(props) => <Content auth={authState} {...props}/>}/> 
      <Route path='/playlist/:id'  render={(props) => <PlaylistMaker auth={authState} {...props}/>}/>  
    </div>
  )
}

export default Auth;