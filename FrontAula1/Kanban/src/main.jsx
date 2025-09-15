import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/main.scss' // aqui mudei o caminho do css para main.scss
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
