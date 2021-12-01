from django.urls import path
from . import views
from .views import UsersDetailView, UsersListView

urlpatterns = [
    path('', UsersListView.as_view()),
    path('<int:pk>/', UsersDetailView.as_view())
]
