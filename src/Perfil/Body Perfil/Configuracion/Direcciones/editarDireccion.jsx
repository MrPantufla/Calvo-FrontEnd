import './editarDireccion.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contextLogin';
import { useConfiguracion } from '../../../../contextConfiguracion';
import { useDireccion } from '../../../../contextDireccion';

export default function Direcciones() {
    const auth = useAuth();
    const configuracion = useConfiguracion();
    const direccion = useDireccion();

    const handleEnviarDireccion = () => {
        fetch('http://localhost:8080/api/direcciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.state.userInfo.token
            },
            body: JSON.stringify(direccionEstructura),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de dirección exitoso');
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                    auth.setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar enviar la dirección');
                    auth.setErrorMessage('Ocurrió un error');
                }
            });
    };

    const direccionEstructura = {
        calle: direccion.calle,
        numero: direccion.numero,
        cp: direccion.cp,
        localidad: direccion.localidad,
        provincia: direccion.provincia
    };

    const toggleCollapse = () =>{
        configuracion.direccionAbierto ? (configuracion.cerrarDireccion()) : (configuracion.abrirDireccion())
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar">
                <div className="textoHeadEditar">
                    <h1 onClick={toggleCollapse}>DIRECCIÓN DE ENVÍO</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar" onClick={toggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: configuracion.direccionAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarDireccion ${configuracion.direccionAbierto ? 'open' : ''}`}>
                <h2>DIRECCIÓN DE ENVÍO</h2>
                <div className="formularioAgregarDireccion">
                    <form>
                        <div className="form-group-direcciones">
                            <label htmlFor="calle" required>Calle</label>
                            <input
                                required
                                type="text"
                                id="calle"
                                value={direccion.calle}
                                onChange={(e) => direccion.setCalle(e.target.value)}
                            />
                        </div>
                        <div className="form-group-direcciones">
                            <label htmlFor="numero" required>Numero</label>
                            <input
                                required
                                type="text"
                                id="numero"
                                value={direccion.numero}
                                onChange={(e) => direccion.setNumero(e.target.value)}
                            />
                        </div>
                        <div className="form-group-direcciones">
                            <label htmlFor="cp" required>Código postal</label>
                            <input
                                required
                                type="text"
                                id="cp"
                                value={direccion.cp}
                                onChange={(e) => direccion.setCp(e.target.value)}
                            />
                        </div>
                        <div className="form-group-direcciones">
                            <label htmlFor="localidad" required>Localidad</label>
                            <input
                                required
                                type="text"
                                id="localidad"
                                value={direccion.localidad}
                                onChange={(e) => direccion.setLocalidad(e.target.value)}
                            />
                        </div>
                        <div className="form-group-direcciones">
                            <label htmlFor="provincia" required>Provincia</label>
                            <input
                                required
                                type="text"
                                id="provincia"
                                value={direccion.provincia}
                                onChange={(e) => direccion.setProvincia(e.target.value)}
                            />
                        </div>
                        <div className="botonEnviarDireccionContainer">
                            <button className="botonEnviarDireccion" type="button" onClick={handleEnviarDireccion}>
                                Aceptar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}