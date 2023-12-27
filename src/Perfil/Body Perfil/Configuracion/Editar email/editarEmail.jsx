import "./editarEmail.css"
import { useState } from "react";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from '../../../../contextConfiguracion';

export default function EditarEmail() {
    const auth = useAuth();
    const configuracion = useConfiguracion();
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [repetirEmail, setRepetirEmail] = useState('');

    const vaciarError = () => {
        setErrorMessage('');
    }

    const handleEditarEmail = (event) => {
        event.preventDefault();

        if (!nuevoEmail || !repetirEmail) {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }
        else {
            console.log("Formulario cambio de email enviado");
            confirmarEditarEmail();
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
                    setNuevoEmail('');
                    setRepetirEmail('');
                    configuracion.cerrarEmail();
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

    const toggleCollapse = () =>{
        configuracion.emailAbierto ? (configuracion.cerrarEmail()) : (configuracion.abrirEmail())
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
                <form id="formularioEditarEmail" onSubmit={handleEditarEmail}>
                    <div className="form-group-editarEmail">
                        <label htmlFor="nuevoEmail" id="nuevoEmail" required onFocus={vaciarError}>Nuevo email</label>
                        <input
                            type="text"
                            id="nuevoEmail"
                            value={nuevoEmail}
                            required
                            onChange={(e) => setNuevoEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group-editarEmail">
                        <label htmlFor="repetirEmail" id="repetirEmail" required onFocus={vaciarError}>Repetir email</label>
                        <input
                            type="text"
                            id="repetirEmail"
                            value={repetirEmail}
                            required
                            onChange={(e) => setRepetirEmail(e.target.value)}
                        />
                    </div>
                    <div className="botonNuevaEmailContainer">
                        <button className="botonEnviarEditarEmail" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}