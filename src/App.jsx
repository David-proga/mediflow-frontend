import React, { useState } from 'react';
import Card from './components/Card';
import { useFetchData } from './hooks/useFetchData';
import { useAuth } from './context/AuthContext'; 
import axios from 'axios'; 

function App() {
  // Canales de lectura directa (URLs completas)
  const { data: pacientes, loading: loadingPacientes, error: errorPacientes } = useFetchData('http://localhost:8080/api/pacientes');
  const { data: medicos, loading: loadingMedicos, error: errorMedicos } = useFetchData('http://localhost:8081/api/medicos');
  
  // Estado de sesión global
  const { user, login, logout } = useAuth();

  // Mantenemos solo el formulario de pacientes (acceso privado)
  const [nuevoPaciente, setNuevoPaciente] = useState({ nombre: '', apellido: '', dni: '' });

  // Función para registrar Paciente (Puerto 8080)
  const handleCrearPaciente = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/pacientes', nuevoPaciente);
      setNuevoPaciente({ nombre: '', apellido: '', dni: '' });
      window.location.reload(); 
    } catch (err) {
      alert("Error al guardar paciente: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>Panel MediFlow</h1>
        <p style={{ color: '#666' }}>Frontend de Microservicios Desacoplados</p>
        
        <div style={{ marginTop: '20px' }}>
          {!user ? (
            <button onClick={login} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
              🔑 Ingresar al Sistema (Ver Pacientes)
            </button>
          ) : (
            <button onClick={logout} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff4646', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
              🔒 Cerrar Sesión (Ver Médicos)
            </button>
          )}
        </div>
      </header>

      <main>
        {user ? (
          /* ================= VISTA PRIVADA: PACIENTES (CON FORMULARIO) ================= */
          <Card>
            <Card.Header title={`Módulo de Pacientes — ${user.name}`} icon="🩺" />
            <Card.Body>
              {/* Formulario de Registro de Pacientes */}
              <form onSubmit={handleCrearPaciente} style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h5 style={{ margin: '0 0 10px 0' }}>Registrar Nuevo Paciente:</h5>
                <input type="text" placeholder="Nombre" value={nuevoPaciente.nombre} onChange={e => setNuevoPaciente({...nuevoPaciente, nombre: e.target.value})} required style={{ marginRight: '5px', padding: '5px' }} />
                <input type="text" placeholder="Apellido" value={nuevoPaciente.apellido} onChange={e => setNuevoPaciente({...nuevoPaciente, apellido: e.target.value})} required style={{ marginRight: '5px', padding: '5px' }} />
                <input type="text" placeholder="DNI" value={nuevoPaciente.dni} onChange={e => setNuevoPaciente({...nuevoPaciente, dni: e.target.value})} required style={{ marginRight: '5px', padding: '5px', width: '100px' }} />
                <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>+ Añadir</button>
              </form>

              {/* Lista de Pacientes */}
              {loadingPacientes && <p>Consultando pacientes...</p>}
              {errorPacientes && (
                <div style={{ padding: '10px', backgroundColor: '#fff5f5', borderLeft: '4px solid #ff4646', color: '#d32f2f' }}>
                  <strong>Error:</strong> No se pudo conectar con el servicio de pacientes.
                </div>
              )}
              {pacientes && Array.isArray(pacientes) && (
                <div>
                  <h4 style={{ margin: '0 0 10px 0' }}>Pacientes en Postgres (8080):</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {pacientes.map(p => (
                      <li key={p.id} style={{ marginBottom: '8px' }}>
                        <strong>{p.nombre} {p.apellido}</strong> — <small style={{ color: '#666' }}>DNI: {p.dni}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        ) : (
          /* ================= VISTA PÚBLICA: CARTELERA DE MÉDICOS (SOLO LECTURA) ================= */
          <Card>
            <Card.Header title="Cartelera de Especialistas" icon="🥼" />
            <Card.Body>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '20px' }}>
                Bienvenido. Inicie sesión en el botón superior para acceder al registro interno de pacientes.
              </p>

              {loadingMedicos && <p>Consultando personal médico de turno...</p>}
              {errorMedicos && (
                <div style={{ padding: '10px', backgroundColor: '#fff5f5', borderLeft: '4px solid #ff4646', color: '#d32f2f' }}>
                  <strong>Error:</strong> No se pudo conectar con el servicio de médicos.
                </div>
              )}
              {medicos && Array.isArray(medicos) && (
                <div>
                  <h4 style={{ margin: '0 0 12px 0', color: '#1a1a1a' }}>Nuestros Especialistas:</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {medicos.map(m => (
                      <li key={m.id} style={{ marginBottom: '10px' }}>
                        <strong>Dr. {m.nombre} {m.apellido}</strong> — <span style={{ fontSize: '0.8rem', backgroundColor: '#e1e3ff', color: '#34495e', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{m.especialidad}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </main>

      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
        Estructura dinámica basada en estados globales y componentes compuestos.
      </footer>
    </div>
  );
}

export default App;