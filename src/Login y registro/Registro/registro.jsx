import './registro.css';
import { useState } from 'react';
import { autoLogin } from '../Login/login';
import { useAuth } from '../../contextLogin';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cuit, setCuit] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmContrasenia, setConfirmContrasenia] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const auth = useAuth();

    const handleRegistro = () => {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefonoRegex= /[0-9]/;

        if (!nombre || !apellido || !email || !contrasenia || !confirmContrasenia || !cuit || !telefono) {
            setErrorMessage('Por favor, complete todos los campos.');
            auth.setMostrarError(true);
            console.log(errorMessage);
            return;
        } else if (!emailRegex.test(email)) {
            setErrorMessage('Ingrese un formato de correo electrónico válido.');
            auth.setMostrarError(true);
            return;
        } else if (!telefonoRegex.test(telefono)){
            setErrorMessage('En el campo de teléfono solo ingrese números');
            auth.setMostrarError(true);
            return;
        } else if (contrasenia !== confirmContrasenia) {
            setErrorMessage('Las contraseñas no coinciden.');
            auth.setMostrarError(true);
            return;
        } else {
            console.log('Registro exitoso');
            confirmarRegistro();
        }
    };

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


    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
        cuit: cuit,
        telefono: parseInt(telefono, 10),
    };

    return (
        <div className="registro-container">
            <div className="error-message">{auth.mostrarError ? errorMessage : ""}</div>
            <form>
                <div className="form-group-registro">
                    <label htmlFor="nombre" required>Nombre/s</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="apellido" required>Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="emailRegistro" required>Correo Electrónico</label>
                    <input
                        type="emailRegistro"
                        id="emailRegistro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="telefonoRegistro" required>Teléfono</label>
                    <input
                        type="tel"
                        id="telefonoRegistro"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="cuit" required> CUIT</label>
                    <input
                        id="cuit"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="contrasenia" required>Contraseña</label>
                    <input
                        type="password"
                        id="contrasenia"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="confirmContrasenia" required>Repetir Contraseña</label>
                    <input
                        type="password"
                        id="confirmContrasenia"
                        value={confirmContrasenia}
                        onChange={(e) => setConfirmContrasenia(e.target.value)}
                        onFocus={auth.setMostrarError(false)}
                    />
                </div>
                <div className="botonRegistroContainer">
                    <button className="botonEnviarRegistro" type="button" onClick={handleRegistro}>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}