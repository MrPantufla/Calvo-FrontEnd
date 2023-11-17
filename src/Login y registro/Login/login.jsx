import React, { useState } from 'react';
import './login.css';
import { useAuth } from '../../contextLogin.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();

  const handleLogin = async () => {
    try {
      if (!auth || !auth.login) {
        // Manejar el caso donde auth o auth.login no están definidos
        console.error('Auth o auth.login no están definidos.');
        return;
      }

      const loginForm = document.querySelector('#formularioLogin');
      const emailValue = loginForm.querySelector('#email').value;
      const passwordValue = loginForm.querySelector('#password').value;

      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, contrasenia: passwordValue }),
      });

      if (response.ok) {
        const userData = await response.json();
        auth.login(userData);
        console.log(userData);

        console.log('Ingreso exitoso');
        // Otras acciones después del inicio de sesión
      } else {
        const data = await response.json();
        setErrorMessage(data);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <div className="error-message">{errorMessage}</div>
      <form id="formularioLogin">
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
        <button type="button" onClick={handleLogin} id="botonLogin">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

const autoLogin = (email, contrasenia) => {
  const loginForm = document.querySelector('#formularioLogin');
  const botonLogin = loginForm.querySelector('#botonLogin');
  loginForm.querySelector('#email').value = email;
  loginForm.querySelector('#password').value = contrasenia;

  botonLogin.click();
};

export { autoLogin };