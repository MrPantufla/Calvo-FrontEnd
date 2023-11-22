import React, { useState } from 'react';
import './login.css';
import { useAuth } from '../../contextLogin.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();

  const { verifyToken } = useAuth();

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
        console.log('Token recibido del servidor:', userData.token);
        // Verificar el token en el frontend antes de realizar acciones adicionales
        const isTokenValid = verifyToken(userData.token);

        if (isTokenValid) {
          // Almacenar el token en el contexto de autenticación
          auth.login({ token: userData.token });

          // Puedes almacenar usuarioParaDevolver en otro contexto o estado según tus necesidades
          // Ejemplo: setUserDetails(usuarioParaDevolver);

          console.log('Ingreso exitoso');
          // Otras acciones después del inicio de sesión
        } else {
          console.error('Token inválido');
          // Lógica para manejar un token inválido, por ejemplo, redirigir a la página de inicio de sesión
        }
      } else {
        const data = await response.json();
        setErrorMessage(data);
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
      <div className="error-message">{errorMessage}</div>
      <form className="formularioLogin" id="formularioLogin" onSubmit={handleLoginSubmit}>
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