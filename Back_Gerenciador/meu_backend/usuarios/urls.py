from django.urls import path, include
from . import views

from .views import usuarios_list, tarefas_list, excluir_tarefa 

urlpatterns = [
    path('usuarios/', usuarios_list, name='usuarios_list'),  # criar usuarios
    path('tarefas/', tarefas_list, name='tarefas_list'),      # criar/listar tarefas
    path('tarefas/<int:id>/', excluir_tarefa, name='excluir_tarefa'),  # excluir tarefas por id
]

