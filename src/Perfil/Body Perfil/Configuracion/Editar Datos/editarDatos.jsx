import './editarDatos.css';
import { useAuth } from '../../../../contextLogin';
import { useState, useEffect } from 'react';
import { useConfiguracion } from '../../../../contextConfiguracion';

export default function EditarDatos() {

    const auth = useAuth();
    const configuracion = useConfiguracion();
    const [errorMessage, setErrorMessage] = useState('');

    const [nombre, setNombre] = useState(auth.state.userInfo.nombre);
    const [apellido, setApellido] = useState(auth.state.userInfo.apellido);
    const [telefono, setTelefono] = useState(auth.state.userInfo.telefono);
    const [cuit, setCuit] = useState(auth.state.userInfo.cuit);

    const [nombreDisabled, setNombreDisabled] = useState(true);
    const [apellidoDisabled, setApellidoDisabled] = useState(true);
    const [telefonoDisabled, setTelefonoDisabled] = useState(true);
    const [cuitDisabled, setCuitDisabled] = useState(true);

    const handleChangeNombre = () => {
        setNombreDisabled(!nombreDisabled);
    };

    const handleChangeApellido = () => {
        setApellidoDisabled(!apellidoDisabled);
    }

    const handleChangeTelefono = () => {
        setTelefonoDisabled(!telefonoDisabled);
    }

    const handleChangeCuit = () => {
        setCuitDisabled(!cuitDisabled);
    }

    const confirmarEditarDatos = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/api/editarDatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.state.userInfo.token,
            },
            body: JSON.stringify(usuario),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de datos exitoso.');
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
                    console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
                    setErrorMessage('El correo electrónico ya está en uso.');
                }
            });
    };

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        cuit: cuit,
        telefono: parseInt(telefono, 10),
    };

    const toggleCollapse = () =>{
        configuracion.datosAbierto ? (configuracion.cerrarDatos()) : (configuracion.abrirDatos())
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar">
                <div className="textoHeadEditar">
                    <h1 onClick={toggleCollapse}>DATOS DE USUARIO</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar" onClick={toggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.datosAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarDatos ${configuracion.datosAbierto ? 'open' : ''}`}>
                <h2>EDITAR DATOS DE USUARIO</h2>
                <form id="formularioEditarDatos" onSubmit={confirmarEditarDatos}>
                    <div className="form-group-editarDatos">
                        <label htmlFor="nombre" id="editarNombre" required>Nombre/s:</label>
                        <input
                            disabled={nombreDisabled}
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <button onClick={handleChangeNombre} type="button" className="botonEditar">
                            {nombreDisabled ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                </svg>)
                                :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                                </svg>)}
                        </button>
                    </div>
                    <div className="form-group-editarDatos">
                        <label htmlFor="apellido" id="editarApellido" required>Apellido:</label>
                        <input
                            disabled={apellidoDisabled}
                            type="text"
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                        <button onClick={handleChangeApellido} type="button" className="botonEditar">
                            {apellidoDisabled ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                </svg>)
                                :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                                </svg>)}
                        </button>
                    </div>
                    <div className="form-group-editarDatos">
                        <label htmlFor="telefonoEdit" id="editarTelefono" required>Teléfono:</label>
                        <input
                            disabled={telefonoDisabled}
                            type="tel"
                            id="telefonoEdit"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                        <button onClick={handleChangeTelefono} type="button" className="botonEditar">
                            {telefonoDisabled ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                </svg>)
                                :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                                </svg>)}
                        </button>
                    </div>
                    <div className="form-group-editarDatos">
                        <label htmlFor="cuit" id="editarCuit" required> CUIT:</label>
                        <input
                            disabled={cuitDisabled}
                            id="cuit"
                            value={cuit}
                            onChange={(e) => setCuit(e.target.value)}
                            required
                        />
                        <button onClick={handleChangeCuit} type="button" className="botonEditar">
                            {cuitDisabled ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                </svg>)
                                :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                                </svg>)}
                        </button>
                    </div>
                    <div className="botonEditarDatosContainer">
                        <button className="botonEnviarEdit" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}