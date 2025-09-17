import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Definindo regras de validação
const schemaCadTarefa = z.object({
  descricao: z.string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(255, "Máximo de 255 caracteres"),
  setor: z.string()
    .min(2, "Informe um setor válido")
    .max(100, "Máximo de 100 caracteres"),
  prioridade: z.enum(["baixa", "media", "alta"], {
    errorMap: () => ({ message: "Selecione uma prioridade válida" })
  })
});

export function CadTarefa() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: zodResolver(schemaCadTarefa) });

  // ✅ Enviar dados para o backend
  async function salvarTarefa(data) {
    console.log("Dados enviados:", data);
    try {
      await axios.post("http://127.0.0.1:8000/tarefas/", data);
      alert("Tarefa cadastrada com sucesso!✅");
      reset();
      navigate("/Tarefas"); // 👈 redireciona para a página inicial (ou outra que você preferir)
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error.response?.data || error.message);
      alert("Erro ao cadastrar tarefa. Verifique os dados e tente novamente.");
    }
  }

  return (
    <>
      <BarraNavegacao />

      <form className="formulario" onSubmit={handleSubmit(salvarTarefa)}>
        <h1 className="titulo">Cadastro de Tarefa</h1>

        <label>Descrição:</label>
        <input type="text" {...register("descricao")} />
        {errors.descricao && <p>{errors.descricao.message}</p>}

        <label>Setor:</label>
        <input type="text" {...register("setor")} />
        {errors.setor && <p>{errors.setor.message}</p>}

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
