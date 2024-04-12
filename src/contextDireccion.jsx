import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';
import { useConfiguracion } from './contextConfiguracion';

const DireccionContext = createContext();

function useDireccion() {
    return useContext(DireccionContext);
}

function DireccionProvider({ children }) {
    const { backend } = useVariables();

    const { direccionAbierto } = useConfiguracion();

    const {
        state,
        setErrorMessage
    } = useAuth();

    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [cp, setCp] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [primeraAccion, setPrimeraAccion] = useState(true);
    const [direccionConfirmada, setDireccionConfirmada] = useState(false);

    const obtenerDireccionUsuario = () => {
        if (state.logueado) {
            fetch(`${backend}/api/direcciones/${state.userInfo.email}`, {
                method: 'GET',
                credentials: 'include',
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
                        setCalle(data.calle);
                        setNumero(data.numero);
                        setCp(data.cp);
                        setLocalidad(data.localidad);
                        setProvincia(data.provincia);
                        // Aquí puedes actualizar tu interfaz de usuario con los datos obtenidos, por ejemplo, mostrar la dirección en un componente
                    } else {
                        setCalle('');
                        setNumero('');
                        setCp('');
                        setLocalidad('');
                        setProvincia('');
                        // La respuesta es un texto, probablemente un mensaje de error
                        setErrorMessage(data);
                    }
                })
                .catch(error => {
                    setErrorMessage('Ocurrió un error al realizar la solicitud:', error.message);
                });
        }
    }

    useEffect(() => {
        if (!primeraAccion) {
            obtenerDireccionUsuario();
        }
        else {
            setPrimeraAccion(false);
        }
    }, [state.logueado, direccionAbierto]);

    return (
        <DireccionContext.Provider value={{
            direccionConfirmada,
            setDireccionConfirmada,
            setCalle,
            setNumero,
            setCp,
            setLocalidad,
            setProvincia,
            calle,
            numero,
            cp,
            localidad,
            provincia,
        }}>
            {children}
        </DireccionContext.Provider>
    );
}

export { DireccionContext, useDireccion, DireccionProvider };