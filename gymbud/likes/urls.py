from django.urls import path
from . import views
from .views import LikeListView, LikeDeleteView

urlpatterns = [
    path('', LikeListView.as_view()),
    path('<int:pk>/', LikeDeleteView.as_view())
]
