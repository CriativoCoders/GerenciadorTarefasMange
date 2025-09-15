from django.urls import path
from .views import usuarios_list
from . import views

urlpatterns = [
    path('usuarios/', usuarios_list, name='usuarios_list'),
    path('tarefas/', views.tarefas_list),
]
