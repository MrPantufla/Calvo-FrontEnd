import { useState } from "react";

export default function Inscripto() {

    const [cuit, setCuit] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const confirmar = () =>{
        
    }

    return (
        <>
            <div className="contenedorFormConfirmarCompra">
                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="cuit">CUIT</label>
                    <input id="cuit"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                        type='number'
                    />
                </div>
            </div>
            <div className="contenedorConfirmarBoton">
                <button onClick={() => confirmar()} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}