import { useDireccion } from "../../../../contextDireccion";
import { useAuth } from "../../../../contextLogin";

export default function FormularioDireccion() {
    const direccion = useDireccion();
    const auth = useAuth();

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
                    <div className="form-group-direcciones">
                        <label htmlFor="calle">Calle*</label>
                        <input
                            required
                            type="text"
                            id="calle"
                            value={direccion.calle}
                            onChange={(e) => direccion.setCalle(e.target.value)}
                        />
                    </div>
                    <div className="form-group-direcciones">
                        <label htmlFor="numero">Numero*</label>
                        <input
                            required
                            type="text"
                            id="numero"
                            value={direccion.numero}
                            onChange={(e) => direccion.setNumero(e.target.value)}
                        />
                    </div>
                    <div className="form-group-direcciones">
                        <label htmlFor="cp">Código postal*</label>
                        <input
                            required
                            type="text"
                            id="cp"
                            value={direccion.cp}
                            onChange={(e) => direccion.setCp(e.target.value)}
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
                        />
                    </div>
                    <div className="form-group-direcciones">
                        <label htmlFor="provincia">Provincia*</label>
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
        </>
    );
}