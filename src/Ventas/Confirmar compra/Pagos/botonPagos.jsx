import './botonPagos.css';
import { useTienda } from '../../../contextTienda';

export default function BotonPagos(){
    const tienda = useTienda();

    return(
        <button className="botonAbrirPagos" onClick={() => tienda.setMostrarPagos(true)}>
            TRANSFERENCIAS BANCARIAS
        </button>
    );
}