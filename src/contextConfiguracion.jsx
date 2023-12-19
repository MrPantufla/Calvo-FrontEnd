import { createContext, useContext, useState, useEffect } from 'react';

const ConfiguracionContext = createContext();

function useConfiguracion() {
    return useContext(ConfiguracionContext);
}

function ConfiguracionProvider({ children }) {

    const [datosAbierto, setDatosAbierto] = useState(false);
    const [direccionAbierto, setDireccionAbierto] = useState(false);
    const [contraseñaAbierto, setContraseñaAbierto] = useState(false);

    const abrirDatos = () =>{
        setDatosAbierto(true);
        cerrarDireccion();
        cerrarContraseña();
    }

    const abrirDireccion = () =>{
        setDireccionAbierto(true);
        cerrarDatos();
        cerrarContraseña();
    }

    const abrirContraseña = () =>{
        setContraseñaAbierto(true);
        cerrarDatos();
        cerrarDireccion();
    }

    const cerrarDatos = () =>{
        setDatosAbierto(false);
    }

    const cerrarDireccion = () =>{
        setDireccionAbierto(false);
    }

    const cerrarContraseña = () =>{
        setContraseñaAbierto(false);
    }

    return (
        <ConfiguracionContext.Provider value={{ datosAbierto, direccionAbierto, contraseñaAbierto, abrirDatos, abrirDireccion, abrirContraseña, cerrarDatos, cerrarDireccion, cerrarContraseña}}>
            {children}
        </ConfiguracionContext.Provider>
    );
}

export { ConfiguracionContext, useConfiguracion, ConfiguracionProvider };