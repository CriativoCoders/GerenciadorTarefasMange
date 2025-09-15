from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Usuario
from .serializers import UsuarioSerializer
from .models import Tarefa
from .serializers import TarefaSerializer

# api para listar e criar usuarios
@api_view(['GET', 'POST'])
def usuarios_list(request):
    if request.method == 'GET':
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# api para listar e criar tarefas
@api_view(['GET', 'POST'])
def tarefas_list(request):
    if request.method == 'GET':
        tarefas = Tarefa.objects.all().order_by('-data_criacao')
        serializer = TarefaSerializer(tarefas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TarefaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
# api para excluir tarefa
@api_view(['DELETE'])
def excluir_tarefa(request, id):
    try:
        tarefa = Tarefa.objects.get(id=id)
        tarefa.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Tarefa.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    