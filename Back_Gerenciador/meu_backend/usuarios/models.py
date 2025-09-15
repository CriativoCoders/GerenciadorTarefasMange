from django.db import models
from django.utils import timezone

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)


    def __str__(self):
        return self.nome

# CadTarefa 
class Tarefa(models.Model):
    descricao = models.CharField(max_length=255)
    setor = models.CharField(max_length=100)
    prioridade = models.CharField(
        max_length=10,
        choices=[
            ('baixa', 'Baixa'),
            ('media', 'Média'),
            ('alta', 'Alta')
        ]
    )
    data_criacao = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.descricao} ({self.prioridade})"