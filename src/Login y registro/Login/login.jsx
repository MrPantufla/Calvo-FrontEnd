import React, { useState } from 'react';
import {cuentas} from './cuentas.js';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const emailCorrecto = cuentas.find((account) => account.email === email);

    if (emailCorrecto) {
      if (emailCorrecto.password === password) {
        console.log("Ingreso exitoso");
      } else {
        setErrorMessage("Contraseña incorrecta")
      }
    } else {
      setErrorMessage('Correo electrónico incorrecto');
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