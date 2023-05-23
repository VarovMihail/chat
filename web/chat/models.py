from uuid import uuid4

from django.db import models


def hex_uuid():
    '''Создание случайного уникального идентификатора'''
    return uuid4().hex


class Chat(models.Model):
    id = models.CharField(max_length=32, primary_key=True, editable=False, db_index=True, default=hex_uuid)
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)


class UserChat(models.Model):
    user_id = models.PositiveIntegerField(db_index=True)
    chat = models.ForeignKey(Chat, related_name='users', on_delete=models.CASCADE)
    added = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'chat'], name='unique user chat')
        ]


class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    text = models.TextField()
    user_id = models.PositiveIntegerField(db_index=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
