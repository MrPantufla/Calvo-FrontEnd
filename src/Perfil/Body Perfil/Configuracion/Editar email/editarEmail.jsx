import "./editarEmail.css"
import { useState } from "react";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from '../../../../contextConfiguracion';
import { useFavoritos } from "../../../../contextFavoritos";
import { useNavigate } from 'react-router-dom';

export default function EditarEmail() {
    const navigate = useNavigate();
    const auth = useAuth();
    const favoritos = useFavoritos();
    const configuracion = useConfiguracion();
    const [errorMessage, setErrorMessage] = useState('');
    const [advertenceMessage, setAdvertenceMessage] = useState('');
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [codigoEmailActual, setCodigoEmailActual] = useState('');
    const [codigoNuevoEmail, setCodigoNuevoEmail] = useState('');
    const [nuevoEmailEnviado, setNuevoEmailEnviado] = useState(false);
    const [codigoEmailActualEnviado, setCodigoEmailActualEnviado] = useState(false);
    const [codigoNuevoEmailEnviado, setCodigoNuevoEmailEnviado] = useState(false);
    const [codigoEmailActualAceptado, setCodigoEmailActualAceptado] = useState();
    const [codigoNuevoEmailAceptado, setCodigoNuevoEmailAceptado] = useState();
    const [focusEmailActual, setFocusEmailActual] = useState(false);
    const [focusNuevoEmail, setFocusNuevoEmail] = useState(false);

    const vaciarError = () => {
        setErrorMessage('');
    }

    const handleNuevoEmail = () => {
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
                    if (args.tipo == 'actual') {
                        setCodigoEmailActualEnviado(true);
                    }
                    else {
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

    const verificarCodigo = (args) => {
        fetch('http://localhost:8080/api/verificarCodigoEditarEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codigo: args.codigo,
                email: args.email
            }),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Código aceptado.');
                    if (args.email == auth.state.userInfo.email) {
                        setCodigoEmailActualAceptado(true)
                    }
                    else {
                        setCodigoNuevoEmailAceptado(true)
                    }
                    return null;
                } else {
                    console.log("Código rechazado")
                    if (args.email == auth.state.userInfo.email) {
                        setCodigoEmailActualAceptado(false)
                    }
                    else {
                        setCodigoNuevoEmailAceptado(false)
                    }
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

    const confirmarCambio = (args) => {
        fetch('http://localhost:8080/api/confirmarCambio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailActual: args.emailActual,
                nuevoEmail: args.nuevoEmail
            }),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    navigate('/home');
                    auth.logout();
                    favoritos.setFavoritos('');
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

    const enviarCambioEmail = (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(nuevoEmail)) {
            setErrorMessage("Inserte una dirección de email válida")
        }
        else {
            handleNuevoEmail();
        }
    };

    const borrarError = () => {
        setErrorMessage('');
    }

    const borrarAdvertence = () => {
        setAdvertenceMessage('');
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar">
                <div className="textoHeadEditar">
                    <h1 onClick={toggleCollapse}>EMAIL</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar" onClick={toggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.emailAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarEmail ${configuracion.emailAbierto ? 'open' : ''}`}>
                <div className="errorEditarEmail errorFormulario formularioPerfil">
                    {advertenceMessage === '' ? (
                        errorMessage !== '' ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>{' '}
                                {errorMessage}
                            </>
                        ) : (
                            <>{advertenceMessage}</>
                        )
                    ) : (
                        advertenceMessage
                    )}

                </div>
                {nuevoEmailEnviado ?
                    (<>
                        <div className="envioCodigosContainer">
                            <div className="emailYBoton">
                                <p>{auth.state.userInfo.email}</p>
                                {codigoEmailActualEnviado ?
                                    (<div className="codigoYBoton form-group-editarPerfil">
                                        <label htmlFor="codigoEmailActual" id="codigoEmailActual" />
                                        <input
                                            type="text"
                                            id="inputCodigoEmail"
                                            className="inputCodigoEmail"
                                            value={codigoEmailActual}
                                            required
                                            onChange={(e) => setCodigoEmailActual(e.target.value)}
                                            onFocus={() => { borrarError(); borrarAdvertence(); setFocusEmailActual(true)}}
                                            placeholder={focusEmailActual ? '' : 'Ingresa el código'}
                                            disabled={codigoEmailActualAceptado == true}
                                            onBlur={() => setFocusEmailActual(false)}
                                        />
                                        {!codigoEmailActualAceptado ?
                                            (<button className="botonVerificarCodigoEmail" onClick={() =>verificarCodigo({ codigo: codigoEmailActual, email: auth.state.userInfo.email })} disabled={codigoEmailActualAceptado == true}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                </svg>
                                            </button>)
                                            :
                                            (<button className="botonVerificarCodigoEmail emailAceptado">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z" />
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686" />
                                                </svg>
                                            </button>)}
                                    </div>)
                                    :
                                    <button className="botonEnviarCodigoEditarEmail" onClick={() => { enviarCodigo({ email: auth.state.userInfo.email, tipo: 'actual' }); setAdvertenceMessage(`Código enviado a ${auth.state.userInfo.email}`); }}>Enviar código</button>
                                }
                            </div>
                            <div className="emailYBoton">
                                <p>{nuevoEmail}</p>
                                {codigoNuevoEmailEnviado ?
                                    (<div className="codigoYBoton form-group-editarPerfil">
                                        <label htmlFor="codigoNuevoEmail" id="codigoNuevoEmail" />
                                        <input
                                            type="text"
                                            id="codigoNuevoEmail"
                                            className="inputCodigoEmail"
                                            value={codigoNuevoEmail}
                                            required
                                            onChange={(e) => setCodigoNuevoEmail(e.target.value)}
                                            onFocus={() => { borrarError(); borrarAdvertence(); setFocusNuevoEmail(true) }}
                                            placeholder={focusNuevoEmail ? '' : 'Ingresa el código'}
                                            disabled={codigoNuevoEmailAceptado == true}
                                            onBlur={() => setFocusNuevoEmail(false)}
                                        />
                                        {!codigoNuevoEmailAceptado == true ?
                                            (<button className="botonVerificarCodigoEmail" onClick={() => verificarCodigo({ codigo: codigoNuevoEmail, email: nuevoEmail })} disabled={codigoNuevoEmailAceptado == true}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                </svg>
                                            </button>)
                                            :
                                            (<button className="botonVerificarCodigoEmail">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z" />
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686" />
                                                </svg>
                                            </button>)}

                                    </div>)
                                    :
                                    <button className="botonEnviarCodigoEditarEmail" onClick={() => { enviarCodigo({ email: nuevoEmail, tipo: 'nuevo' }); setAdvertenceMessage(`Código enviado a ${nuevoEmail}`); }}>Enviar código</button>
                                }
                            </div>
                        </div>
                        <div className="confirmarCambioContainer">
                            <button className="confirmarCambio" disabled={codigoNuevoEmailAceptado != true || codigoEmailActualAceptado != true} onClick={() => confirmarCambio({ emailActual: auth.state.userInfo.email, nuevoEmail: nuevoEmail })}>Confirmar cambio de email</button>
                        </div>
                        <p className="advertenciaCambioEmail"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg> Tendrás que iniciar sesión con tu nuevo email una vez efectuado el cambio</p>
                    </>)
                    :
                    (<div className="formularioEnviarNuevoEmail">
                        <form className="formularioEditarEmail" id="formularioEditarEmail">
                            <div className="form-group-editarEmail form-group-editarPerfil">
                                <label htmlFor="nuevoEmail" id="nuevoEmail" required onFocus={vaciarError}>NUEVO EMAIL</label>
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
                        <div className="botonEnviarNuevoEmailContainer">
                            <button className="botonEnviarNuevoEmail" onClick={enviarCambioEmail}>
                                Aceptar
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}