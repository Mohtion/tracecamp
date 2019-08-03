from django.shortcuts import render
import spotipy
from django.http import HttpResponse

import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyClientCredentials
# Create your views here.

#this login function is just a test
def login(request):
    username='Mohtendo64'
    scope = 'user-library-read'
    token = util.prompt_for_user_token(username, scope, client_id='014b962707594a218d30b5e0052143eb',client_secret='94f66f7a35c44ed589d063cf6abefb74',redirect_uri=' http://127.0.0.1:8000/spotifycut/')

    if token:
        sp = spotipy.Spotify(auth=token)
        results = sp.current_user_saved_tracks()
        for item in results['items']:
            track = item['track']
            print (track['name'] + ' - ' + track['artists'][0]['name'])
    else:
        print ("Can't get token for", username)
    



"""def post_update(request):
    credentials = SpotifyClientCredentials(
            client_id='014b962707594a218d30b5e0052143eb',
            client_secret='94f66f7a35c44ed589d063cf6abefb74')

    token = credentials.get_access_token()
    #sp = spotipy.Spotify(auth=token)

    birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'
    spotify = spotipy.Spotify(auth=token)


    results = spotify.artist_albums(birdy_uri, album_type='album')
    albums = results['items']
    while results['next']:
        results = spotify.next(results)
        albums.extend(results['items'])

    for album in albums:
        print(album['name'])
    return HttpResponse("hello, we did it. We used the spotify API!")
"""
def httpReply(request):
        return HttpResponse("Hello World. This initial spotify app is working")
