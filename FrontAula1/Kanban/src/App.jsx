import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CadUsuario } from "./Paginas/CadUsuario";
import { CadTarefa } from "./Paginas/CadTarefa";
import Tarefas from "./Paginas/Tarefas";
import { BarraNavegacao } from "./Componentes/BarraNavegacao";

function App() {
  return (
    <Router>  {/* BrowserRouter envolvendo toda a aplicação */}
      <Routes>
        <Route path="/" element={<CadUsuario />} />
        <Route path="/CadTarefa" element={<CadTarefa />} />
        <Route path="/Tarefas" element={<Tarefas />} />
      </Routes>
    </Router>
  );
}

export default App;
