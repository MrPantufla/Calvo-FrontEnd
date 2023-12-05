import "./editarContraseña.css"
import { useState } from "react";
import { useEditarContraseña } from "../../../../contextEditarContraseña";
import { useAuth } from "../../../../contextLogin";

export default function EditarContraseña() {
    const editarContraseña = useEditarContraseña();
    const auth = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [repetirContraseña, setRepetirContraseña] = useState('');

    const handleParteUtilizableClick = (event) => {
        event.stopPropagation();
    }

    const vaciarError = () =>{
        setErrorMessage('');
    }

    const handleEditarContraseña = (event) =>{
        event.preventDefault();

        if(!nuevaContraseña || !repetirContraseña){
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }
        else{
            console.log("Formulario cambio de contraseña enviado");
            confirmarEditarContraseña();
        }
    }

    const confirmarEditarContraseña = () => {

        fetch('http://localhost:8080/api/editarContraseña', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.state.userInfo.token}`,
            },
            body: JSON.stringify(emailYContraseña),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de datos exitoso.');
                    setNuevaContraseña('');
                    setRepetirContraseña('');
                    editarContraseña.cerrarEditarContraseña();
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
        nuevaContraseña: nuevaContraseña
    }

    return (
        <div className="contenedorPrincipalEditarContraseña" onClick={editarContraseña.cerrarEditarContraseña}>
            <div className="parteFuncionalEditarContraseña" onClick={handleParteUtilizableClick}>
                <h2>CAMBIAR CONTRASEÑA</h2>
                <div className="error-message">{errorMessage}</div>
                <form id="formularioEditarContraseña" onSubmit={handleEditarContraseña}>
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