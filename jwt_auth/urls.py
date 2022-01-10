from django.urls import path
from . import views
from .views import UsersDetailView, UsersListView, RegisterView, LoginView, AddFollowerView, DeleteFollowerView

urlpatterns = [
    path('', UsersListView.as_view()),
    path('<int:pk>/', UsersDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('addfollow/<int:pk>/', AddFollowerView.as_view()),
    path('removefollow/<int:pk>/', DeleteFollowerView.as_view())
]
