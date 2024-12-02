import React, { useRef } from 'react';
import './cardMuestra.css';

export default function CardMuestra(args) {
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (imgRef.current) {
            const img = imgRef.current;
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Ajusta la posición del desplazamiento en función de la posición del mouse
            // Convertir las coordenadas del mouse a un porcentaje dentro del contenedor
            const transformOriginX = ((x / rect.width) * 100); // Ajuste para centrar el zoom
            const transformOriginY = ((y / rect.height) * 100); // Ajuste para centrar el zoom

            img.style.transformOrigin = `${transformOriginX}% ${transformOriginY}%`;
        }
    };

    return (
        <div className="contenedorPrincipalCardMuestra">
            <p>{args.titulo}</p>
            <div
                className="contenedorImagen"
                onMouseMove={handleMouseMove}
            >
                <img 
                    src={args.muestra} 
                    alt={args.titulo} 
                    ref={imgRef}
                    loading='lazy'
                />
            </div>
        </div>
    );
}