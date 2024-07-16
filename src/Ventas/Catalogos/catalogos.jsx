import './catalogos.css';
import { useDesplegableCatalogos } from '../../contextDesplegableCatalogos';

export default function Catalogos() {
    const {
        hovered,
        abrirHover,
        cerrarHover
    } = useDesplegableCatalogos();

    const handleDownload = (filename) => {
        const filePath = `${process.env.PUBLIC_URL}/Archivos/${filename}.pdf`;
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + filePath;
        link.download = `${filename}.pdf`;
        link.click();
    };

    return (
        <div
            className={`desplegableCatalogos ${hovered ? 'open' : ''}`}
            onMouseEnter={abrirHover}
            onMouseLeave={cerrarHover}
        >
            <div className="descargarCatalogosContainer">
                <a onClick={() => handleDownload('Catálogo Perfiles Calvo')}>PERFILES</a>
                <a onClick={() => handleDownload('Catálogo Accesorios Calvo')}>ACCESORIOS</a>
            </div>
        </div>
    );
}
