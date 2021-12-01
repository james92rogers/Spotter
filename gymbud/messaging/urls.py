from django.urls import path
from . import views
from .views import MessageDetailView, MessageListView

urlpatterns = [
    path('', MessageListView.as_view()),
    path('<int:pk>/', MessageDetailView.as_view())
]
