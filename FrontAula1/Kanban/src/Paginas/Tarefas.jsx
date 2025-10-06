import React, { useState, useEffect } from "react";
import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [novaDescricao, setNovaDescricao] = useState("");
  const location = useLocation();

  // Carrega tarefas do backend
  useEffect(() => {
    async function carregarTarefas() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/tarefas/");
        setTarefas(response.data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error.message);
      }
    }
    carregarTarefas();
  }, [location]);

  // Organiza as tarefas em colunas por status
  const tarefasPorStatus = {
    "A fazer": [],
    Fazendo: [],
    Pronto: [],
  };

  tarefas.forEach(tarefa => {
    const status = tarefa.status || "A fazer";
    tarefasPorStatus[status].push(tarefa);
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || 
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    // Cópia das listas para manipular
    const sourceList = Array.from(tarefasPorStatus[sourceStatus]);
    const destList = sourceStatus === destStatus ? sourceList : Array.from(tarefasPorStatus[destStatus]);

    // Remove o item da origem
    const [moved] = sourceList.splice(source.index, 1);

    // Atualiza o status da tarefa
    moved.status = destStatus;

    // Insere na lista destino
    destList.splice(destination.index, 0, moved);

    // Atualiza o array completo
     // Reconstrói a lista geral de tarefas combinando todas as colunas
  const novaLista = [];

  Object.entries(tarefasPorStatus).forEach(([status, lista]) => {
    if (status === sourceStatus) {
      if (sourceStatus === destStatus) {
        // Se moveu dentro da mesma coluna, usa a lista atualizada (sourceList já modificada)
        novaLista.push(...sourceList);
      } else {
        // Se a coluna de origem foi modificada (tarefa removida)
        novaLista.push(...sourceList);
      }
    } else if (status === destStatus) {
      // Se é a coluna destino, usa a lista atualizada (destList)
      novaLista.push(...destList);
    } else {
      // Para as outras colunas, usa a lista normal sem alterações
      novaLista.push(...lista);
    }
  });

  setTarefas(novaLista);
  };

  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setNovaDescricao(tarefa.descricao);
  };

  const salvarEdicao = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, descricao: novaDescricao } : t));
    toast.success("Tarefa editada com sucesso!✅");
    setEditandoId(null);
  };

  const excluirTarefa = async (id) => { // aqui faz  a exclusão no backend, passo o id da tarefa a ser excluida
    try {
      await axios.delete(`http://127.0.0.1:8000/tarefas/${id}/`);
      setTarefas(tarefas.filter(t => t.id !== id));
      toast.success("Tarefa excluída com sucesso!✅");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error.message);
    }
  };

  return (
    <>
      <BarraNavegacao />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="quadro-tarefas">
          {Object.entries(tarefasPorStatus).map(([status, listaTarefas]) => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  className="coluna"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? "#e0f7fa" : "#f0f0f0",
                    transition: "background-color 0.3s ease"
                  }}
                >
                  <h2>{status}</h2>

                  <div className="droppable-coluna">
                    {listaTarefas.map((tarefa, index) => (
                      <Draggable key={tarefa.id} draggableId={String(tarefa.id)} index={index}>
                        {(provided, snapshot) => (
                          <div
                            className="card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 16,
                              marginBottom: 8,
                              backgroundColor: snapshot.isDragging ? "#bbdefb" : "#fff",
                              boxShadow: snapshot.isDragging ? "0 8px 16px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.1)",
                              borderRadius: "12px",
                              transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                              ...provided.draggableProps.style
                            }}
                          >
                            <p>
                              <strong>Descrição:</strong>{" "}
                              {editandoId === tarefa.id ? (
                                <input
                                  type="text"
                                  value={novaDescricao}
                                  onChange={e => setNovaDescricao(e.target.value)}
                                />
                              ) : (
                                tarefa.descricao
                              )}
                            </p>

                            <p><strong>Setor:</strong> {tarefa.setor || "Não informado"}</p>
                            <p><strong>Usuário:</strong> {tarefa.usuario || "Não informado"}</p>

                            <div className="acoes">
                              {editandoId === tarefa.id ? (
                                <button type="button" onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
                              ) : (
                                <button type="button" onClick={() => iniciarEdicao(tarefa)}>Editar</button>
                              )}
                              <button type="button" onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
