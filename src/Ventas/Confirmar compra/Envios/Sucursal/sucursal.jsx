import { useVariables } from '../../../../contextVariables';
import './sucursal.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../../../contextLogin';
import { useCarrito } from '../../../../contextCarrito';
import { useFinalizarCompra } from '../../../../contextFinalizarCompra';

export default function Sucursal(args) {

    const {
        backend,
        setMostrarEnvios,
        setMostrarPagos
    } = useVariables();

    const {
        setErrorMessage,
        setKeyDownEnter
    } = useFinalizarCompra();

    const { codigoSucursal, setCodigoSucursal } = useFinalizarCompra();

    const guardarSucursal = async () => {
        try {
            let tokenParaEnviar = Cookies.get('jwtToken');

            if (tokenParaEnviar == undefined) {
                tokenParaEnviar = null;
            }

            const response = await fetch(`${backend}/api/recibirSucursal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': tokenParaEnviar,
                },
                body: codigoSucursal
            });

            if (response.ok) {
                console.log("Sucursal guardada con éxito")
            }
            else {

            }
        } catch (error) {
            return false;
        }
    }

    const confirmar = () => {
        console.log("EJECUTA DESE SUCURSAL")
        if (codigoSucursal != '') {
            guardarSucursal();
            setMostrarEnvios(false);
            setMostrarPagos(true);
        }
        else {
            setErrorMessage('Ingresa una sucursal válida');
        }
    }

    return (
        <div className="contenedorFormConfirmarCompra">
            <div className="contenedorEntradaConfirmarCompra">
                <label htmlFor="inputSucursal">CÓDIGO DE SUCURSAL</label>
                <input id="inputSucursal" type="text" value={codigoSucursal} onChange={(e) => setCodigoSucursal(e.target.value)} />
            </div>
            <div className="contenedorConfirmarBoton">
                {<button className="confirmarBoton" onClick={() => confirmar()}>Confirmar</button>}
            </div>
        </div>
    );
}