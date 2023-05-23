from rest_framework.permissions import BasePermission
from django.conf import settings


class JWTPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(request.COOKIES.get(settings.JWT_AUTH_COOKIE))


