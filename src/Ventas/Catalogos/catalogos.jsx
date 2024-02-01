import './catalogos.css';
import { useDesplegableCatalogos } from '../../contextDesplegableCatalogos';
import { useState, useEffect } from 'react';

export default function Catalogos() {
    const desplegable = useDesplegableCatalogos();
    const [catalogosTop, setCatalogosTop] = useState(7.1);

    const handleDownload = (filename) => {
        const filePath = `${process.env.PUBLIC_URL}/Archivos/${filename}.pdf`;
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + filePath;
        link.download = `${filename}.pdf`;
        link.click();
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const maxCatalogosTop = 7.1;
            const minCatalogosTop = 6.1;
            const alturaHeader = 150;

            let newTop =
                maxCatalogosTop -
                (maxCatalogosTop - minCatalogosTop) * (scrollPosition / alturaHeader);

            newTop = Math.max(minCatalogosTop, newTop);

            setCatalogosTop(newTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`desplegableCatalogos ${desplegable.hovered ? 'open' : ''}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
            style={{ top: `${catalogosTop}rem` }}
        >
            <div className="descargarCatalogosContainer">
                <a onClick={() => handleDownload('perfiles')}>PERFILES</a>
                <a onClick={() => handleDownload('accesorios')}>ACCESORIOS</a>
                <a onClick={() => handleDownload('herramientas')}>HERRAMIENTAS</a>
            </div>
        </div>
    );
}
