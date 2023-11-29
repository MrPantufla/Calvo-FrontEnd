import { createContext, useContext, useState, useEffect } from 'react';

const DesplegableContext = createContext();

function useDesplegable() {
    return useContext(DesplegableContext);
}

function DesplegableProvider({ children }) {
    const [hovered, setHovered] = useState(false);
    const [anchoPerfil, setAnchoPerfil] = useState(0);
    const [anchoCatalogos, setAnchoCatalogos] = useState(0);

    useEffect(() => {
        const nuevoAncho = `${anchoCatalogos}px`;
        const nuevoRight = `${anchoPerfil}px`;
        document.documentElement.style.setProperty('--widthCatalogos', nuevoAncho);
        document.documentElement.style.setProperty('--rightAnchoPerfil', nuevoRight);
    }, [anchoPerfil]);

    const abrirHover = () => {
        setHovered(true);
    }

    const cerrarHover = () => {
        setHovered(false);
    }

    return (
        <DesplegableContext.Provider value={{ hovered, abrirHover, cerrarHover, anchoPerfil, setAnchoPerfil, anchoCatalogos, setAnchoCatalogos }}>
            {children}
        </DesplegableContext.Provider>
    );
}

export { DesplegableContext, useDesplegable, DesplegableProvider };