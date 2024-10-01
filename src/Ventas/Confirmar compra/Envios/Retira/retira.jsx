import { useVariables } from '../../../../contextVariables';

export default function Retira(){

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