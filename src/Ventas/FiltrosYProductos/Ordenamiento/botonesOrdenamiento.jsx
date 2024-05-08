import './botonesOrdenamiento.css';
import { useProductos } from "../../../contextProductos";
import { useTienda } from '../../../contextTienda';

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
        cod_origAscActivo,
        setCod_origAscActivo,
        cod_origDescActivo,
        setCod_origDescActivo,
        ordenamientoActivo,
        setOrdenamientoActivo,
        cerrarOrdenamientos
    } = useProductos();

    const {isTablet} = useTienda();

    const seleccionarPrecioAsc = () => {
        cerrarOrdenamientos();
        setPrecioAscActivo(true);
    }

    const seleccionarPrecioDesc = () => {
        cerrarOrdenamientos();
        setPrecioDescActivo(true);
    }

    const seleccionarKgAsc = () => {
        cerrarOrdenamientos();
        setKgAscActivo(true);
    }

    const seleccionarKgDesc = () => {
        cerrarOrdenamientos();
        setKgDescActivo(true);
    }

    const seleccionarCod_origAsc = () => {
        cerrarOrdenamientos();
        setCod_origAscActivo(true);
    }

    const seleccionarCod_origDesc = () => {
        cerrarOrdenamientos();
        setCod_origDescActivo(true);
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
            <div className="textoOrdenarPorContainer">
                <p className="textoOrdenarPor">ORDENAR POR</p>
            </div>
            <div className="bodyOrdenarPor">
                <div className="botonesArriba">
                    <div
                        className={`ordenamiento ${precioAscActivo && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { precioAscActivo ? setPrecioAscActivo(false) : (seleccionarPrecioAsc()); toggleOrdenar("precioAsc") }}
                    >
                        <p>Menor precio</p>
                    </div>

                    <div
                        className={`ordenamiento ${precioDescActivo && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { precioDescActivo ? setPrecioDescActivo(false) : (seleccionarPrecioDesc()); toggleOrdenar("precioDesc") }}
                    >
                        <p>Mayor precio</p>
                    </div>

                    <div
                        className={`ordenamiento ${kgAscActivo && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { kgAscActivo ? setKgAscActivo(false) : (seleccionarKgAsc()); toggleOrdenar("kgAsc") }}
                    >
                        <p>Menor peso</p>
                    </div>
                </div>
                <div className="botonesAbajo">
                    <div
                        className={`ordenamiento ${kgDescActivo && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { kgDescActivo ? setKgDescActivo(false) : (seleccionarKgDesc()); toggleOrdenar("kgDesc") }}
                    >
                        <p>Mayor peso</p>
                    </div>

                    <div
                        className={`ordenamiento ${cod_origAscActivo && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { cod_origAscActivo ? setCod_origAscActivo(false) : (seleccionarCod_origAsc()); toggleOrdenar("cod_origAsc") }}
                    >
                        <p>Código A-Z</p>
                    </div>

                    <div
                        className={`ordenamiento ${cod_origDescActivo && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { cod_origDescActivo ? setCod_origDescActivo(false) : (seleccionarCod_origDesc()); toggleOrdenar("cod_origDesc") }}
                    >
                        <p>Código Z-A</p>
                    </div>
                </div>
            </div>
        </div>
    );
}