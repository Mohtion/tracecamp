from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import spotipy
from spotipy import oauth2
import spotipy.util as util
username = 'Mohtendo64'
scope = """playlist-read-private,
    playlist-read-collaborative,
    playlist-modify-private, 
    playlist-modify-public"""
CLIENT_ID = '014b962707594a218d30b5e0052143eb'
CLIENT_SECRET = '94f66f7a35c44ed589d063cf6abefb74'
REDIRECT_URI = 'http://127.0.0.1:8000/spotifycut/callback'
CACHE = './'

#this login function is just a test
def login(request):
    """
    token = util.prompt_for_user_token(
        username, 
        scope, 
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        #CACHE
    )"""
    return oauth2.SpotifyOAuth(
        CLIENT_ID, 
        CLIENT_SECRET, 
        REDIRECT_URI,
        CACHE
    )
    print("this is the token we get back:",)

#The callback page
def callback(request):

    print("we are at calllback")
    code = request.GET.get('code')
    """auth = oauth2.SpotifyOAuth(
        CLIENT_ID, 
        CLIENT_SECRET, 
        REDIRECT_URI,
        CACHE
    )
    
    token auth.get_access_token(code)['access_token']
    """
    #request.POST(access_token)
    return index(request, token)
    #render(request, template_name = 'example_track.html', context = {"tracks": results["tracks"]})

#get the user playlists and let them choose which one to cut    
def index(request, token):
    """auth = oauth2.SpotifyOAuth(
        CLIENT_ID,
        CLIENT_SECRET, 
        REDIRECT_URI,
        CACHE
    )"""
    print("token:", token)
    spotify = spotipy.Spotify(username, token)
    #print("this is the cached token: ", auth.get_cached_token()  )
    lz_uri = 'spotify:artist:36QJpDe2go2KgaRleHCDTp'
    #print("This is the cached token: ", auth.get_cached_token()
    results = spotify.artist_top_tracks(lz_uri)

    for track in results['tracks'][:10]:
        print( 'track    : ' + track['name'])
        print( 'audio    : ' + track['preview_url'])
        print( 'cover art: ' + track['album']['images'][0]['url'])

    playlists = spotify.current_user_playlists()
    return render(request, 'get_playlist.html', {'playlists': playlists})



"""def post_update(request):
    credentials = SpotifyClientCredentials(
            CLIENT_ID='014b962707594a218d30b5e0052143eb',
            CLIENT_SECRET='94f66f7a35c44ed589d063cf6abefb74')

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
