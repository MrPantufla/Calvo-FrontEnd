import { useState } from "react";
import { useFinalizarCompra } from "../../../contextFinalizarCompra";
import { useCarrito } from "../../../contextCarrito";
import { useVariables } from "../../../contextVariables";

export default function Inscripto() {

    const {
        confirmarCompra,
        limpiarCarrito,
        setCarritoAbierto
    } = useCarrito();
    
    const {
        setErrorMessage,
        cuit, 
        setCuit
    } = useFinalizarCompra();

    const {
        setMostrarFacturacion,
        setMostrarFinalizarPedido
    } = useVariables();

    const confirmar = (e) =>{
        e.preventDefault();

        const numerosRegex = /^[0-9]+$/;

        if (!cuit) {
            setErrorMessage('Por favor, completa todos los campos')
            return;
        }
        else if (!numerosRegex.test(cuit)) {
            setErrorMessage('CUIT solo puede contener números')
            return;
        }

        if (cuit.length != 11) {
            setErrorMessage('CUIT debe contener 11 caracteres')
            return;
        }

        let datosPedido = 'Facturar a ' + cuit;
        
        setMostrarFacturacion(false);
        setMostrarFinalizarPedido(true);
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
                <button onClick={(e) => confirmar(e)} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}