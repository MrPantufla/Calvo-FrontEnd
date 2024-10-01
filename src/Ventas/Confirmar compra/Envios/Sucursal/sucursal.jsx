import { useVariables } from '../../../../contextVariables';
import './sucursal.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../../../contextLogin';

export default function Sucursal(args) {

    const {
        backend,
        setMostrarEnvios,
        setMostrarPagos
    } = useVariables();

    const [codigoSucursal, setCodigoSucursal] = useState('');

    const obtenerSucursal = async () => {
        try {
            let tokenParaEnviar = Cookies.get('jwtToken');

            if (tokenParaEnviar == undefined) {
                tokenParaEnviar = null;
            }

            const response = await fetch(`${backend}/api/extraerSucursal`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenParaEnviar,
                },
            });

            if (response.ok) {
                const sucursal = await response.text();
                setCodigoSucursal(sucursal);
            }
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        obtenerSucursal();
    }, [])

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

    const confirmarEnvio = () => {
        guardarSucursal();
        setMostrarEnvios(false);
        setMostrarPagos(true);
    }

    return (
        <div className="contenedorFormConfirmarCompra">
            <label htmlFor="inputSucursal">CÓDIGO DE SUCURSAL</label>
            <input id="inputSucursal" type="text" value={codigoSucursal} onChange={(e) => setCodigoSucursal(e.target.value)} />
            <div className="contenedorConfirmarBoton">
                {<button className="confirmarBoton" onClick={() => confirmarEnvio()}>Confirmar</button>}
            </div>
        </div>
    );
}