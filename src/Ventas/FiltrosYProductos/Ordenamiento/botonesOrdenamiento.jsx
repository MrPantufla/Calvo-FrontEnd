import './botonesOrdenamiento.css';
import { useProductos } from "../../../contextProductos";
import { useTienda } from '../../../contextTienda';

export function BotonesOrdenamiento() {
    const {
        ordenamientoActivo,
        setOrdenamientoActivo,
    } = useProductos();

    const {isTablet} = useTienda();

    const toggleOrdenar = (prop) => {
        if (prop == ordenamientoActivo) {
            setOrdenamientoActivo('destacados');
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
                        className={`ordenamiento ${ordenamientoActivo == 'precioAsc' && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { toggleOrdenar('precioAsc') }}
                    >
                        <p>Menor precio</p>
                    </div>

                    <div
                        className={`ordenamiento ${ordenamientoActivo == 'precioDesc' && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { toggleOrdenar("precioDesc") }}
                    >
                        <p>Mayor precio</p>
                    </div>

                    <div
                        className={`ordenamiento ${ordenamientoActivo == 'kgAsc' && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { toggleOrdenar("kgAsc") }}
                    >
                        <p>Menor peso</p>
                    </div>
                </div>
                <div className="botonesAbajo">
                    <div
                        className={`ordenamiento ${ordenamientoActivo == 'kgDesc' && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => {toggleOrdenar("kgDesc") }}
                    >
                        <p>Mayor peso</p>
                    </div>

                    <div
                        className={`ordenamiento ${ordenamientoActivo == 'codigoAsc' && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { toggleOrdenar("codigoAsc") }}
                    >
                        <p>Código A-Z</p>
                    </div>

                    <div
                        className={`ordenamiento ${ordenamientoActivo == 'codigoDesc' && 'ordenamientoActivo'} ${!isTablet && 'desktop'}`}
                        onClick={() => { toggleOrdenar("codigoDesc") }}
                    >
                        <p>Código Z-A</p>
                    </div>
                </div>
            </div>
        </div>
    );
}