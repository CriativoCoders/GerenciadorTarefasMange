import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Style/main.scss'; // SCSS personalizado
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      //aumetar o tamnho do toast
      style={{ fontSize: '19px'}}
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored" // "light", "dark", "colored"
    />
  </StrictMode>
);
