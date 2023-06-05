from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserArtist
from .serializers import UserArtistSerializer


@api_view(['GET', 'POST'])
def user_artist_list(request):
    """
    List all code snippets, or create a new artist.
    """
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
    

@api_view(['GET', 'PUT', 'DELETE'])
def user_artist_detail(request, pk):
    """
    Retrieve, update or delete a code artist.
    """
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        data = request.data
        exist_email = UserArtist.objects.filter(email=data['email']).exists()
        exist_password = UserArtist.objects.filter(password=data['password']).exists()
        if exist_email & exist_password:
            response_data = {"message": "Les données existent dans la base de données."}
            response_status = status.HTTP_200_OK
        else:
            response_data = {"message": "Les données n'existent pas dans la base de données."}
            response_status = status.HTTP_404_NOT_FOUND

        return Response(response_data, status=response_status)
    

