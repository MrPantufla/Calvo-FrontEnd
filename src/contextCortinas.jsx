import { createContext, useContext, useState } from 'react';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';

const CortinasContext = createContext();

function useCortinas() {
    return useContext(CortinasContext);
}

function ProviderCortinas({ children }) {
    const {backend} = useVariables();

    const {state} = useAuth();
    
    const [muestrasAbierto, setMuestrasAbierto] = useState(false);

    const [tipo, setTipo] = useState('roller');
    const [alto, setAlto] = useState('');
    const [ancho, setAncho] = useState('');
    const [conMecanismo, setConMecanismo] = useState('');
    const [alturaIndicada, setAlturaIndicada] = useState('');
    const [aclaraciones, setAclaraciones] = useState('');

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
        setTirador('');
        setCaida('');
    }

    const descelectEnrolladorPersianaPvc = () => {
        setTipoEnrollador('');
    }

    const descelectControlYTeclaPortonAluminio = () => {
        setControl('');
        setTecla('');
    }

    const descelectMecanismoYCajonPersianaAluminio = () => {
        setConCajon('');
        setTipoMecanismo('');
        descelectUbicacionCajonPersianaAluminio();
        descelectControlPersianaAluminio();
    }

    const descelectControlPersianaAluminio = () => {
        setControl('');
        setTecla('');
    }

    const descelectUbicacionCajonPersianaAluminio = () => {
        setUbicacionCajon('');
        descelectUbicacionExteriorCajonPersianaAluminio();
    }

    const descelectUbicacionExteriorCajonPersianaAluminio = () => {
        setUbicacionExteriorCajon('');
    }

    const descelectEspecificacionBarrio = () => {
        setEspecificacionBarrio('');
    }

    const deleteErrorMessage = () =>{
        setErrorMessage('');
    }

    const limpiarFormularios = () => {
        deleteErrorMessage();
        setAlto('');
        setAncho('');
        setConMecanismo('');
        setAlturaIndicada('');
        setColor('');
        setCaida('');
        setTirador('');
        setTipoEnrollador('');
        setConCajon('');
        setUbicacionExteriorCajon('');
        setUbicacionCajon('');
        setTipoMecanismo('');
        setControl('');
        setTecla('');
        setTipoTablilla('');
        setEspecificacionBarrio('');
        setAclaraciones('');
    }

    const enviarCortina = (textoCortina) => {
        
        const textoUsuario =
            "Nombre y apellido: " + state.userInfo.nombre + " " + state.userInfo.apellido + "\n" +
            "Telefono: " + state.userInfo.telefono + "\n" +
            "Email: " + state.userInfo.email
        ;

        fetch(`${backend}/api/recibirCortina`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({textoUsuario, textoCortina}),
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
            enviarCortina,
            aclaraciones,
            setAclaraciones,
            muestrasAbierto,
            setMuestrasAbierto
        }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };