import React from 'react';
import Card from './components/Card';
import { useFetchData } from './hooks/useFetchData';
import { useAuth } from './context/AuthContext'; // Importamos el contexto

function App() {
  // Patrón 1: Custom Hook para lógica de Microservicios
const { data, loading, error } = useFetchData('/usuarios/test');
  
  // Patrón 2: Provider Pattern para estado global
  const { user, login, logout } = useAuth();

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>Panel de Control</h1>
        <p style={{ color: '#666' }}>Arquitectura Basada en Patrones y Microservicios</p>
        
        {/* Botón para probar el Provider Pattern */}
        <div style={{ marginTop: '20px' }}>
          {!user ? (
            <button 
              onClick={login}
              style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Simular Login (Provider Pattern)
            </button>
          ) : (
            <button 
              onClick={logout}
              style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff4646', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>

      <main>
        {/* Patrón 3: Compound Components */}
        <Card>
          <Card.Header 
            title={user ? `Sesión iniciada: ${user.name}` : "Estado del Sistema"} 
            icon={user ? "👤" : "🔌"} 
          />
          <Card.Body>
            <div style={{ padding: '10px 0' }}>
              {loading && <p>Consultando backend de microservicios...</p>}
              
              {error && (
                <div style={{ padding: '10px', backgroundColor: '#fff5f5', borderLeft: '4px solid #ff4646', color: '#d32f2f' }}>
                  <strong>Error detectado:</strong> No se pudo conectar con el BFF/Microservicio.
                  <br />
                  <small>La lógica del Custom Hook está funcionando correctamente.</small>
                </div>
              )}

              {data && (
                        <div style={{ color: 'green', fontWeight: 'bold' }}>
                            Respuesta del BFF: {data}
                              </div>
                              )}
            </div>
            
            {user && (
              <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
                Permisos actuales: <strong>{user.role}</strong>
              </p>
            )}
          </Card.Body>
        </Card>
      </main>

      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
        Estructura: Componentes Compuestos | Custom Hooks | Provider Pattern
      </footer>
    </div>
  );
}

export default App;