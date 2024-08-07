import { createContext, useContext, useState } from 'react';

const DesplegablePerfilContext = createContext();

function useDesplegablePerfil() {
    return useContext(DesplegablePerfilContext);
}

function DesplegableProviderPerfil({ children }) {
    const [perfilHovered, setPerfilHovered] = useState(false);

    const abrirPerfil = () => {
        setPerfilHovered(true);
    }

    const cerrarPerfil = () => {
        setPerfilHovered(false);
    }

    const togglePerfil = () =>{
        setPerfilHovered(!perfilHovered);
    }

    return (
        <DesplegablePerfilContext.Provider value={{
            perfilHovered,
            setPerfilHovered,
            abrirPerfil,
            cerrarPerfil,
            togglePerfil
        }}>
            {children}
        </DesplegablePerfilContext.Provider>
    );
}

export { DesplegablePerfilContext, useDesplegablePerfil, DesplegableProviderPerfil };