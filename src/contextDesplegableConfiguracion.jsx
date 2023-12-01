import { createContext, useContext, useState, useEffect } from 'react';

const DesplegableConfiguracionContext = createContext();

function useDesplegableConfiguracion() {
    return useContext(DesplegableConfiguracionContext);
}

function DesplegableProviderConfiguracion({ children }) {
    const [hovered, setHovered] = useState(false);
    const [anchoConfiguracion, setAnchoConfiguracion] = useState(0);

    useEffect(() => {
        const nuevoAncho = `${anchoConfiguracion}px`;
        document.documentElement.style.setProperty('--widthConfiguracion', nuevoAncho);
    }, [anchoConfiguracion]);

    const abrirHover = () => {
        setHovered(true);
        console.log("anchoConfiguracion:" + anchoConfiguracion);
    }

    const cerrarHover = () => {
        setHovered(false);
    }

    return (
        <DesplegableConfiguracionContext.Provider value={{ hovered, abrirHover, cerrarHover, anchoConfiguracion, setAnchoConfiguracion }}>
            {children}
        </DesplegableConfiguracionContext.Provider>
    );
}

export { DesplegableConfiguracionContext, useDesplegableConfiguracion, DesplegableProviderConfiguracion };