import './loginYRegistro.css';
import React, { useState } from 'react';
import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';
import { LoginProvider, ComponentLoadedProvider } from '../contextLogin';
import { useAuth } from '../contextLogin.jsx';


export default function LoginYRegistro() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('login');
    const auth = useAuth();

    const handleOpcionClick = (opcion) => {
        setOpcionSeleccionada(opcion);
    };

    return (
        <div className="contenedorPrincipalLoginYRegistro">
            {auth.state.logueado ?
                (auth.state.userInfo.email_confirmado ? <div></div> : <ConfirmacionCodigo/>)
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
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">
                            Iniciar sesión
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
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">
                            Registrarse
                        </label>
                    </div>
                    <div className="contenedorFormularios">
                        <div className="contenedorComponenteLogin" style={{ display: opcionSeleccionada === 'login' ? 'block' : 'none' }}>
                            <Login />
                        </div>
                        <div className="contenedorComponenteRegistro" style={{ display: opcionSeleccionada === 'registro' ? 'block' : 'none' }}>
                            <Registro />
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

