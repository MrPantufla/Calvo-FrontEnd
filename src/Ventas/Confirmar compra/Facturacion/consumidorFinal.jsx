import { useState } from "react";

export default function ConsumidorFinal() {

    const [nombreYApellido, setNombreYApellido] = useState('');
    const [cp, setCp] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dni, setDni] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <div className="form-group-consumidorFinal">
                <label htmlFor="nombreYApellido">NOMBRE Y APELLIDO</label>
                <input id="nombreYApellido"
                    value={nombreYApellido}
                    onChange={(e) => setNombreYApellido(e.target.value)}
                    onFocus={() => setErrorMessage('')}
                />
            </div>

            <div className="form-group-consumidorFinal">
                <label htmlFor="cp">CP</label>
                <input id="cp"
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                    onFocus={() => setErrorMessage('')}
                />
            </div>

            <div className="form-group-consumidorFinal">
                <label htmlFor="localidad">LOCALIDAD</label>
                <input id="localidad"
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                    onFocus={() => setErrorMessage('')}
                />
            </div>

            <div className="form-group-consumidorFinal">
                <label htmlFor="direccionFacturacion">DIRECCIÓN FISCAL</label>
                <input id="direccionFacturacion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    onFocus={() => setErrorMessage('')}
                />
            </div>

            <div className="form-group-consumidorFinal">
                <label htmlFor="dni">DNI</label>
                <input id="dni"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    onFocus={() => setErrorMessage('')}
                />
            </div>
        </>
    );
}