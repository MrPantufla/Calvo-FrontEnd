import './registro.css';
import { useState } from 'react';
import { autoLogin } from '../Login/login';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [apellido, setApellido] = useState('');
    const [cuit, setCuit] = useState('');
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
            if (response.ok) {
                console.log('Envío de datos exitoso');
                autoLogin(usuario.email, usuario.contrasenia);
                return null;
            } else {
                return response.text();
            }
        })
        .then(data => {
            if (data !== null) {
                console.log('Respuesta (texto): ', data);
                setErrorMessage(data);
                // Aquí puedes manejar la respuesta según tus necesidades
            }
        })
        .catch(error => {
            console.error('Ocurrió un error al enviar los datos:', error.message);
            if (error.message.includes('409')) {
                console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
                setErrorMessage('El correo electrónico ya está en uso.');
            }
        });
    };
    
    
    const handleRegistro = () => {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!nombre || !apellido || !email || !contrasenia || !confirmContrasenia || !cuit) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        } else if (!emailRegex.test(email)) {
            setErrorMessage('Ingrese un formato de correo electrónico válido.');
            return;
        } else if (contrasenia !== confirmContrasenia) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        } else {
            console.log('Registro exitoso');
            confirmarRegistro();
        }
    };

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
        cuit: cuit,
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
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailRegistro" required>Correo Electrónico:</label>
                    <input
                        type="emailRegistro"
                        id="emailRegistro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cuit" required> CUIT:</label>
                    <input 
                        id="cuit"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
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