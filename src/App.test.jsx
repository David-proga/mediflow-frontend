import { describe, it, expect, vi } from 'vitest';

// Simulación (Mocking) de un Contexto Global / Proveedor de Estado
const mockAuthContext = {
  isAuthenticated: true,
  user: { name: 'Gabriel Developer', role: 'ADMIN' },
  login: vi.fn(),
  logout: vi.fn()
};

// Componente simulado de forma aislada
const testComponentRender = (context) => {
  if (!context.isAuthenticated) return 'Redirecting to Login...';
  return `Welcome ${context.user.name} - Role: ${context.user.role}`;
};

describe('Frontend Isolated Component Testing (Vitest + RTL Strategy)', () => {
  
  it('Debería simular el proveedor de estado global y renderizar el componente de forma aislada', () => {
    // Aplicando la estrategia de Mocking descrita en el informe
    const renderResult = testComponentRender(mockAuthContext);
    
    expect(renderResult).toContain('Gabriel Developer');
    expect(renderResult).toContain('ADMIN');
  });

});