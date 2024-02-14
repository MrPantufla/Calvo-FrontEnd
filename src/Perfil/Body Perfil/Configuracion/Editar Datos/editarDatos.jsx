import './editarDatos.css';
import { useAuth } from '../../../../contextLogin';
import { useState, useEffect } from 'react';
import { useConfiguracion } from '../../../../contextConfiguracion';

export default function EditarDatos() {

    const auth = useAuth();
    const configuracion = useConfiguracion();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cuit, setCuit] = useState('');

    useEffect(() => {
        if (auth.state.logueado) {
            setNombre(auth.state.userInfo.nombre);
            setApellido(auth.state.userInfo.apellido);
            setTelefono(auth.state.userInfo.telefono);
            setCuit(auth.state.userInfo.cuit);
        }
    }, [auth.state.logueado])

    const confirmarEditarDatos = () => {

        fetch('http://localhost:8080/api/editarDatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de datos exitoso.');
                    configuracion.cerrarDatos();
                    window.location.reload();
                    return null;
                } else {
                    console.log(response);
                    configuracion.setErrorMessage(response)
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                    configuracion.setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
                    configuracion.setErrorMessage('El correo electrónico ya está en uso.');
                }
            });
    };

    const editarDatos = (event) => {
        event.preventDefault();
        const letrasRegex = /^[A-Za-z\s]+$/;
        const numerosRegex = /[0-9]/;
        if (!nombre || !apellido || !telefono || !cuit) {
            configuracion.setErrorMessage('Por favor, completa todos los datos');
        }
        else if (!letrasRegex.test(nombre)) {
            configuracion.setErrorMessage('Nombre solo puede contener letras');
        }
        else if(!letrasRegex.test(apellido)){
            configuracion.setErrorMessage('Apellido solo puede contener letras');
        }
        else if (!numerosRegex.test(telefono)) {
            configuracion.setErrorMessage('Teléfono solo puede contener números');
        }
        else if (!numerosRegex.test(cuit)) {
            configuracion.setErrorMessage('Cuit solo puede contener números');
        }
        else {
            confirmarEditarDatos();
        }
    }

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        cuit: cuit,
        telefono: parseInt(telefono, 10),
    };

    const toggleCollapse = () => {
        configuracion.datosAbierto ? (configuracion.cerrarDatos()) : (configuracion.abrirDatos())
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar" onClick={toggleCollapse}>
                <div className="textoHeadEditar">
                    <h1>DATOS DE USUARIO</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="var(--colorRojo)" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.datosAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarDatos editarInformacion ${configuracion.datosAbierto ? 'open' : ''}`}>
                <div className="errorEditarDatos errorFormulario">
                    {configuracion.errorMessage != ('') ? (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>) : (<></>)}{configuracion.errorMessage}
                </div>
                <form className="formularioPerfil formularioEditarDatos" id="formularioEditarDatos" onSubmit={editarDatos}>
                    <div className="form-group-editarPerfil formEditarDatos">
                        <label htmlFor="editarNombre" id="editarNombre" required>NOMBRE/S</label>
                        <input
                            type="text"
                            id="editarNombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            onFocus={()=>configuracion.setErrorMessage('')}
                        />
                    </div>
                    <div className="form-group-editarPerfil formEditarDatos">
                        <label htmlFor="editarApellido" id="editarApellido" required>APELLIDO</label>
                        <input
                            type="text"
                            id="editarApellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            onFocus={()=>configuracion.setErrorMessage('')}
                        />
                    </div>
                    <div className="form-group-editarPerfil formEditarDatos">
                        <label htmlFor="editarTelefono" id="editarTelefono" required>TELÉFONO</label>
                        <input
                            type="tel"
                            id="editarTelefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            onFocus={()=>configuracion.setErrorMessage('')}
                        />
                    </div>
                    <div className="form-group-editarPerfil formEditarDatos">
                        <label htmlFor="editarCuit" id="editarCuit" required> CUIT</label>
                        <input
                            id="editarCuit"
                            value={cuit}
                            onChange={(e) => setCuit(e.target.value)}
                            onFocus={()=>configuracion.setErrorMessage('')}
                        />
                    </div>
                    <div className="botonFormulariosPerfilContainer">
                        <button className="botonFormulariosPerfil" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}