from django.urls import path
from . import views
from .views import SpotMeListView

urlpatterns = [
    path('', SpotMeListView.as_view()),
]
