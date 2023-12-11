import './direcciones.css';
import { useState } from 'react';
import { useDirecciones } from '../../../../contextDireciones';
import { useAuth } from '../../../../contextLogin'; 

export default function Direcciones() {
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [cp, setCp] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');

    const direcciones = useDirecciones();
    const auth = useAuth();

    const abrirFormulario = () => {
        setFormularioAbierto(true);
        console.log("abrirFormulario");
    }

    const cancelarEnviarDireccion = () => {
        setCalle('');
        setNumero('');
        setCp('');
        setLocalidad('');
        setProvincia('');
        setFormularioAbierto(false);
        cerrarFormulario();
    }

    const cerrarFormulario = () => {
        setFormularioAbierto(false);
        console.log("cerrarFormulario");
        console.log("formularioAbierto: " + formularioAbierto)
    }

    const handleParteUtilizableClick = (event) => {
        event.stopPropagation();
    }

    const handleEnviarDireccion = () => {
        fetch('http://localhost:8080/api/direcciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(direccion),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de dirección exitoso');
                    cerrarFormulario();
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

    const direccion = {
        calle: calle,
        numero: numero,
        cp: cp,
        localidad: localidad,
        provincia: provincia,
        email_usuario: auth.state.userInfo.email
    };

    return (
        <div className="contenedorPrincipalDirecciones" onClick={direcciones.cerrarDirecciones}>
            <div className="parteUtilizableDirecciones" onClick={handleParteUtilizableClick}>
                {formularioAbierto ?
                    (<div className="formularioAgregarDireccion">
                        <form>
                            <div className="form-group-direcciones">
                                <label htmlFor="calle" required>Calle</label>
                                <input
                                    required
                                    type="text"
                                    id="calle"
                                    value={calle}
                                    onChange={(e) => setCalle(e.target.value)}
                                    onFocus={() => direcciones.setErrorMessage('')}
                                />
                            </div>
                            <div className="form-group-direcciones">
                                <label htmlFor="numero" required>Numero</label>
                                <input
                                    required
                                    type="text"
                                    id="numero"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    onFocus={() => direcciones.setErrorMessage('')}
                                />
                            </div>
                            <div className="form-group-direcciones">
                                <label htmlFor="cp" required>Código postal</label>
                                <input
                                    required
                                    type="text"
                                    id="cp"
                                    value={cp}
                                    onChange={(e) => setCp(e.target.value)}
                                    onFocus={() => direcciones.setErrorMessage('')}
                                />
                            </div>
                            <div className="form-group-direcciones">
                                <label htmlFor="localidad" required>Localidad</label>
                                <input
                                    required
                                    type="text"
                                    id="localidad"
                                    value={localidad}
                                    onChange={(e) => setLocalidad(e.target.value)}
                                    onFocus={() => direcciones.setErrorMessage('')}
                                />
                            </div>
                            <div className="form-group-direcciones">
                                <label htmlFor="provincia" required>Provincia</label>
                                <input
                                    required
                                    type="text"
                                    id="provincia"
                                    value={provincia}
                                    onChange={(e) => setProvincia(e.target.value)}
                                    onFocus={() => direcciones.setErrorMessage('')}
                                />
                            </div>
                            <div className="botonCancelarDireccionContainer">
                                <button className="botonCancelarDireccion" type="button" onClick={cancelarEnviarDireccion}>
                                    Cancelar
                                </button>
                            </div>
                            <div className="botonEnviarDireccionContainer">
                                <button className="botonEnviarDireccion" type="button" onClick={handleEnviarDireccion}>
                                    Aceptar
                                </button>
                            </div>
                        </form>
                    </div>)
                    :
                    (<button className="botonAgregarDireccion" onClick={abrirFormulario}>Añadir dirección</button>

                    )
                }
            </div>
        </div>
    );
}