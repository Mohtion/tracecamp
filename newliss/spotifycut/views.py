from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import spotipy
from spotipy import oauth2
import spotipy.util as util
# Create your views here.

#this login function is just a test
class my_views():
    @api_view()
    def login(request):
        username = 'Mohtendo64'
        scope = 'user-library-read'
        return util.prompt_for_user_token(
            username, 
            scope, 
            client_id='014b962707594a218d30b5e0052143eb',
            client_secret='94f66f7a35c44ed589d063cf6abefb74',
            redirect_uri='http://127.0.0.1:8000/spotifycut/callback'
        )

    @api_view(['GET', 'POST'])
    def callback(request):
        code = request.GET.get('code')
        auth = oauth2.SpotifyOAuth(client_id='014b962707594a218d30b5e0052143eb', client_secret='94f66f7a35c44ed589d063cf6abefb74', redirect_uri='http://127.0.0.1:8000/spotifycut/callback')
        return Response(auth.get_access_token(code))
    #get the user playlists and let them choose which one to cut
    @api_view()    
    def index(request):
        token = request.GET.get('access_token')
        sp = spotipy.Spotify(token)
        playlists = sp.current_user_playlists()
        return render(request, 'get_playlist.html', {'playlists': playlists})



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
