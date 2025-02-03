import { useFinalizarCompra } from '../../../../contextFinalizarCompra';
import { useVariables } from '../../../../contextVariables';
import { useEffect } from 'react';

export default function Retira() {

    const {
        setKeyDownEnter
    } = useFinalizarCompra();

    const {
        setMostrarEnvios,
        setMostrarPagos
    } = useVariables();

    const confirmar = () => {
        setMostrarEnvios(false);
        setMostrarPagos(true);
    }

    return (
        <div className="contenedorPrincipalRetira">
            <p className="aclaracionesConfirmarCompra">-Podes pasar a retirar tu mercadería de lunes a viernes de 7:00 a 12:00 o de 15:00 a 19:00</p>
            <div className="contenedorConfirmarBoton">
                <button onClick={() => confirmar()} className="confirmarBoton">Confirmar</button>
            </div>
        </div>

    );
}