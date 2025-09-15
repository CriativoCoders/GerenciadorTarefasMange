from rest_framework import serializers
from .models import Usuario
from .models import Tarefa


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email']


class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = ['id', 'descricao', 'setor', 'prioridade', 'data_criacao']