import './botonPagos.css';
import { useTienda } from '../../../contextTienda';

export default function BotonPagos(){
    const {
        mostrarPagos, 
        setMostrarPagos
    } = useTienda();

    return(
        <button style={mostrarPagos ? {transform: 'scale(0.95)'} : {}} className="botonAbrirPagos" onClick={() => setMostrarPagos(true)}>
            TRANSFERENCIAS BANCARIAS
        </button>
    );
}