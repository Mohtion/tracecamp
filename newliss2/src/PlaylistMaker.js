import React from 'react'
import axios from 'axios'

function PlaylistMaker(props){
    var id = props.match.params.id
    
    const [images, setImages] = React.useState({})
    React.useEffect(() => {
        axios.get(
            `https://api.spotify.com/v1/playlists/${id}/images`,
            {
                headers: {
                Authorization: 'Bearer ' + props.auth.access_token
                }
        })
        .then((response) => {
            return setImages(response.data.images)
        })},
        [props.match.params.id])
    return(<img src=""/>);

    
    return (
        <div>Hello Playelist</div>
    )
}


export default PlaylistMaker