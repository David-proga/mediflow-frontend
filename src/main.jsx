import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 1. Importamos el proveedor del contexto
import { AuthProvider } from './context/AuthContext' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Envolvemos la App con el Provider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)