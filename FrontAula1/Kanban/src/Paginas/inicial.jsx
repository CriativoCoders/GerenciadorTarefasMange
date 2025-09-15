import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router-dom";
import { CadUsuario } from "./CadUsuario";

export function Inicial() {
    return (
        <>
            <CadUsuario />
        </>
    )
}

// depois daqui criei as pasta Rotas com o arquivo Rotas.jsx