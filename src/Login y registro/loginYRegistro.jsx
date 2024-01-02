import React, { useState, useEffect } from 'react';
import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';
import { useAuth } from '../contextLogin.jsx';

import './loginYRegistro.css';

export default function LoginYRegistro() {

  const auth = useAuth();

  useEffect(() => {
    auth.setErrorMessage('');
  }, []);

  const handleOpcionClick = (opcion) => {
    auth.setErrorMessage('');
    auth.setOpcionSeleccionada(opcion);
  };

  const handleClose = () => {
    auth.setMostrarLogin(false);
    auth.setMostrarErrorCodigoConfirmacion(false);
    auth.setErrorMessage('');
  }

  const handleParteUtilizableClick = (event) => {
    event.stopPropagation();
  }

  return (
    <div className="contenedorPrincipalLoginYRegistro" onClick={handleClose} style={{ display: auth.mostrarLogin ? 'flex' : 'none' }}>
      <div className="contenedorLoginYRegistro" onClick={handleParteUtilizableClick}>
        <div className="content-container">
          {auth.state.logueado ? (
            auth.state.userInfo.email_confirmado ? (
              <></>
            ) : (
              <ConfirmacionCodigo />
            )
          ) : (
            <div className="botonesYFormulariosContainer">
              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  checked={auth.opcionSeleccionada === 'login'}
                  onChange={() => handleOpcionClick('login')}
                />
                <label className="btn btn-outline-secondary" htmlFor="btnradio1">
                  INICIAR SESIÓN
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                  checked={auth.opcionSeleccionada === 'registro'}
                  onChange={() => handleOpcionClick('registro')}
                />
                <label className="btn btn-outline-secondary" htmlFor="btnradio2">
                  REGISTRARME
                </label>
              </div>
              <div className="contenedorFormularios">
                <div
                  className="contenedorComponenteLogin"
                  style={{ display: auth.opcionSeleccionada === 'login' ? 'block' : 'none' }}
                >
                  <Login />
                </div>
                <div
                  className="contenedorComponenteRegistro"
                  style={{ display: auth.opcionSeleccionada === 'registro' ? 'block' : 'none' }}
                >
                  <Registro />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
