from django.shortcuts import render
from .models import Workout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import WorkoutSerializer


class WorkoutDetailView(APIView):

    def get(self, request, pk):
        workout = Workout.objects.get(id=pk)
        serialized_workout = WorkoutSerializer(workout)
        return Response(serialized_workout.data, status=status.HTTP_200_OK)


class WorkoutListView(APIView):

    def get(self, request):
        workouts = Workout.objects.all()
        serialized_workouts = WorkoutSerializer(workouts, many=True)
        return Response(serialized_workouts.data, status=status.HTTP_200_OK)
