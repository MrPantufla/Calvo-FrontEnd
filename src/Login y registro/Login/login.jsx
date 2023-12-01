import React, { useState, useEffect } from 'react';
import './login.css';
import { useAuth } from '../../contextLogin.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();

  const { verifyToken } = useAuth();

  const fetchData = async () => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (storedToken && storedEmail) {
      console.log(storedEmail)
      try {
        const isTokenValid = await verifyToken(storedToken);
        console.log("isTokenValid: " + isTokenValid);

        if (isTokenValid) {
          autoLogin(storedEmail, storedToken);
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [auth.mostrarLogin])

  const handleLogin = async () => {
    try {
      if (!auth || !auth.login) {
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

        const isTokenValid = await verifyToken(userData.token);

        if (isTokenValid) {
          auth.login(userData);

          console.log("logueado? " + auth.state.logueado);
          console.log("userInfo: " + JSON.stringify(auth.state.userInfo));
          console.log("email_verificado? " + auth.state.userInfo.email_confirmado);

          localStorage.setItem('token', userData.token);
          localStorage.setItem('email', userData.email);

        } else {
          console.error('Token inválido');
        }
      } else {
        const data = await response.json();
        auth.setMostrarError(true);
        setErrorMessage("Email y/o contraseña inválidos");
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    await handleLogin();
  };
  
  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <div className="error-message">{auth.mostrarError ? errorMessage : ""}</div>
      <form className="formularioLogin" id="formularioLogin" onSubmit={handleLoginSubmit}>
        <div className="form-group inputFormularioLogin">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              auth.setMostrarError(false);
            }}
          />
        </div>
        <div className="form-group inputFormularioLogin">
          <label htmlFor="password">Contraseña:</label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              auth.setMostrarError(false);
            }}
          />
        </div>
        <div className="botonLoginContainer">
          <button className="botonEnviarLogin" type="submit" id="botonLogin">
            Iniciar Sesión
          </button>
        </div>
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