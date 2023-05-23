from rest_framework import serializers

from chat.models import Chat, Message


class ChatListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'name']

class MessagesViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['updated', 'text', 'user_id']

class InitSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    jwt = serializers.CharField()

