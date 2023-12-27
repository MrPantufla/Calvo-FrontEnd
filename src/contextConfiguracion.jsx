import { createContext, useContext, useState, useEffect } from 'react';

const ConfiguracionContext = createContext();

function useConfiguracion() {
    return useContext(ConfiguracionContext);
}

function ConfiguracionProvider({ children }) {

    const [datosAbierto, setDatosAbierto] = useState(false);
    const [direccionAbierto, setDireccionAbierto] = useState(false);
    const [contraseñaAbierto, setContraseñaAbierto] = useState(false);
    const [emailAbierto, setEmailAbierto] = useState(false);

    const abrirEmail = () =>{
        setEmailAbierto(true);
        cerrarDireccion();
        cerrarContraseña();
        cerrarDatos();
    }

    const abrirDatos = () =>{
        setDatosAbierto(true);
        cerrarDireccion();
        cerrarContraseña();
        cerrarEmail();
    }

    const abrirDireccion = () =>{
        setDireccionAbierto(true);
        cerrarDatos();
        cerrarContraseña();
        cerrarEmail();
    }

    const abrirContraseña = () =>{
        setContraseñaAbierto(true);
        cerrarDatos();
        cerrarDireccion();
        cerrarEmail();
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

    const cerrarEmail= () =>{
        setEmailAbierto(false);
    }

    return (
        <ConfiguracionContext.Provider value={{abrirEmail, cerrarEmail, emailAbierto, setEmailAbierto, datosAbierto, direccionAbierto, contraseñaAbierto, abrirDatos, abrirDireccion, abrirContraseña, cerrarDatos, cerrarDireccion, cerrarContraseña}}>
            {children}
        </ConfiguracionContext.Provider>
    );
}

export { ConfiguracionContext, useConfiguracion, ConfiguracionProvider };