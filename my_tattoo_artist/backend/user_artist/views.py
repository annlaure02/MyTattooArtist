from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserArtist
from .serializers import UserArtistSerializer


#retrieve all artist  and create it in DB
@api_view(['GET', 'POST'])
def user_artist_list(request):
    if request.method == 'GET':
        artists = UserArtist.objects.filter(is_superuser=False)
        serializer = UserArtistSerializer(artists, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
#retrieve, create, update and delete for the artist personal page
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_artist_detail(request, pk):
    try:
        artist = UserArtist.objects.get(pk=pk)
    except UserArtist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserArtistSerializer(artist)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserArtistSerializer(artist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    elif request.method == 'DELETE':
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'POST':
        serializer = UserArtistSerializer(artist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#method how check if artist is in the DB   
@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        data = request.data
        user = UserArtist.objects.get(email=data['email'], password=data['password'])
        if user is not None:
            serializer = UserArtistSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            response_data = {"message": "Les données n'existent pas dans la base de données."}
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        