import './catalogos.css';
import { useDesplegable } from '../../contextDesplegable';

export default function Catalogos() {
    const desplegable = useDesplegable();

    const handleDownload = (filename) => {
        const filePath = `${process.env.PUBLIC_URL}/Archivos/${filename}.pdf`;
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + filePath;
        link.download = `${filename}.pdf`;
        link.click();
    };

    return (
        <div
            className={`desplegableCatalogos ${desplegable.hovered ? 'open' : ''}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
        >
            <div className="descargarCatalogosContainer">
                <a onClick={() => handleDownload('perfiles')}>PERFILES</a>
                <a onClick={() => handleDownload('accesorios')}>ACCESORIOS</a>
                <a onClick={() => handleDownload('herramientas')}>HERRAMIENTAS</a>
            </div>
        </div>
    );
}