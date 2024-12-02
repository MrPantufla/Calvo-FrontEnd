import { useTienda } from "../../../contextTienda";
import { useEffect, useState } from "react";

export default function ImagenSoftwareGrande() {
    const [startX, setStartX] = useState(0);

    const {
        imagenSoftwareSeleccionada,
        setImagenSoftwareSeleccionada,
        isMobile
    } = useTienda();

    const clickParteInterna = (e) => {
        e.stopPropagation();
    }

    const anterior = (e) => {
        if (e) e.stopPropagation(); // Solo se ejecuta si 'e' está definido

        if (imagenSoftwareSeleccionada > 1) {
            setImagenSoftwareSeleccionada(imagenSoftwareSeleccionada - 1);
        } else {
            setImagenSoftwareSeleccionada(3);
        }
    }

    const siguiente = (e) => {
        if (e) e.stopPropagation(); // Solo se ejecuta si 'e' está definido

        if (imagenSoftwareSeleccionada < 3) {
            setImagenSoftwareSeleccionada(imagenSoftwareSeleccionada + 1);
        } else {
            setImagenSoftwareSeleccionada(1);
        }
    }

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    useEffect(() => {
        if (isMobile) {
            const handleDocumentTouchMove = (e) => {
                const currentX = e.touches[0].clientX;
                const diffX = currentX - startX;

                if (diffX < -100) { // Verifica si el movimiento es de derecha a izquierda
                    if (imagenSoftwareSeleccionada != null) {
                        siguiente();
                    }
                } else if (diffX > 100) { // Verifica si el movimiento es de izquierda a derecha
                    if (imagenSoftwareSeleccionada != null) {
                        anterior();
                    }
                }
            };

            document.addEventListener('touchstart', handleTouchStart);
            document.addEventListener('touchmove', handleDocumentTouchMove);

            return () => {
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleDocumentTouchMove);
            };
        }
    }, [startX]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (imagenSoftwareSeleccionada != null) {
                if (e.keyCode === 37) {
                    anterior();
                } else if (e.keyCode === 39) {
                    siguiente();
                } else if (e.keyCode === 27) {
                    setImagenSoftwareSeleccionada(null);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [imagenSoftwareSeleccionada]);

    return (
        <div className="imagenGrandeSoftware" onClick={() => setImagenSoftwareSeleccionada(null)}>
            {!isMobile &&
                <button className="anteriorProductoGrande" onClick={anterior}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="white" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                        <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                    </svg>
                </button>
            }

            <div className="parteInternaImagenGrandeSoftware" onClick={clickParteInterna}>
                <img src={`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesSoftware/winmaker${imagenSoftwareSeleccionada}.webp`} alt="Imagen winmaker grande" loading='lazy'/>
            </div>

            {!isMobile &&
                <button className="siguienteProductoGrande" onClick={siguiente}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="white" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                        <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                    </svg>
                </button>
            }
        </div>
    );
}
