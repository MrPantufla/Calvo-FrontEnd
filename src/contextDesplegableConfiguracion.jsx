import { createContext, useContext, useState, useEffect } from 'react';

const DesplegableConfiguracionContext = createContext();

function useDesplegableConfiguracion() {
    return useContext(DesplegableConfiguracionContext);
}

function DesplegableProviderConfiguracion({ children }) {
    const [hovered, setHovered] = useState(false);
    const [anchoPerfil, setAnchoPerfil] = useState(0);
    const [anchoConfiguracion, setAnchoConfiguracion] = useState(0);

    useEffect(() => {
        const nuevoAncho = `${anchoConfiguracion}px`;
        const nuevoRight = `${anchoPerfil}px`;
        document.documentElement.style.setProperty('--widthConfiguracion', nuevoAncho);
        document.documentElement.style.setProperty('--rightAnchoPerfil', nuevoRight);
    }, [anchoPerfil]);

    const abrirHover = () => {
        setHovered(true);
    }

    const cerrarHover = () => {
        setHovered(false);
    }

    return (
        <DesplegableConfiguracionContext.Provider value={{ hovered, abrirHover, cerrarHover, anchoPerfil, setAnchoPerfil, anchoConfiguracion, setAnchoConfiguracion }}>
            {children}
        </DesplegableConfiguracionContext.Provider>
    );
}

export { DesplegableConfiguracionContext, useDesplegableConfiguracion, DesplegableProviderConfiguracion };