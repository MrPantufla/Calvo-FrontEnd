import React, { useState } from 'react';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar lógica para autenticar al usuario
    // Puedes hacer una solicitud a un servidor o verificar las credenciales en el cliente

    // Ejemplo de verificación de credenciales básico (solo para fines de demostración)
    if (email === 'usuario@example.com' && password === 'contraseña') {
      // El inicio de sesión es exitoso
      setErrorMessage('');
      // Aquí puedes redirigir al usuario a la página principal o realizar otras acciones necesarias
    } else {
      // El inicio de sesión ha fallado
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <div className="error-message">{errorMessage}</div>
      <form>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}