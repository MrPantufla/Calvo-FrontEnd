import React, { useState, useEffect } from 'react';
import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';
import { useAuth } from '../contextLogin.jsx';

import './loginYRegistro.css';
import RestaurarContraseña from './Restaurar contraseña/restaurarContraseña.jsx';

export default function LoginYRegistro() {
  const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

  const {
    setErrorMessage,
    mostrarLogin,
    opcionSeleccionada,
    setOpcionSeleccionada,
    setMostrarLogin,
    setMostrarErrorCodigoConfirmacion,
    state
  } = useAuth();

  const handleOpcionClick = (opcion) => {
    setErrorMessage('');
    setOpcionSeleccionada(opcion);
  };

  const handleClose = () => {
    if (aptoParaCerrar == true) {
      setMostrarLogin(false);
      setMostrarErrorCodigoConfirmacion(false);
      setErrorMessage('');
      setOpcionSeleccionada('login')
    }
  }

  const noCerrar = (event) => {
    setAptoParaCerrar(false);
    event.stopPropagation();
  }

  return (
    <div className="contenedorPrincipalLoginYRegistro" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleClose} style={{ display: mostrarLogin ? 'flex' : 'none' }}>
      <div className="contenedorLoginYRegistro" onMouseDown={noCerrar} onMouseUp={noCerrar}>
        <div className="content-container">
          {state.logueado ? (
            !state.userInfo.email_confirmado && <ConfirmacionCodigo />
          ) : (
            opcionSeleccionada === 'restaurarContraseña' ?
              (<RestaurarContraseña />)
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
                    onClick={() => setErrorMessage('')}
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
                    onClick={() => setErrorMessage('')}
                  />
                  <label className="btn btn-outline-secondary radioRegistrarme" htmlFor="btnradio2">
                    REGISTRARME
                  </label>
                </div>
                <div className="contenedorFormularios">
                  {opcionSeleccionada == 'login' ?
                    (<div
                      className="contenedorComponenteLogin"
                    >
                      <Login />
                    </div>)
                    :
                    (<div
                      className="contenedorComponenteRegistro"
                    >
                      <Registro />
                    </div>)
                  }
                </div>
              </div>)
          )}
        </div>
      </div>
    </div>
  );
}
