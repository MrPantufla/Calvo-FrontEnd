import './registro.css';
import { useState } from 'react';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [apellido, setApellido] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmContrasenia, setConfirmContrasenia] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const confirmarRegistro = () => {
        fetch('http://localhost:8080/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
            credentials: 'include',
        })
            .then(response => {
                if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
                    return response.json();
                } else {
                    return response.text(); // Si no es JSON, leemos la respuesta como texto.
                }
            })
            .then(data => {
                console.log('Respuesta: ', data);
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
                }
            });
    };

    const handleRegistro = () => {
        if (!nombre || !apellido || !email || !contrasenia || !confirmContrasenia) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }
        else{
            if (contrasenia !== confirmContrasenia) {
                setErrorMessage('Las contraseñas no coinciden.');
                return;
            }
            else{
                console.log('Registro exitoso');
                confirmarRegistro();
            }
        }
    };

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
    };

    return (
        <div className="registro-container">
            <h2>Registro</h2>
            <div className="error-message">{errorMessage}</div>
            <form>
                <div className="form-group">
                    <label htmlFor="nombre" required>Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido" required>Apellido:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" required>Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contrasenia" required>Contraseña:</label>
                    <input
                        type="password"
                        id="contrasenia"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmContrasenia" required>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmContrasenia"
                        value={confirmContrasenia}
                        onChange={(e) => setConfirmContrasenia(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleRegistro}>
                    Registrarse
                </button>
            </form>
        </div>
    );
}