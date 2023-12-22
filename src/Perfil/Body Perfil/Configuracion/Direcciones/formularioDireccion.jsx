import './formularioDireccion.css'
import { useDireccion } from "../../../../contextDireccion";
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from "../../../../contextConfiguracion";

export default function FormularioDireccion() {
    const direccion = useDireccion();
    const auth = useAuth();
    const configuracion = useConfiguracion();

    const handleEnviarDireccion = () => {
        direccion.setDireccionConfirmada(true);
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
                    configuracion.cerrarDireccion();
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

    return (
        <>
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
                        />
                    </div>
                    <div className="botonEnviarDireccionContainer">
                        <button className="botonEnviarDireccion" type="button" onClick={handleEnviarDireccion}>
                            Aceptar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}