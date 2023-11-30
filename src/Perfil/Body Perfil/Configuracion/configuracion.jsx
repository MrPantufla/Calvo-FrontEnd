import { useDesplegableConfiguracion } from '../../../contextDesplegableConfiguracion';
import './configuracion.css';

export default function Configuracion() {
    const desplegable = useDesplegableConfiguracion();

    return (
        <div
            className={`desplegableConfiguracion ${desplegable.hovered ? 'open' : 'open'}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
        >
            <div className="configuracionContainer">
                <a>PERFILES</a>
                <a>ACCESORIOS</a>
                <a>HERRAMIENTAS</a>
            </div>
        </div>
    );
}
