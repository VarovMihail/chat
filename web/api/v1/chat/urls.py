from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('', views.ChatListView.as_view(), name='chat_list'),
    path('messages/<str:id>', views.MessagesView.as_view(), name='messages'),
    path('init/', views.InitView.as_view(), name='init'),
]
