import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// ✅ Definindo regras de validação
const schemaCadTarefa = z.object({
  descricao: z.string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(255, "Máximo de 255 caracteres"),

  setor: z.string()
    .min(2, "Informe um setor válido")
    .max(100, "Máximo de 100 caracteres"),

  usuario: z.string().min(1, "Selecione um usuário"),

  prioridade: z.enum(["baixa", "media", "alta"], {
    errorMap: () => ({ message: "Selecione uma prioridade válida" })
  }),
});

export function CadTarefa() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(schemaCadTarefa) });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/usuarios/")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        toast.error("Erro ao carregar usuários");
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  // Função para enviar dados ao backend
  async function salvarTarefa(data) {
    try {
      // Garante que o usuário seja enviado como número (ID)
      const payload = {
        descricao: data.descricao,
        setor: data.setor,
        usuario: Number(data.usuario),
        prioridade: data.prioridade,
        // opcional: se quiser enviar a data_criacao, pode deixar o backend cuidar disso
      };

      await axios.post("http://127.0.0.1:8000/tarefas/", payload);

      toast.success("Tarefa cadastrada com sucesso!");
      reset(); // limpa o formulário
      navigate("/tarefas"); // redireciona para página de tarefas
    } catch (error) {
      toast.error("Erro ao cadastrar tarefa. Verifique os dados.");
      toast.error("Erro ao salvar tarefa:", error);
    }
  }

  return (
    <>
      <BarraNavegacao />

      <form className="formulario" onSubmit={handleSubmit(salvarTarefa)}>
        <h1 className="titulo">Cadastro de Tarefa</h1>

        <label>Descrição:</label>
        <input
          type="text"
          placeholder="Ex: Descrição da tarefa"
          alt="campo de descrição"
          {...register("descricao")}
        />
        {errors.descricao && <p>{errors.descricao.message}</p>}

        <label>Setor:</label>
        <input
          type="text"
          placeholder="Ex: Desenvolvimento"
          alt="campo de setor"
          {...register("setor")}
        />
        {errors.setor && <p>{errors.setor.message}</p>}

        <label>Usuário</label>
        <select {...register("usuario")}>
          <option value="">Selecione um Usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>
        {errors.usuario && <p>{errors.usuario.message}</p>}

        <label>Prioridade</label>
        <select {...register("prioridade")}>
          <option value="">Selecione a Prioridade</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
        {errors.prioridade && <p>{errors.prioridade.message}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}
