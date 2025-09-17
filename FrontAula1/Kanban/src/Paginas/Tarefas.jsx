import React, { useState, useEffect } from "react";
import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import axios from "axios";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [novaDescricao, setNovaDescricao] = useState("");

  // ✅ Carregar tarefas do backend ao montar o componente
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
  }, []);

  // ✅ Alterar status (apenas frontend por enquanto)
  const mudarStatus = (id, novoStatus) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, status: novoStatus } : t));
  };

  // ✅ Iniciar edição
  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setNovaDescricao(tarefa.descricao);
  };

  // ✅ Salvar edição (por enquanto só local)
  const salvarEdicao = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, descricao: novaDescricao } : t));
    alert("Tarefa editada com sucesso!✅")
    setEditandoId(null);
  };

  // ✅ Excluir tarefa no backend e frontend
  //==================================
  // Em teste, o backend está retornando erro 404 ao tentar excluir, ja foi consertado ...
  const excluirTarefa = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tarefas/${id}/`);
      setTarefas(tarefas.filter(t => t.id !== id));
      alert("Tarefa excluida com sucesso!✅");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error.message);
    }
  };

  return (
    <>
      <BarraNavegacao />
      <div className="tarefas-container">
        {tarefas.map(tarefa => (
          <div className="card" key={tarefa.id}>
            <p><strong>Setor:</strong> {tarefa.setor}</p>

            <p>
              <strong>Descrição:</strong> 
              {editandoId === tarefa.id ? (
                <input 
                  type="text" 
                  value={novaDescricao} 
                  onChange={e => setNovaDescricao(e.target.value)} 
                />
              ) : (
                ` ${tarefa.descricao}`
              )}
            </p>

            <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>

            <div className="status">
              <label>Status: </label>
              <select 
                value={tarefa.status || "A fazer"} 
                onChange={e => mudarStatus(tarefa.id, e.target.value)}
              >
                <option value="A fazer">A fazer</option>
                <option value="Fazendo">Fazendo</option>
                <option value="Pronto">Pronto</option>
              </select>
            </div>

            <div className="acoes">
              {editandoId === tarefa.id ? (
                <button type="button" onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
              ) : (
                <button type="button" onClick={() => iniciarEdicao(tarefa)}>Editar</button>
              )}
                <button type="button"onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
