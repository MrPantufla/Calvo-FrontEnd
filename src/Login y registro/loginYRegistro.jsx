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
        <div className="loginORegistro">
            {auth.state.logueado ?
                (<ConfirmacionCodigo />)
                :
                (<div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                    <input
                        type="radio"
                        className="btn-check"
                        name="vbtn-radio"
                        id="vbtn-radio1"
                        autoComplete="off"
                        checked={opcionSeleccionada === 'login'}
                        onChange={() => handleOpcionClick('login')}
                    />
                    <label className="btn btn-outline-danger" htmlFor="vbtn-radio1">
                        Iniciar sesión
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="vbtn-radio"
                        id="vbtn-radio2"
                        autoComplete="off"
                        checked={opcionSeleccionada === 'registro'}
                        onChange={() => handleOpcionClick('registro')}
                    />
                    <label className="btn btn-outline-danger" htmlFor="vbtn-radio2">
                        Registrarse
                    </label>
                    <div className="contenedorComponenteLogin" style={{ display: opcionSeleccionada === 'login' ? 'block' : 'none' }}>
                        <Login/>
                    </div>
                    <div className="contenedorComponenteRegistro" style={{ display: opcionSeleccionada === 'registro' ? 'block' : 'none' }}>
                        <Registro/>
                    </div>
                </div>
                )}
        </div>
    );
}
