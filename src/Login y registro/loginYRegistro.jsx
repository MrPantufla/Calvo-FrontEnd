import React, { useState, useEffect } from 'react';
import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';
import { useAuth } from '../contextLogin.jsx';

import './loginYRegistro.css';

export default function LoginYRegistro() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('login');
  const auth = useAuth();

  useEffect(() => {
    auth.setMostrarError(false);
  }, []);

  const handleOpcionClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const handleClose = () => {
    auth.setMostrarLogin(false);
    auth.setMostrarError(false);
    auth.setMostrarErrorCodigoConfirmacion(false);
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
              <div></div>
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
                  checked={opcionSeleccionada === 'login'}
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
                  checked={opcionSeleccionada === 'registro'}
                  onChange={() => handleOpcionClick('registro')}
                />
                <label className="btn btn-outline-secondary" htmlFor="btnradio2">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
