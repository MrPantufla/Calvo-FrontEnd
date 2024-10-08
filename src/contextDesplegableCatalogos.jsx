import { createContext, useContext, useState, useEffect } from 'react';

const DesplegableCatalogosContext = createContext();

function useDesplegableCatalogos() {
    return useContext(DesplegableCatalogosContext);
}

function DesplegableProviderCatalogos({ children }) {
    const [hovered, setHovered] = useState(false);
    const [anchoPerfil, setAnchoPerfil] = useState(0);
    const [anchoCatalogos, setAnchoCatalogos] = useState(0);

    useEffect(() => {
        const nuevoAncho = `${anchoCatalogos}px`;
        const nuevoRight = `${anchoPerfil}px`;
        document.documentElement.style.setProperty('--widthCatalogos', nuevoAncho);
        document.documentElement.style.setProperty('--rightAnchoPerfil', nuevoRight);
    }, [anchoPerfil, anchoCatalogos]);

    const abrirHover = () => {
        setHovered(true);
    }

    const cerrarHover = () => {
        setHovered(false);
    }

    const toggleHover = () => {
        setHovered(!hovered)
    }

    return (
        <DesplegableCatalogosContext.Provider value={{
            hovered,
            abrirHover,
            cerrarHover,
            anchoPerfil,
            setAnchoPerfil,
            anchoCatalogos,
            setAnchoCatalogos,
            toggleHover
        }}>
            {children}
        </DesplegableCatalogosContext.Provider>
    );
}

export { DesplegableCatalogosContext, useDesplegableCatalogos, DesplegableProviderCatalogos };