import "./editarContraseña.css"
import { useState } from "react";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from '../../../../contextConfiguracion';

export default function EditarContraseña() {
    const auth = useAuth();
    const configuracion = useConfiguracion();
    const [errorMessage, setErrorMessage] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [repetirContraseña, setRepetirContraseña] = useState('');

    const vaciarError = () => {
        setErrorMessage('');
    }

    const handleEditarContraseña = (event) => {
        event.preventDefault();

        if (!nuevaContraseña || !repetirContraseña || !contraseñaActual) {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }
        else {
            console.log("Formulario cambio de contraseña enviado");
            confirmarEditarContraseña();
        }
    }

    const confirmarEditarContraseña = () => {

        fetch('http://localhost:8080/api/editarContraseña', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.state.userInfo.token,
            },
            body: JSON.stringify(emailYContraseña),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de datos exitoso.');
                    setNuevaContraseña('');
                    setRepetirContraseña('');
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
                    console.error('Conflicto al intentar cambiar la contraseña');
                    setErrorMessage('Ocurrió un error inesperado');
                }
            });
    };

    const emailYContraseña = {
        email: auth.state.userInfo.email,
        nuevaContraseña: nuevaContraseña,
        contraseñaActual: contraseñaActual
    }

    const toggleCollapse = () =>{
        configuracion.contraseñaAbierto ? (configuracion.cerrarContraseña()) : (configuracion.abrirContraseña())
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar">
                <div className="textoHeadEditar">
                    <h1 onClick={toggleCollapse}>CONTRASEÑA</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar" onClick={toggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.contraseñaAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarContraseña ${configuracion.contraseñaAbierto ? 'open' : ''}`}>
                <h2>CAMBIAR CONTRASEÑA</h2>
                <div className="error-message">{errorMessage}</div>
                <form id="formularioEditarContraseña" onSubmit={handleEditarContraseña}>
                    <div className="form-group-editarContraseña">
                        <label htmlFor="contraseñaActual" id="contraseñaActual" required onFocus={vaciarError}>Contraseña actual</label>
                        <input
                            type="password"
                            id="contraseñaActual"
                            value={contraseñaActual}
                            required
                            onChange={(e) => setContraseñaActual(e.target.value)}
                        />
                    </div>
                    <div className="form-group-editarContraseña">
                        <label htmlFor="nuevaContraseña" id="contraseña" required onFocus={vaciarError}>Nueva contraseña</label>
                        <input
                            type="password"
                            id="nuevaContraseña"
                            value={nuevaContraseña}
                            required
                            onChange={(e) => setNuevaContraseña(e.target.value)}
                        />
                    </div>
                    <div className="form-group-editarContraseña">
                        <label htmlFor="repetirContraseña" id="repetirContraseña" required onFocus={vaciarError}>Repetir contraseña</label>
                        <input
                            type="password"
                            id="repetirContraseña"
                            value={repetirContraseña}
                            required
                            onChange={(e) => setRepetirContraseña(e.target.value)}
                        />
                    </div>
                    <div className="botonNuevaContraseñaContainer">
                        <button className="botonEnviarEditarContraseña" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}