import "./editarEmail.css"
import { useState } from "react";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from '../../../../contextConfiguracion';

export default function EditarEmail() {
    const auth = useAuth();
    const configuracion = useConfiguracion();
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [codigoEmailActual, setCodigoEmailActual] = useState('');
    const [codigoNuevoEmail, setCodigoNuevoEmail] = useState('');
    const [nuevoEmailEnviado, setNuevoEmailEnviado] = useState(false);
    const [codigoEmailActualEnviado, setCodigoEmailActualEnviado] = useState(false);
    const [codigoNuevoEmailEnviado, setCodigoNuevoEmailEnviado] = useState(false);


    const vaciarError = () => {
        setErrorMessage('');
    }

    const handleNuevoEmail = (event) => {
        event.preventDefault();

        if (!nuevoEmail) {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }
        else if (nuevoEmail == auth.state.userInfo.email) {
            setErrorMessage("Ingrese un email diferente al ya asociado.");
            return;
        }
        else {
            corroborarEmail();
        }
    }

    const confirmarEditarEmail = () => {

        fetch('http://localhost:8080/api/editarEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: nuevoEmail,
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de datos exitoso.');
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                    setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar cambiar el email');
                    setErrorMessage('Ocurrió un error inesperado');
                }
            });
    };

    const corroborarEmail = () => {
        fetch('http://localhost:8080/api/corroborarEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: nuevoEmail,
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    setNuevoEmailEnviado(true);
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                    setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar cambiar el email');
                    setErrorMessage('Ocurrió un error inesperado');
                }
            });
    }

    const toggleCollapse = () => {
        configuracion.emailAbierto ? (configuracion.cerrarEmail()) : (configuracion.abrirEmail())
    }

    const enviarCodigo = (args) => {
        fetch('http://localhost:8080/api/codigoEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: args.email,
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Se envió la solicitud de código.');
                    if(args.tipo=='actual'){
                        setCodigoEmailActualEnviado(true);
                    }
                    else{
                        setCodigoNuevoEmailEnviado(true);
                    }
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                    setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar cambiar el email');
                    setErrorMessage('Ocurrió un error inesperado');
                }
            });
    }

    const borrarError = () => {
        setErrorMessage('');
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar">
                <div className="textoHeadEditar">
                    <h1 onClick={toggleCollapse}>EMAIL</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar" onClick={toggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.contraseñaAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarEmail ${configuracion.emailAbierto ? 'open' : ''}`}>
                <div className="error-message">{errorMessage}</div>
                {nuevoEmailEnviado ?
                    (<>
                        <div className="envioCodigosContainer">
                            <div className="emailActualYBoton">
                                <p>{auth.state.userInfo.email}</p>
                                {codigoEmailActualEnviado ?
                                    (<>
                                        <label htmlFor="codigoEmailActual" id="codigoEmailActual"/>
                                        <input
                                            type="text"
                                            id="codigoEmailActual"
                                            value={codigoEmailActual}
                                            required
                                            onChange={(e) => setCodigoEmailActual(e.target.value)}
                                            onFocus={borrarError}
                                            placeholder="Ingresa el código"
                                        />
                                    </>)
                                    :
                                    (<button onClick={() => enviarCodigo({ email: auth.state.userInfo.email, tipo:'actual' })}>Enviar código</button>)
                                }
                            </div>
                            <div className="nuevoEmailYBoton">
                                <p>{nuevoEmail}</p>
                                {codigoNuevoEmailEnviado ?
                                    (<>
                                        <label htmlFor="codigoNuevoEmail" id="codigoNuevoEmail"/>
                                        <input
                                            type="text"
                                            id="codigoEmailActual"
                                            value={codigoEmailActual}
                                            required
                                            onChange={(e) => setCodigoNuevoEmail(e.target.value)}
                                            onFocus={borrarError}
                                            placeholder="Ingresa el código"
                                        />
                                    </>)
                                    :
                                    (<button onClick={() => enviarCodigo({ email: nuevoEmail, tipo:'nuevo' })}>Enviar código</button>)
                                }
                            </div>
                        </div>
                    </>)
                    :
                    (<div className="formularioEnviarNuevoEmail">
                        <form id="formularioEditarEmail">
                            <div className="form-group-editarDatos">
                                <label htmlFor="nuevoEmail" id="nuevoEmail" required onFocus={vaciarError}>Nuevo email</label>
                                <input
                                    type="text"
                                    id="nuevoEmail"
                                    value={nuevoEmail}
                                    required
                                    onChange={(e) => setNuevoEmail(e.target.value)}
                                    onFocus={borrarError}
                                />
                            </div>
                        </form>
                        <button className="botonEnviarNuevoEmail" onClick={handleNuevoEmail}>
                            Aceptar
                        </button>
                    </div>)
                }
            </div>
        </div>
    );
}