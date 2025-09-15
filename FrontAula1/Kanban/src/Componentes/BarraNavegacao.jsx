import { Link } from "react-router-dom";

export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ul>
                <li><Link to='/'>Cadastro de Usuário</Link></li>
                <li><Link to='/CadTarefa'>Cadastro de Tarefa</Link></li>
                <li><Link to='/Tarefas'>Gerenciamento de Tarefas</Link></li>
            </ul>
        </nav>
    )

}
// depois de feito os componentes de as paginas e seus respectivos scss, fazer os Links
// melhor amigos das rotas os links