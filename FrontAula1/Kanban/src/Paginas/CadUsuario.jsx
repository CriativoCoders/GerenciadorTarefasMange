import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { toast } from 'react-toastify';
import { z } from 'zod';

const schemaCadUsuario = z.object({
  nome: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome não pode conter números ou símbolos')
    .refine((value) => !value.startsWith(' ') && !value.endsWith(' '), {
        message: 'O nome não pode conter espaços no início ou no fim',
    }),
// no nome pode ter espaços no meio, mas nao pode conter espaços no começo e no fim
  email: z
    .string()
    .min(5, 'O e-mail deve ter no mínimo 5 caracteres')
    .max(100, 'O e-mail deve ter no máximo 100 caracteres')
    .email('Informe um e-mail válido Ex: usuario@dominio.com')
    .refine((val) => {
      return /^[a-zA-Z0-9._%+-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/.test(val);
    }, 
    {
      message: 'O domínio não pode conter números ou símbolos (ex: gmail.com)',
    }),
});


export function CadUsuario() {
    const navigate = useNavigate(); // 2️⃣ Hook para navegação

    const { 
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaCadUsuario)
    });

    // 3️⃣ Função para enviar dados ao backend
    async function obterDados(data) {
        console.log('Dados enviados:', data);

        try {
            await axios.post('http://127.0.0.1:8000/usuarios/', data);

            toast.success('Usuário cadastrado com sucesso!');
            reset();
            navigate('/CadTarefa');

            // aqui no catch, trato o erro de email ja existente
        } catch (error) {
            //toast.error(`Erro ao cadastrar usuário: ${error.response?.data || error.message}`);
            if (error.response?.data?.email) {
                toast.info('Este email já está em uso.');
            } else {
                toast.error('Usuario já existe! Cadastre novo usuario'); // Mensagem de erro mais amigável
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
