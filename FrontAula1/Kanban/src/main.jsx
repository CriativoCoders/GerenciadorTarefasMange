import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/main.scss' // aqui mudei o caminho do css para main.scss
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
)
