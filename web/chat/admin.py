from django.contrib import admin
from .models import Chat, UserChat, Message


class UserChatInline(admin.TabularInline):
    model = UserChat
    extra = 0


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created']
    inlines = [UserChatInline]

@admin.register(UserChat)
class UserChatAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'chat', 'added']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'text', 'chat', 'created', 'updated']


# Register your models here.

