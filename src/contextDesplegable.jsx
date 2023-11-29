import { createContext, useContext, useState, useEffect } from 'react';

const DesplegableContext = createContext();

function useDesplegable() {
    return useContext(DesplegableContext);
}

function DesplegableProvider({ children }) {
    const [hovered, setHovered] = useState(false);
    const [anchoPerfil, setAnchoPerfil] = useState(0);

    useEffect(() => {
        console.log("cambia")
        const nuevoRight = `calc(0% + ${anchoPerfil}px - 20px)`;//Modificar para distancia del desplegable
        document.documentElement.style.setProperty('--rightAnchoPerfil', nuevoRight);
    }, [anchoPerfil]);

    const abrirHover = () => {
        setHovered(true);
    }

    const cerrarHover = () => {
        setHovered(false);
    }

    return (
        <DesplegableContext.Provider value={{ hovered, abrirHover, cerrarHover, anchoPerfil, setAnchoPerfil }}>
            {children}
        </DesplegableContext.Provider>
    );
}

export { DesplegableContext, useDesplegable, DesplegableProvider };