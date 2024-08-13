import { createContext, useContext } from 'react';
import { useState } from 'react';

const VariablesContext = createContext();

function useVariables() {
    return useContext(VariablesContext);
}

function VariablesProvider({ children }) {
    const backend = "http://localhost:8080";
    //const backend = "https://backend-calvo-415917.rj.r.appspot.com";

    const [mostrarCartelCliente, setMostrarCartelCliente] = useState(false);
    const [mostrarFacturacion, setMostrarFacturacion] = useState(false);

    return (
        <VariablesContext.Provider value={{
            backend,
            mostrarCartelCliente,
            setMostrarCartelCliente,
            mostrarFacturacion,
            setMostrarFacturacion
        }}>
            {children}
        </VariablesContext.Provider>
    );
}

export { VariablesContext, useVariables, VariablesProvider };