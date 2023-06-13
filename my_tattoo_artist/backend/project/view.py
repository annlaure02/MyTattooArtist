from django.shortcuts import render
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TattooStyle
from .serializers import TattooStyleSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def tattoo_style_list(request):
    if request.method == 'GET':
        tattoo = TattooStyle.objects.all()
        serializer = TattooStyleSerializer(tattoo, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TattooStyleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
