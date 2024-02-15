import React, { useState, useEffect } from 'react';
import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';
import { useAuth } from '../contextLogin.jsx';

import './loginYRegistro.css';
import RestaurarContraseña from './Restaurar contraseña/restaurarContraseña.jsx';

export default function LoginYRegistro() {

  const {
    setErrorMessage, 
    mostrarLogin,
    opcionSeleccionada,
    setOpcionSeleccionada, 
    setMostrarLogin, 
    setMostrarErrorCodigoConfirmacion,
    state
  } = useAuth();

  useEffect(() => {
    setErrorMessage('');
  }, [mostrarLogin]);

  const handleOpcionClick = (opcion) => {
    setErrorMessage('');
    setOpcionSeleccionada(opcion);
  };

  const handleClose = () => {
    setMostrarLogin(false);
    setMostrarErrorCodigoConfirmacion(false);
    setErrorMessage('');
    setOpcionSeleccionada('login')
  }

  const handleParteUtilizableClick = (event) => {
    event.stopPropagation();
  }

  return (
    <div className="contenedorPrincipalLoginYRegistro" onClick={handleClose} style={{ display: mostrarLogin ? 'flex' : 'none' }}>
      <div className="contenedorLoginYRegistro" onClick={handleParteUtilizableClick}>
        <div className="content-container">
          {state.logueado ? (
            state.userInfo.email_confirmado ? (
              <></>
            ) : (
              <ConfirmacionCodigo />
            )
          ) : (
            opcionSeleccionada === 'restaurarContraseña' ? 
            (<RestaurarContraseña/>) 
            : 
            (<div className="botonesYFormulariosContainer">
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                checked={opcionSeleccionada === 'login'}
                onChange={() => handleOpcionClick('login')}
              />
              <label className="btn btn-outline-secondary radioIniciarSesion" htmlFor="btnradio1">
                INICIAR SESIÓN
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                checked={opcionSeleccionada === 'registro'}
                onChange={() => handleOpcionClick('registro')}
              />
              <label className="btn btn-outline-secondary radioRegistrarme" htmlFor="btnradio2">
                REGISTRARME
              </label>
            </div>
            <div className="contenedorFormularios">
              <div
                className="contenedorComponenteLogin"
                style={{ display: opcionSeleccionada === 'login' ? 'block' : 'none' }}
              >
                <Login />
              </div>
              <div
                className="contenedorComponenteRegistro"
                style={{ display: opcionSeleccionada === 'registro' ? 'block' : 'none' }}
              >
                <Registro />
              </div>
            </div>
          </div>)
          )}
        </div>
      </div>
    </div>
  );
}
