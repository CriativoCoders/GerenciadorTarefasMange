from rest_framework import serializers
from .models import Usuario, Tarefa


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email']

    def validate_nome(self, value):
        # Validação para criar e atualizar (exclui o próprio registro ao atualizar)
        if self.instance:
            if Usuario.objects.exclude(pk=self.instance.pk).filter(nome=value).exists():
                raise serializers.ValidationError("Este nome de usuário já está em uso.")
        else:
            if Usuario.objects.filter(nome=value).exists():
                raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value

    def validate_email(self, value):
        if self.instance:
            if Usuario.objects.exclude(pk=self.instance.pk).filter(email=value).exists():
                raise serializers.ValidationError("Este email já está em uso.")
        else:
            if Usuario.objects.filter(email=value).exists():
                raise serializers.ValidationError("Este email já está em uso.")
        return value


class TarefaSerializer(serializers.ModelSerializer):
    # Para receber o ID do usuário na criação/atualização da tarefa
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    class Meta:
        model = Tarefa
        fields = ['id', 'descricao', 'setor', 'usuario', 'prioridade', 'status', 'data_criacao']
        read_only_fields = ['data_criacao']

    def validate_descricao(self, value):
        if len(value) < 5:
            raise serializers.ValidationError("A descrição deve ter pelo menos 5 caracteres.")
        return value


class TarefaDetailSerializer(serializers.ModelSerializer):
    # Exibe os detalhes do usuário dentro da tarefa (nested)
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Tarefa
        fields = ['id', 'descricao', 'setor', 'usuario', 'prioridade', 'status', 'data_criacao']
        read_only_fields = ['data_criacao']
