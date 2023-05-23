from django.urls import path
from main.views import TemplateAPIView


urlpatterns = [
    path('', TemplateAPIView.as_view(template_name='chat/index.html'), name='main'),
    path('init/', TemplateAPIView.as_view(template_name='chat/init.html'), name='init'),

]
