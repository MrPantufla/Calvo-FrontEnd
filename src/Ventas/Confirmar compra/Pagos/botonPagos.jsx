import './botonPagos.css';
import { useTienda } from '../../../contextTienda';

export default function BotonPagos(){
    const {setMostrarPagos} = useTienda();

    return(
        <button className="botonAbrirPagos" onClick={() => setMostrarPagos(true)}>
            TRANSFERENCIAS BANCARIAS
        </button>
    );
}