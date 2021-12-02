from django.urls import path
from . import views
from .views import SpotMeDetailView, SpotMeListView

urlpatterns = [
    path('', SpotMeListView.as_view()),
    path('<int:pk>/', SpotMeDetailView.as_view())
]
