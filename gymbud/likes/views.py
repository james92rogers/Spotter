from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import LikeSerializer, PopulatedSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Like
from shouts.models import Shout
from rest_framework.exceptions import NotFound
from django.core.exceptions import PermissionDenied

# Create your views here.


class AddLikeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        print("************request received***********")
        request.data["owner"] = request.user.id
        request.data["shout"] = pk
        like = LikeSerializer(data=request.data)
        if like.is_valid():
            like.save()
            return Response(like.data, status=status.HTTP_201_CREATED)
        else:
            return Response(like.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LikeListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        likes = Like.objects.all()
        serialized_likes = PopulatedSerializer(likes, many=True)
        return Response(serialized_likes.data, status=status.HTTP_200_OK)


class LikeDeleteView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk):
        try:
            like = Like.objects.get(id=pk)
        except Like.DoesNotExist:
            raise NotFound()
        if like.owner != request.user:
            raise PermissionDenied()

        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
