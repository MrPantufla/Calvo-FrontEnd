import { createContext, useContext, useState, useEffect } from 'react';

const CortinasContext = createContext();

function useCortinas() {
    return useContext(CortinasContext);
}

function ProviderCortinas({ children }) {

    const [tipo, setTipo] = useState('');
    const [alto, setAlto] = useState();
    const [ancho, setAncho] = useState();
    const [conMecanismo, setConMecanismo] = useState('');
    const [alturaIndicada, setAlturaIndicada] = useState('');

    const [color, setColor] = useState('');
    const [caida, setCaida] = useState('');
    const [tirador, setTirador] = useState('');

    const [tipoEnrollador, setTipoEnrollador] = useState('');

    const [conCajon, setConCajon] = useState('');
    const [ubicacionExteriorCajon, setUbicacionExteriorCajon] = useState('');
    const [ubicacionCajon, setUbicacionCajon] = useState('');
    const [tipoMecanismo, setTipoMecanismo] = useState('');
    const [control, setControl] = useState('');
    const [tecla, setTecla] = useState('');
    const [tipoTablilla, setTipoTablilla] = useState('');
    const [especificacionBarrio, setEspecificacionBarrio] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const descelectCaidaRoller = () => {
        setTirador(undefined);
        setCaida(undefined);
    }

    const descelectEnrolladorPersianaPvc = () => {
        setTipoEnrollador(undefined);
    }

    const descelectControlYTeclaPortonAluminio = () => {
        setControl(undefined);
        setTecla(undefined);
    }

    const descelectMecanismoYCajonPersianaAluminio = () => {
        setConCajon(undefined);
        setTipoMecanismo(undefined);
        descelectUbicacionCajonPersianaAluminio();
        descelectControlPersianaAluminio();
    }

    const descelectControlPersianaAluminio = () => {
        setControl(undefined);
        setTecla(undefined);
    }

    const descelectUbicacionCajonPersianaAluminio = () => {
        setUbicacionCajon(undefined);
        descelectUbicacionExteriorCajonPersianaAluminio();
    }

    const descelectUbicacionExteriorCajonPersianaAluminio = () => {
        setUbicacionExteriorCajon(undefined);
    }

    const descelectEspecificacionBarrio = () => {
        setEspecificacionBarrio(undefined);
    }

    const deleteErrorMessage = () =>{
        setErrorMessage('');
    }

    const limpiarFormularios = () => {
        setAlto(undefined);
        setAncho(undefined);
        setConMecanismo(undefined);
        setAlturaIndicada(undefined);
        setColor(undefined);
        setCaida(undefined);
        setTirador(undefined);
        setTipoEnrollador(undefined);
        setConCajon(undefined);
        setUbicacionExteriorCajon(undefined);
        setUbicacionCajon(undefined);
        setTipoMecanismo(undefined);
        setControl(undefined);
        setTecla(undefined);
        setTipoTablilla(undefined);
        setEspecificacionBarrio(undefined);
    }

    const enviarCortina = (textoCortina) => {
        fetch('http://localhost:8080/api/recibirCortina', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: textoCortina,
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de formulario exitoso');
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
                }
            });
    }

    return (
        <CortinasContext.Provider value={{
            tipo,
            setTipo,
            alto,
            setAlto,
            ancho,
            setAncho,
            conMecanismo,
            setConMecanismo,
            alturaIndicada,
            setAlturaIndicada,
            color,
            setColor,
            caida,
            setCaida,
            tirador,
            setTirador,
            tipoEnrollador,
            setTipoEnrollador,
            conCajon,
            setConCajon,
            ubicacionExteriorCajon,
            setUbicacionExteriorCajon,
            ubicacionCajon,
            setUbicacionCajon,
            tipoMecanismo,
            setTipoMecanismo,
            control,
            setControl,
            tecla,
            setTecla,
            tipoTablilla,
            setTipoTablilla,
            especificacionBarrio,
            setEspecificacionBarrio,
            descelectCaidaRoller,
            descelectEnrolladorPersianaPvc,
            descelectControlYTeclaPortonAluminio,
            descelectMecanismoYCajonPersianaAluminio,
            descelectControlPersianaAluminio,
            descelectUbicacionCajonPersianaAluminio,
            descelectUbicacionExteriorCajonPersianaAluminio,
            descelectEspecificacionBarrio,
            limpiarFormularios,
            errorMessage,
            setErrorMessage,
            deleteErrorMessage,
            enviarCortina
        }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };