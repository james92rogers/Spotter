from django.shortcuts import render
from .models import Message
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PopulatedMessageSerializer


class MessageDetailView(APIView):

    def get(self, request, pk):
        message = Message.objects.get(id=pk)
        serialized_message = PopulatedMessageSerializer(message)
        return Response(serialized_message.data, status=status.HTTP_200_OK)


class MessageListView(APIView):

    def get(self, request):
        messages = Message.objects.all()
        serialized_messages = PopulatedMessageSerializer(messages, many=True)
        return Response(serialized_messages.data, status=status.HTTP_200_OK)
