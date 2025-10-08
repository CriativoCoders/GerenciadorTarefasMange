from django.db import models
from django.utils import timezone

class Usuario(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nome


class Tarefa(models.Model):
    PRIORIDADE_CHOICES = [
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
    ]

    descricao = models.CharField(max_length=255)
    setor = models.CharField(max_length=100)
    usuario = models.ForeignKey(Usuario, related_name='tarefas', on_delete=models.CASCADE)
    prioridade = models.CharField(max_length=10, choices=PRIORIDADE_CHOICES)
    data_criacao = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=20,
        choices=[
            ('A fazer', 'A fazer'),
            ('Fazendo', 'Fazendo'),
            ('Pronto', 'Pronto'),
        ],
        default='A fazer',
        help_text='Status da tarefa',
    )

    def __str__(self):
        return f"{self.descricao} ({self.prioridade})"
