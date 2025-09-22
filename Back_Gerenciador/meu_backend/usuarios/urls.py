from django.urls import path, include
from .views import usuarios_list, TarefaAPIView
from . import views

urlpatterns = [
    path('usuarios/', usuarios_list, name='usuarios_list'), #criar usuarios
    path('tarefas/', views.tarefas_list), # criar tarefas
    path('tarefas/<int:id>/', views.excluir_tarefa),  #excluir tarefas por id



]
