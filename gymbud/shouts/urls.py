from django.urls import path
from . import views
from .views import ShoutDetailView, ShoutListView

urlpatterns = [
    path('', ShoutListView.as_view()),
    path('<int:pk>/', ShoutDetailView.as_view())
]
