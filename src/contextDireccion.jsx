import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './contextLogin';

const DireccionContext = createContext();

function useDireccion() {
    return useContext(DireccionContext);
}

function DireccionProvider({ children }) {
    const [calle, setCalle] = useState(['']);
    const [numero, setNumero] = useState(['']);
    const [cp, setCp] = useState(['']);
    const [localidad, setLocalidad] = useState(['']);
    const [provincia, setProvincia] = useState(['']);
    const auth = useAuth();
    const [primeraAccion, setPrimeraAccion] = useState(true);

    const obtenerDireccionUsuario = () => {
        fetch(`http://localhost:8080/api/direcciones/${auth.state.userInfo.email}`, {
            method: 'GET',
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (typeof data === 'object') {
                    // La respuesta es un objeto, probablemente la dirección del usuario
                    console.log('Dirección del usuario:', data);
                    setCalle(data.calle);
                    setNumero(data.numero);
                    setCp(data.cp);
                    setLocalidad(data.localidad);
                    setProvincia(data.provincia);
                    // Aquí puedes actualizar tu interfaz de usuario con los datos obtenidos, por ejemplo, mostrar la dirección en un componente
                } else {
                    // La respuesta es un texto, probablemente un mensaje de error
                    console.error('Respuesta (texto): ', data);
                    auth.setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al realizar la solicitud:', error.message);
                // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            });
    }

    useEffect(() => {
        if (!primeraAccion) {
            obtenerDireccionUsuario();
        }
        else {
            setPrimeraAccion(false);
        }
    }, [auth.state.logueado]);

    return (
        <DireccionContext.Provider value={{ setCalle, setNumero, setCp, setLocalidad, setProvincia, calle, numero, cp, localidad, provincia }}>
            {children}
        </DireccionContext.Provider>
    );
}

export { DireccionContext, useDireccion, DireccionProvider };