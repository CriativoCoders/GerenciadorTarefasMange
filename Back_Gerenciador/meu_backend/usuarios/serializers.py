from rest_framework import serializers
from .models import Usuario
from .models import Tarefa


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email']


    def validate_nome(self, value):
        if Usuario.objects.filter(nome=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = ['id', 'descricao', 'setor', 'prioridade', 'data_criacao']