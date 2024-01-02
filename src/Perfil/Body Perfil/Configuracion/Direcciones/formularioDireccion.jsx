import './formularioDireccion.css'
import { useDireccion } from "../../../../contextDireccion";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from "../../../../contextConfiguracion";
import { useState } from 'react';

export default function FormularioDireccion() {
    const direccion = useDireccion();
    const auth = useAuth();
    const configuracion = useConfiguracion();
    const [errorMessage, setErrorMessage] = useState('');

    const handleEnviarDireccion = () => {
        direccion.setDireccionConfirmada(true);
        fetch('http://localhost:8080/api/direcciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(direccionEstructura),
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de dirección exitoso');
                    configuracion.cerrarDireccion();
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
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

    const enviarDireccion = (event) => {
        event.preventDefault();
        const letrasRegex = /^[A-Za-z]+$/;
        const numerosRegex = /[0-9]/;
        if (!direccion.calle || !direccion.numero || !direccion.cp || !direccion.localidad || !direccion.provincia) {
            setErrorMessage('Por favor, completa todos los datos');
        }
        else if (!numerosRegex.test(direccion.numero)) {
            setErrorMessage('Número solo puede contener números');
        }
        else if (!letrasRegex.test(direccion.provincia)) {
            setErrorMessage('Provicia solo puede contener letras');
        }
        else {
            handleEnviarDireccion();
        }
    }

    const direccionEstructura = {
        calle: direccion.calle,
        numero: direccion.numero,
        cp: direccion.cp,
        localidad: direccion.localidad,
        provincia: direccion.provincia
    };

    return (
        <>
            <div className="errorEditarDireccion errorFormulario">
                {errorMessage != ('') ? (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>) : (<></>)}  {errorMessage}
            </div>
            <div className="formularioAgregarDireccion">
                <form>
                    <div className="calleYNumero">
                        <div className="form-group-direcciones">
                            <label htmlFor="calle">Calle*</label>
                            <input
                                required
                                type="text"
                                id="calle"
                                value={direccion.calle}
                                onChange={(e) => direccion.setCalle(e.target.value)}
                                className="direccionCalleInput"
                                onFocus={()=>setErrorMessage('')}
                            />
                        </div>
                        <div className="form-group-direcciones">
                            <label htmlFor="numero">Número*</label>
                            <input
                                required
                                type="text"
                                id="numero"
                                value={direccion.numero}
                                onChange={(e) => direccion.setNumero(e.target.value)}
                                className="direccionNumeroInput"
                                onFocus={()=>setErrorMessage('')}
                            />
                        </div>
                    </div>
                    <div className="cpYLocalidad">
                        <div className="form-group-direcciones">
                            <label htmlFor="cp">CP*</label>
                            <input
                                required
                                type="text"
                                id="cp"
                                value={direccion.cp}
                                onChange={(e) => direccion.setCp(e.target.value)}
                                className="direccionCpInput"
                                onFocus={()=>setErrorMessage('')}
                            />
                        </div>
                        <div className="form-group-direcciones">
                            <label htmlFor="localidad">Localidad*</label>
                            <input
                                required
                                type="text"
                                id="localidad"
                                value={direccion.localidad}
                                onChange={(e) => direccion.setLocalidad(e.target.value)}
                                className="direccionCiudadInput"
                                onFocus={()=>setErrorMessage('')}
                            />
                        </div>
                    </div>
                    <div className="form-group-direcciones">
                        <label htmlFor="provincia">Provincia*</label>
                        <input
                            required
                            type="text"
                            id="provincia"
                            value={direccion.provincia}
                            onChange={(e) => direccion.setProvincia(e.target.value)}
                            className="direccionProvinciaInput"
                            onFocus={()=>setErrorMessage('')}
                        />
                    </div>
                    <div className="botonEnviarDireccionContainer">
                        <button className="botonEnviarDireccion" type="button" onClick={enviarDireccion}>
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}