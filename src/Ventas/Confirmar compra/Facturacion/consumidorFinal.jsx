import { useState } from "react";

export default function ConsumidorFinal() {

    const [nombreYApellido, setNombreYApellido] = useState('');
    const [cp, setCp] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dni, setDni] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const confirmar = () =>{
        
    }

    return (
        <>
            <div className="contenedorFormConfirmarCompra">
                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="nombreYApellido">NOMBRE Y APELLIDO</label>
                    <input id="nombreYApellido"
                        value={nombreYApellido}
                        onChange={(e) => setNombreYApellido(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="cp">CP</label>
                    <input id="cp"
                        value={cp}
                        onChange={(e) => setCp(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="localidad">LOCALIDAD</label>
                    <input id="localidad"
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="direccionFacturacion">DIRECCIÓN FISCAL</label>
                    <input id="direccionFacturacion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="dni">DNI</label>
                    <input id="dni"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>
            </div>
            <div className="contenedorConfirmarBoton">
                <button onClick={() => confirmar()} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}