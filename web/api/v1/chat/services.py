from django.core.cache import cache
from django.db.models import QuerySet
from urllib.parse import urljoin
import requests
from django.conf import settings
from rest_framework.exceptions import ValidationError

from chat.models import Chat, Message, UserChat


class ChatHandler:
    def user_chat_queryset(self, user_id: int) -> QuerySet[Chat]:
        return Chat.objects.filter(users__user_id=user_id)

    def message_queryset(self, chat_id: str) -> QuerySet[Message]:
        return Message.objects.filter(chat=chat_id)

    def get_user_data(self, jwt: str) -> dict:
        cache_key = cache.make_key('user_data', version=jwt)
        print('cache_key', cache_key)
        if cache_key in cache:
            print('get', cache.get(cache_key))
            return cache.get(cache_key)
        url = urljoin(settings.BLOG_URL, '/api/v1/chat/verify-jwt/')
        response = requests.post(url, data={'jwt': jwt})
        if response.status_code != 200:
            raise ValidationError('Something went wrong')
        user_data = response.json()
        cache_set = cache.set(cache_key, user_data)
        print('cache_set', cache_set)
        return user_data

    def get_or_create_chat(self, user_1: int, user_2: int) -> tuple[Chat, bool]:
        queryset = Chat.objects.filter(users__user_id=user_1).filter(users__user_id=user_2)
        if chat := queryset.first():
            return chat, False
        chat = Chat.objects.create(name=f'chat with {user_1} and {user_2}')
        users = [
            UserChat(user_id=user_1, chat=chat),
            UserChat(user_id=user_2, chat=chat)
        ]
        UserChat.objects.bulk_create(users)

        return chat, True
