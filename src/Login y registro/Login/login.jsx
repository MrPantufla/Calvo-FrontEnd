import React, { useState, useEffect } from 'react';
import './login.css';
import { useAuth } from '../../contextLogin.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {
    handleLogin,
    mostrarLogin,
    setOpcionSeleccionada,
    setErrorMessage,
    errorMessage,
    borrarCookie,
    esperandoRespuesta
  } = useAuth();

  useEffect(() => {
    handleLogin('', '')
  }, []);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [mostrarLogin])

  const handleLoginSubmit = async () => {
    await borrarCookie();
    const loginForm = document.querySelector('#formularioLogin');
    const emailValue = loginForm.querySelector('#email').value;
    const passwordValue = loginForm.querySelector('#password').value;
    if (!emailValue || !passwordValue) {
      setErrorMessage('Por favor, completa todos los campos')
    }
    else {
      await handleLogin({ email: emailValue.trim(), password: passwordValue });
    }
  };

  const presionarEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLoginSubmit();
    }
  }

  return (
    <div className="login-container">
      <div className="errorLogin errorFormulario">
        {errorMessage != ('') ? (<><svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg> {errorMessage}</>) : (errorMessage)}
      </div>
      <form className="formularioLogin" id="formularioLogin">
        <div className="form-group inputFormularioLogin">
          <label htmlFor="email">CORREO ELECTRÓNICO</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={() => setErrorMessage('')}
            onKeyDown={presionarEnter}
            autoCapitalize='off'
          />
        </div>
        <div className="form-group inputFormularioLogin">
          <label htmlFor="password">CONTRASEÑA</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            onFocus={() => setErrorMessage('')}
            onKeyDown={presionarEnter}
            autoCapitalize='off'
          />
          <a className="olvideMiContraseña" onClick={() => setOpcionSeleccionada('restaurarContraseña')}>Olvidé mi contraseña</a>
        </div>
        <div className="botonLoginContainer">
          <button className="botonEnviarLogin" disabled={esperandoRespuesta} type="button" id="botonLogin" onClick={handleLoginSubmit}>
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}