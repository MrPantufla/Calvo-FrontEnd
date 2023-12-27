import React, { useState, useEffect } from 'react';
import './login.css';
import { useAuth } from '../../contextLogin.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const fetchData = async () => {
    const rawToken = (document.cookie.split('; ').find(cookie => cookie.startsWith('jwtToken=')));
    
    if(rawToken){
      const token = rawToken.slice(9);
    
      const storedEmail = localStorage.getItem('email');
      auth.actualizarToken(token);
    
    if (token && storedEmail) {
      try {
        const isTokenValid = await auth.verifyToken(token);

        if (isTokenValid) {
          autoLogin(storedEmail, token);
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    }
  }
};

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  }

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
        credentials: 'include',
        body: JSON.stringify({ email: emailValue, contrasenia: passwordValue }),
      });

      if (response.ok) {
        const userData = await response.json();



        auth.login(userData)

        localStorage.setItem('email', userData.email);


      } else {
        const data = await response.json();
        auth.setErrorMessage("Email y/o contraseña inválidos");
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

const autoLogin = (email, contrasenia) => {
  const loginForm = document.querySelector('#formularioLogin');
  const botonLogin = loginForm.querySelector('#botonLogin');
  loginForm.querySelector('#email').value = email;
  loginForm.querySelector('#password').value = contrasenia;

  botonLogin.click();
};

export { autoLogin };