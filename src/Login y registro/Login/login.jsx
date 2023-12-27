import React, { useState, useEffect } from 'react';
import './login.css';
import { useAuth } from '../../contextLogin.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  useEffect(() => {
    auth.handleLogin('','')
  }, []);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [auth.mostrarLogin])

  const handleLoginSubmit = async (e) => {
    const loginForm = document.querySelector('#formularioLogin');
    const emailValue = loginForm.querySelector('#email').value;
    const passwordValue = loginForm.querySelector('#password').value;
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    await auth.handleLogin({email: emailValue, password: passwordValue});
  };

  return (
    <div className="login-container">
      <div className="error-message">{auth.errorMessage}</div>
      <form className="formularioLogin" id="formularioLogin" onSubmit={handleLoginSubmit}>
        <div className="form-group inputFormularioLogin">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={() => auth.setErrorMessage('')}
          />
        </div>
        <div className="form-group inputFormularioLogin">
          <label htmlFor="password">Contraseña</label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            onFocus={() => auth.setErrorMessage('')}
          />
        </div>
        <div className="botonLoginContainer">
          <button className="botonEnviarLogin" type="submit" id="botonLogin">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}