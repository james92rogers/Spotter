from django.shortcuts import render
from .models import Message
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedMessageSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound


class MessageDetailView(APIView):

    def get(self, request, pk):
        message = Message.objects.get(id=pk)
        serialized_message = PopulatedMessageSerializer(message)
        return Response(serialized_message.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            message = Message.objects.get(id=pk)
        except Message.DoesNotExist:
            raise NotFound()
        if message.receiver != request.user:
            raise PermissionDenied()

        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        message = Message.objects.get(id=pk)
        if message.receiver != request.user:
            raise PermissionDenied()
        request.data["sender"] = message.sender.id
        request.data["receiver"] = message.receiver.id
        updated_message = MessageSerializer(message, data=request.data)
        if updated_message.is_valid():
            updated_message.save()
            return Response(updated_message.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_message.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class MessageListView(APIView):

    def get(self, request):
        messages = Message.objects.all()
        serialized_messages = PopulatedMessageSerializer(messages, many=True)
        return Response(serialized_messages.data, status=status.HTTP_200_OK)


class MessageSendView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        request.data["sender"] = request.user.id
        request.data["receiver"] = pk
        message = MessageSerializer(data=request.data)
        if message.is_valid():
            message.save()
            return Response(message.data, status=status.HTTP_201_CREATED)
        else:
            return Response(message.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
