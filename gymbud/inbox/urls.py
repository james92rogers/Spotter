from django.urls import path
from . import views
from .views import MessageDetailView, MessageListView, MessageSendView

urlpatterns = [
    path('', MessageListView.as_view()),
    path('<int:pk>/', MessageDetailView.as_view()),
    path('send/<int:pk>/', MessageSendView.as_view())
]
