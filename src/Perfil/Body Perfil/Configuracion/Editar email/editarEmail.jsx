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
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [codigoEmailActual, setCodigoEmailActual] = useState('');
    const [codigoNuevoEmail, setCodigoNuevoEmail] = useState('');
    const [nuevoEmailEnviado, setNuevoEmailEnviado] = useState(false);
    const [codigoEmailActualEnviado, setCodigoEmailActualEnviado] = useState(false);
    const [codigoNuevoEmailEnviado, setCodigoNuevoEmailEnviado] = useState(false);
    const [codigoEmailActualAceptado, setCodigoEmailActualAceptado] = useState();
    const [codigoNuevoEmailAceptado, setCodigoNuevoEmailAceptado] = useState();

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
                    if(args.email==auth.state.userInfo.email){
                        setCodigoEmailActualAceptado(true)
                    }
                    else{
                        setCodigoNuevoEmailAceptado(true)
                    }
                    return null;
                } else {
                    console.log("Código rechazado")
                    if(args.email==auth.state.userInfo.email){
                        setCodigoEmailActualAceptado(false)
                    }
                    else{
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

    const confirmarCambio = (args) =>{
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.emailAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
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
                                        <label htmlFor="codigoEmailActual" id="codigoEmailActual" />
                                        <input
                                            type="text"
                                            id="codigoEmailActual"
                                            value={codigoEmailActual}
                                            required
                                            onChange={(e) => setCodigoEmailActual(e.target.value)}
                                            onFocus={borrarError}
                                            placeholder="Ingresa el código"
                                            disabled={codigoEmailActualAceptado == true}
                                        />
                                        <button onClick={() => verificarCodigo({codigo: codigoEmailActual, email: auth.state.userInfo.email})} disabled={codigoEmailActualAceptado == true}>
                                            {codigoEmailActualAceptado == true ?
                                                (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-send-check" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                </svg>)
                                                :
                                                (codigoEmailActualAceptado == false ?
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-dash" viewBox="0 0 16 16">
                                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5" />
                                                        </svg>
                                                    )
                                                    :
                                                    (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                        </svg>
                                                    )
                                                )
                                            }
                                        </button>
                                    </>)
                                    :
                                    (<button onClick={() => enviarCodigo({ email: auth.state.userInfo.email, tipo: 'actual' })}>Enviar código</button>)
                                }
                            </div>
                            <div className="nuevoEmailYBoton">
                                <p>{nuevoEmail}</p>
                                {codigoNuevoEmailEnviado ?
                                    (<>
                                        <label htmlFor="codigoNuevoEmail" id="codigoNuevoEmail" />
                                        <input
                                            type="text"
                                            id="codigoNuevoEmail"
                                            value={codigoNuevoEmail}
                                            required
                                            onChange={(e) => setCodigoNuevoEmail(e.target.value)}
                                            onFocus={borrarError}
                                            placeholder="Ingresa el código"
                                            disabled={codigoNuevoEmailAceptado == true}
                                        />
                                        <button onClick={() => verificarCodigo({codigo: codigoNuevoEmail, email:nuevoEmail})} disabled={codigoNuevoEmailAceptado == true}>
                                            {codigoNuevoEmailAceptado == true ?
                                                (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-send-check" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                </svg>)
                                                :
                                                (
                                                    codigoNuevoEmailAceptado == false ?
                                                        (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-dash" viewBox="0 0 16 16">
                                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5" />
                                                            </svg>
                                                        )
                                                        :
                                                        (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                            </svg>
                                                        )
                                                )
                                            }
                                        </button>
                                    </>)
                                    :
                                    (<button onClick={() => enviarCodigo({ email: nuevoEmail, tipo: 'nuevo' })}>Enviar código</button>)
                                }
                            </div>
                        </div>
                        <div className="confirmarCambioContainer">
                            <button className="confirmarCambio" disabled={codigoNuevoEmailAceptado != true || codigoEmailActualAceptado != true} onClick={()=>confirmarCambio({emailActual: auth.state.userInfo.email, nuevoEmail: nuevoEmail})}>Confirmar cambio de email</button>
                        </div>
                        <p>Tendrás que iniciar sesión con tu nuevo email una vez efectuado el cambio</p>
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