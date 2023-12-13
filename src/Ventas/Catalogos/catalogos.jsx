import './catalogos.css';
import { useDesplegableCatalogos } from '../../contextDesplegableCatalogos';
import { useState, useEffect } from 'react';

export default function Catalogos() {
    const desplegable = useDesplegableCatalogos();
    const [catalogosTop, setCatalogosTop] = useState(8.7);

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
            const maxCatalogosTop = 8.7; // ajusta el valor máximo de altura según tus necesidades
            const minCatalogosTop = 6.2; // ajusta el valor mínimo de altura según tus necesidades
            const alturaHeader = 150; // ajusta según tus necesidades

            // Calcula la nueva posición top en función del scroll
            let newTop =
                maxCatalogosTop -
                (maxCatalogosTop - minCatalogosTop) * (scrollPosition / alturaHeader);

            // Asegúrate de que newTop no sea menor que el valor mínimo de 7
            newTop = Math.max(minCatalogosTop, newTop);

            // Establece la nueva posición top
            setCatalogosTop(newTop);
        };

        // Agrega el event listener para el scroll
        window.addEventListener('scroll', handleScroll);

        // Limpia el event listener al desmontar el componente
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
