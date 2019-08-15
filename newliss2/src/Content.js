import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import PlaylistMaker from './PlaylistMaker'

function Content(props){

    const [Playlists, setPlaylists] = React.useState({
        href: null,
        items: [],
        limit: null,
        next: null,
        offset: null,
        previous: null,
        total: null
    })
    React.useEffect(() => {
        if(props.auth.isAuthenticated){
            console.log(props.auth.access_token)
            axios.get(
                'https://api.spotify.com/v1/me/playlists' , 
                {
                    params: {
                        limit: 50
                    },
                    headers: {
                    Authorization: 'Bearer ' + props.auth.access_token
                    }
                })
                .then(function (response) {
                    setPlaylists({
                        href: response.data.href,
                        items: response.data.items,
                        limit: response.data.limit,
                        next: response.data.next,
                        offset: response.data.offset,
                        previous: response.data.previous,
                        total: response.data.total
                    })
                    //console.log(response.data);
                })
                .catch(function (error) {
                console.log(error);
                })
        }
    }, [props.auth.isAuthenticated])

    function makePlaylist(props, item){
        return <Route render={(props) => <PlaylistMaker playlistData={item} auth={props.auth} {...props}/>}/>
    } 
    return(
        <div>
            {Object.keys(Playlists.items).map((key, index) => {
                    let item = Playlists.items[key]
                    return( 
                        <div>
                            <Link 
                                to={{
                                    pathname: `/playlist/${item.id}`,
                                }}
                                replace
                            >{item.name}</Link>
                            <br/><br/>
                        </div>
                    )
            })}
            {/*<pre>{JSON.stringify(Playlists.items[1], null, 4)}</pre>*/}
            <pre>"hello from content"</pre>
        </div>
        
    );
}

export default Content