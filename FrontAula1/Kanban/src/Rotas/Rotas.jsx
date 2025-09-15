import{Routes, Route} from 'react-router-dom';
import{ Inicial } from '../Paginas/inicial'; // tive que importa o inicial mesmo
import { CadUsuario } from '../Paginas/CadUsuario';
import { CadTarefa } from '../Paginas/CadTarefa';

export function Rotas() {
    return (
        <Router>
            <Route path="/" element={<Inicial />} />
               <Route path="/CadastroTarefa" element={<CadTarefa />} />
               <Route path="/Tarefas" alement={<CadTarefa />} />
               <Route path="/Cadastro" element={<CadUsuario />} />
        </Router>
    )
}
