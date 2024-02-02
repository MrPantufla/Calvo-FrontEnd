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
    const [errorMessage, setErrorMessage] = useState('');

    const abrirEmail = () =>{
        setEmailAbierto(true);
        cerrarDireccion();
        cerrarContraseña();
        cerrarDatos();
        setErrorMessage('');
    }

    const abrirDatos = () =>{
        setDatosAbierto(true);
        cerrarDireccion();
        cerrarContraseña();
        cerrarEmail();
        setErrorMessage('');
    }

    const abrirDireccion = () =>{
        setDireccionAbierto(true);
        cerrarDatos();
        cerrarContraseña();
        cerrarEmail();
        setErrorMessage('');
    }

    const abrirContraseña = () =>{
        setContraseñaAbierto(true);
        cerrarDatos();
        cerrarDireccion();
        cerrarEmail();
        setErrorMessage('');
    }

    const cerrarDatos = () =>{
        setDatosAbierto(false);
        setErrorMessage('');
    }

    const cerrarDireccion = () =>{
        setDireccionAbierto(false);
        setErrorMessage('');
    }

    const cerrarContraseña = () =>{
        setContraseñaAbierto(false);
        setErrorMessage('');
    }

    const cerrarEmail= () =>{
        setEmailAbierto(false);
        setErrorMessage('');
    }

    return (
        <ConfiguracionContext.Provider value={{errorMessage, setErrorMessage, abrirEmail, cerrarEmail, emailAbierto, setEmailAbierto, datosAbierto, direccionAbierto, contraseñaAbierto, abrirDatos, abrirDireccion, abrirContraseña, cerrarDatos, cerrarDireccion, cerrarContraseña}}>
            {children}
        </ConfiguracionContext.Provider>
    );
}

export { ConfiguracionContext, useConfiguracion, ConfiguracionProvider };