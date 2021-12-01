from django.urls import path
from . import views
from .views import WorkoutListView
from .views import WorkoutDetailView

urlpatterns = [
    # wildcard: we specify that the route can match /5 or /6
    path('<int:pk>/', WorkoutDetailView.as_view()),
    path('', WorkoutListView.as_view()),
]
