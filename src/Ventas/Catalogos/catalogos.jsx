import './catalogos.css';
import { useDesplegable } from '../../contextDesplegable';

export default function Catalogos() {
    const desplegable = useDesplegable();

    return (
        <div
            className={`desplegableCatalogos ${desplegable.hovered ? 'open' : ''}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
        >
            <div className="descargarCatalogosContainer">
                <p>PERFILES</p>
                <p>ACCESORIOS</p>
                <p>HERRAMIENTAS</p>
            </div>
        </div>
    );
}