import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

// 1️⃣ Schema de validação usando Zod
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(5, 'Informe um nome válido')
        .max(100, 'Informe no máximo 100 caracteres'),
    email: z.string()
        .min(9, 'Informe um e-mail válido')
        .max(100, 'Informe no máximo 100 caracteres')
        .email('Informe um email válido')
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

    alert('Usuário cadastrado com sucesso!');
    reset();
    navigate('/CadTarefa');

} catch (error) {
    console.error('Erro ao cadastrar usuário:', error.response?.data || error.message);

    if (error.response?.data?.email) {
        alert('Cadastro Sucedido, porém já está em uso');
        navigate('/CadTarefa'); // 👈 redireciona mesmo com erro
    } else {
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
}
    }

    return (
        <form className="formulario" onSubmit={handleSubmit(obterDados)}> 
            <h1 className="titulo">Cadastro de Usuário</h1>

            <label>Nome:</label>
            <input type="text" {...register("nome")} />
            {errors.nome && <p className="erro">{errors.nome.message}</p>}

            <label>E-mail:</label>
            <input type='email' {...register("email")} />
            {errors.email && <p className="erro">{errors.email.message}</p>}

            <button type="submit">Cadastrar</button>
        </form>
    );
}
