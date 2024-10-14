import { createContext, useContext } from 'react';
import { useState } from 'react';

const VariablesContext = createContext();

function useVariables() {
    return useContext(VariablesContext);
}

function VariablesProvider({ children }) {
    //const backend = "http://localhost:8080";
    const backend = "https://backend-calvo-415917.rj.r.appspot.com";

    const [mostrarCartelCliente, setMostrarCartelCliente] = useState(false);
    const [mostrarCartelPresupuesto, setMostrarCartelPresupuesto] = useState(false);
    const [mostrarConfirmarCompra, setMostrarConfirmarCompra] = useState(false);
    const [mostrarEnvios, setMostrarEnvios] = useState(false);
    const [mostrarPagos, setMostrarPagos] = useState(false);
    const [mostrarFacturacion, setMostrarFacturacion] = useState(false);
    const [agregarCardAbierto, setAgregarCardAbierto] = useState(false);

    const obtenerFechaFormateada = () => {
        const fecha = new Date();

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();

        return `${dia}/${mes}/${anio}`;
    };

    const obtenerHoraFormateada = () => {
        const fecha = new Date();
    
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const segundos = String(fecha.getSeconds()).padStart(2, '0');
    
        return `${horas}.${minutos}.${segundos}`;
    };

    return (
        <VariablesContext.Provider value={{
            backend,
            mostrarCartelCliente,
            setMostrarCartelCliente,
            mostrarCartelPresupuesto,
            setMostrarCartelPresupuesto,
            obtenerFechaFormateada,
            obtenerHoraFormateada,
            mostrarConfirmarCompra,
            setMostrarConfirmarCompra,
            mostrarEnvios,
            setMostrarEnvios,
            mostrarPagos,
            setMostrarPagos,
            mostrarFacturacion,
            setMostrarFacturacion,
            agregarCardAbierto, 
            setAgregarCardAbierto
            }}>
            {children}
        </VariablesContext.Provider>
    );
}

export { VariablesContext, useVariables, VariablesProvider };