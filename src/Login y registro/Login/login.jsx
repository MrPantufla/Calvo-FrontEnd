import React, { useState } from 'react';
import {cuentas} from './cuentas.js';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasenia: password }),
      });

      if (response.ok) {
        console.log('Ingreso exitoso');
        // Aquí podrías redirigir al usuario a la página principal, por ejemplo.
      } else {
        const data = await response.json();
        setErrorMessage(data); // Puede variar dependiendo de cómo estés manejando los errores en tu backend.
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
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