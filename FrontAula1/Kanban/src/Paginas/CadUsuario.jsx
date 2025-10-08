import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { toast } from 'react-toastify';
import { z } from 'zod';

// aqui valida com zod o formualrio que o usuario preenche e vai validar se esta tudo certo
const schemaCadUsuario = z.object({
nome: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres, e não pode estar fazio')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome não pode conter números ou símbolos')
    .refine((value) => !value.startsWith(' ') && !value.endsWith(' '), {
        message: 'O nome não pode conter espaços no início ou no fim',
    }),
email: z
  .string()
  .min(5, 'O e-mail deve ter no mínimo 5 caracteres, e não pode estar vazio')
  .max(100, 'O e-mail deve ter no máximo 100 caracteres')
  .email('Informe um e-mail válido Ex: usuario@dominio.com')
  .refine((value) => !value.startsWith(' ') && !value.endsWith(' '), {
    message: 'O e-mail não pode conter espaços em branco',
  })
  .refine((value) => value.endsWith('@gmail.com'), {
    message: 'O e-mail deve pertencer ao domínio @gmail.com',
  }),

});

export function CadUsuario() {
    const navigate = useNavigate(); // 2️⃣ Hook para navegação

    const {
    register,
    handleSubmit,
    formState: { errors },
    setError,   
    reset,
    } = useForm({ resolver: zodResolver(schemaCadUsuario) });


    // 3️⃣ Função para enviar dados ao backend
  async function obterDados(data) {
  // Limpa os dados antes de enviar (importante!)
  const dadosLimpos = {
    nome: data.nome.trim(),
    email: data.email.trim(),
  };

  console.log('Enviando para o back-end:', dadosLimpos);

  try {
    await axios.post('http://127.0.0.1:8000/usuarios/', dadosLimpos);

    toast.success('Usuário cadastrado com sucesso!');
    reset(); // Limpa o formulário
    navigate('/CadTarefa'); // Redireciona, se for o caso
  } catch (error) {
    const erros = error.response?.data?.erros;

    if (erros?.nome) {
      setError('nome', { type: 'manual', message: 'Este nome já está em uso.' });
    }

    if (erros?.email) {
      setError('email', { type: 'manual', message: 'Este e-mail já está em uso.' });
    }

    if (!erros?.nome && !erros?.email) {
      toast.error('Erro ao cadastrar usuário. Verifique os campos.');
    }
  }
}

    return (
    <>
        <BarraNavegacao />
        <form className="formulario" onSubmit={handleSubmit(obterDados)}> 
            <h1 className="titulo" alt='Titulo Cadastro de Usuario'>Cadastro de Usuário</h1>

            <label>Nome:</label>
            <input type="text" placeholder='Ex: Fulano' alt='Campo de nome'{...register("nome")} />
            {errors.nome && <p className="erro">{errors.nome.message}</p>}

            <label>E-mail:</label>
            <input type='email' placeholder='Ex:seuemail@exemplo.com' alt='Campo de email'{...register("email")} />
            {errors.email && <p className="erro">{errors.email.message}</p>}

            <button type="submit" alt='Botão cadastrar'>Cadastrar</button>
        </form>
    </>
    );
}
