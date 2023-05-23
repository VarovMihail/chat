from urllib.parse import urljoin

from .permissions import JWTPermission
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.response import Response
import requests

from django.conf import settings

from api.v1.chat.serializers import ChatListSerializer, MessagesViewSerializer, InitSerializer
from main.pagination import BasePageNumberPagination
from .services import ChatHandler


class ChatListView(ListAPIView):
    serializer_class = ChatListSerializer
    pagination_class = BasePageNumberPagination
    permission_classes = (JWTPermission,)

    def get_queryset(self):
        jwt = self.request.COOKIES[settings.JWT_AUTH_COOKIE]
        handler = ChatHandler()
        user_data = handler.get_user_data(jwt)
        return ChatHandler().user_chat_queryset(user_data['id'])

class MessagesView(ListAPIView):
    serializer_class = MessagesViewSerializer
    pagination_class = BasePageNumberPagination

    def get_queryset(self):
        return ChatHandler().message_queryset(self.kwargs['id'])

class InitView(GenericAPIView):
    '''Create chat and message'''

    serializer_class = InitSerializer
    permission_classes = ()

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data['jwt'])
        handler = ChatHandler()
        user_data = handler.get_user_data(serializer.data['jwt'])
        chat = handler.get_or_create_chat(user_1=user_data['id'], user_2=serializer.data['user_id'])[0]
        user_data['chat_id'] = chat.id
        return Response(user_data)







