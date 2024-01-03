import './botonesOrdenamiento.css';
import { useProductos } from "../../../contextProductos";

export function BotonesOrdenamiento() {
    const { 
        precioAscActivo,
        precioDescActivo,
        setPrecioAscActivo,
        setPrecioDescActivo,
        kgAscActivo,
        kgDescActivo,
        setKgAscActivo,
        setKgDescActivo,
        ordenamientoActivo,
        setOrdenamientoActivo
    } = useProductos();

    const seleccionarPrecioAsc = () => {
        setPrecioAscActivo(true);
        setPrecioDescActivo(false);
        setKgAscActivo(false);
        setKgDescActivo(false);
    }

    const seleccionarPrecioDesc = () => {
        setPrecioAscActivo(false);
        setPrecioDescActivo(true);
        setKgAscActivo(false);
        setKgDescActivo(false);
    }

    const seleccionarKgAsc = () => {
        setPrecioAscActivo(false);
        setPrecioDescActivo(false);
        setKgAscActivo(true);
        setKgDescActivo(false);
    }

    const seleccionarKgDesc = () => {
        setPrecioAscActivo(false);
        setPrecioDescActivo(false);
        setKgAscActivo(false);
        setKgDescActivo(true);
    }

    const toggleOrdenar = (prop) => {
        if (prop == ordenamientoActivo) {
            setOrdenamientoActivo(null);
        }
        else {
            setOrdenamientoActivo(prop);
        }
    }

    return (
        <div className="ordenarPor">
            <div className="headOrdenarPor">
                ORDENAR POR
            </div>
            <div className="bodyOrdenarPor">
                <div
                    className={precioAscActivo ? "ordenamiento ordenamientoActivo" : "ordenamiento"}
                    onClick={() => { precioAscActivo ? setPrecioAscActivo(false) : (seleccionarPrecioAsc()); toggleOrdenar("precioAsc") }}
                >
                    <p>Menor precio</p>
                </div>

                <div
                    className={precioDescActivo ? "ordenamiento ordenamientoActivo" : "ordenamiento"}
                    onClick={() => { precioDescActivo ? setPrecioDescActivo(false) : (seleccionarPrecioDesc()); toggleOrdenar("precioDesc") }}
                >
                    <p>Mayor precio</p>
                </div>

                <div
                    className={kgAscActivo ? "ordenamiento ordenamientoActivo" : "ordenamiento"}
                    onClick={() => { kgAscActivo ? setKgAscActivo(false) : (seleccionarKgAsc()); toggleOrdenar("kgAsc") }}
                >
                    <p>Menor peso</p>
                </div>

                <div
                    className={kgDescActivo ? "ordenamiento ordenamientoActivo" : "ordenamiento"}
                    onClick={() => { kgDescActivo ? setKgDescActivo(false) : (seleccionarKgDesc()); toggleOrdenar("kgDesc") }}
                >
                    <p>Mayor peso</p>
                </div>
            </div>
        </div>
    );
}