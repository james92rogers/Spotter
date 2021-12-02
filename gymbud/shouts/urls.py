from django.urls import path
from . import views
from .views import ShoutDetailView, ShoutListView
from likes.views import AddLikeView

urlpatterns = [
    path('', ShoutListView.as_view()),
    path('<int:pk>/', ShoutDetailView.as_view()),
    path('<int:pk>/likes/', AddLikeView.as_view())
]
