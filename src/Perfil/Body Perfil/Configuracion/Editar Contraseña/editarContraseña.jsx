import "./editarContraseña.css"
import { useState } from "react";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from '../../../../contextConfiguracion';

export default function EditarContraseña() {
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
        else if(repetirContraseña!==nuevaContraseña){
            setErrorMessage("Las contraseñas no coinciden");
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
            },
            body: JSON.stringify(contraseñaNueva),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de datos exitoso.');
                    setContraseñaActual('');
                    setNuevaContraseña('');
                    setRepetirContraseña('');
                    configuracion.cerrarContraseña();
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

    const contraseñaNueva = {
        nuevaContraseña: nuevaContraseña,
        contraseñaActual: contraseñaActual
    }

    const toggleCollapse = () => {
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
                <div className="errorEditarContraseña errorFormulario">
                    {errorMessage != ('') ? (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>) : (<></>)}  {errorMessage}
                </div>
                <form className="formularioEditarContraseña formularioPerfil" id="formularioEditarContraseña" onSubmit={handleEditarContraseña}>
                    <div className="form-group-editarPerfil formEditarContraseña">
                        <label htmlFor="contraseñaActual" id="contraseñaActual" required onFocus={vaciarError}>CONTRASEÑA ACTUAL</label>
                        <input
                            type="password"
                            id="contraseñaActual"
                            value={contraseñaActual}
                            onChange={(e) => setContraseñaActual(e.target.value)}
                            onFocus={()=>setErrorMessage('')}
                        />
                    </div>
                    <div className="form-group-editarPerfil formEditarContraseña">
                        <label htmlFor="nuevaContraseña" id="contraseña" required onFocus={vaciarError}>NUEVA CONTRASEÑA</label>
                        <input
                            type="password"
                            id="nuevaContraseña"
                            value={nuevaContraseña}
                            onChange={(e) => setNuevaContraseña(e.target.value)}
                            onFocus={()=>setErrorMessage('')}
                        />
                    </div>
                    <div className="form-group-editarPerfil formEditarContraseña">
                        <label htmlFor="repetirContraseña" id="repetirContraseña" required onFocus={vaciarError}>REPETIR CONTRASEÑA</label>
                        <input
                            type="password"
                            id="repetirContraseña"
                            value={repetirContraseña}
                            onChange={(e) => setRepetirContraseña(e.target.value)}
                            onFocus={()=>setErrorMessage('')}
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