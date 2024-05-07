import './registro.css';
import { useState } from 'react';
import { useAuth } from '../../contextLogin';
import { useVariables } from '../../contextVariables';

export default function Registro() {
    const { backend } = useVariables();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cuit, setCuit] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmContrasenia, setConfirmContrasenia] = useState('');

    const auth = useAuth();

    const handleRegistro = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefonoRegex = /[0-9]/;

        if (!nombre || !apellido || !email || !contrasenia || !confirmContrasenia || !cuit || !telefono) {
            auth.setErrorMessage('Por favor, completa todos los campos.');
            return;
        } else if (!emailRegex.test(email)) {
            auth.setErrorMessage('Ingrese un formato de correo electrónico válido.');
            return;
        } else if (!telefonoRegex.test(telefono)) {
            auth.setErrorMessage('En el campo de teléfono solo ingrese números');
            return;
        } else if (contrasenia !== confirmContrasenia) {
            auth.setErrorMessage('Las contraseñas no coinciden.');
            return;
        } else {
            confirmarRegistro();
        }
    };

    const confirmarRegistro = async () => {
        const response = await fetch(`${backend}/api/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
            credentials: 'include',
        });

        if (response.ok) {
            auth.handleLogin({ email: usuario.email, password: usuario.contrasenia });
            return null;
        } else {
            const data = await response.text();
            if (response.status === 401) {
                if (data.includes('Email')) {
                    auth.setErrorMessage('Email ya registrado');
                } else if (data.includes('Cuit')) {
                    auth.setErrorMessage('Cuit ya registrado');
                } else if (data !== null) {
                    auth.setErrorMessage(data);
                }
            }
        }
    };

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
        cuit: cuit,
        telefono: parseInt(telefono, 10),
    };

    const presionarEnter = (e) => {
        if (e.key === 'Enter') {
            handleRegistro();
        }
    };

    return (
        <div className="registro-container">
            <div className="errorRegistro errorFormulario">
                {auth.errorMessage != ('') ? (<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>) : (<></>)}{auth.errorMessage}
            </div>
            <form className="formRegistro">
                <div className="form-group-registro">
                    <label htmlFor="nombre" required>NOMBRE/S</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="apellido" required>APELLIDO</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="emailRegistro" required>CORREO ELECTRÓNICO</label>
                    <input
                        type="emailRegistro"
                        id="emailRegistro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="telefonoRegistro" required>TELÉFONO</label>
                    <input
                        type="tel"
                        id="telefonoRegistro"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="cuit" required> CUIT</label>
                    <input
                        id="cuit"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="contrasenia" required>CONTRASEÑA</label>
                    <input
                        type="password"
                        id="contrasenia"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="confirmContrasenia" required>REPETIR CONTRASEÑA</label>
                    <input
                        type="password"
                        id="confirmContrasenia"
                        value={confirmContrasenia}
                        onChange={(e) => setConfirmContrasenia(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                        onKeyDown={presionarEnter}
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