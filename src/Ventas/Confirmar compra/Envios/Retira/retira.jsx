import { useFinalizarCompra } from '../../../../contextFinalizarCompra';
import { useVariables } from '../../../../contextVariables';
import { useEffect } from 'react';

export default function Retira(){

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

    return(
        <div className="contenedorConfirmarBoton">
            <button onClick={() => confirmar()} className="confirmarBoton">Confirmar</button>
        </div>
    );
}