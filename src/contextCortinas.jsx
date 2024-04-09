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
    const [medidaIndicada, setMedidaIndicada] = useState('');
    const [profundidadGuia, setProfundidadGuia] = useState('');
    const [aclaraciones, setAclaraciones] = useState('');

    const [linea, setLinea] = useState('');
    const [lineaScreen, setLineaScreen] = useState('');
    const [color, setColor] = useState('');
    const [colorAccesorios, setColorAccesorios] = useState('');
    const [mecanismoRoller, setMecanismoRoller] = useState('');
    const [caida, setCaida] = useState('');
    const [ladoTirador, setLadoTirador] = useState('');
    const [tipoAccionador, setTipoAccionador] = useState('');

    const [formato, setFormato] = useState('');
    const [mecanismo, setMecanismo] = useState('');

    const [tipoMotor, setTipoMotor] = useState('');

    const [conCajon, setConCajon] = useState('');
    const [ubicacionExteriorCajon, setUbicacionExteriorCajon] = useState('');
    const [ubicacionCajon, setUbicacionCajon] = useState('');
    const [tipoMecanismo, setTipoMecanismo] = useState('');
    const [tipoTablilla, setTipoTablilla] = useState('');
    const [especificacionBarrio, setEspecificacionBarrio] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [formularioEnviado, setFormularioEnviado] = useState(false);

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
                    setFormularioEnviado(true);
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

    const deleteErrorMessage = () =>{
        setErrorMessage('');
    }

    const limpiarLadoTirador = () =>{
        setLadoTirador('');
    }

    const limpiarTipoAccionador = () =>{
        setTipoAccionador('');
    }

    const limpiarColor = () =>{
        setColor('');
    }

    const limpiarLineaScreen = () =>{
        setLineaScreen('');
    }

    const limpiarRoller = () =>{
        setLinea('');
        setLineaScreen('');
        setAncho('');
        setAlto('');
        setMecanismoRoller('');
        setTipoAccionador('');
        setLadoTirador('');
        setCaida('');
        setColorAccesorios('');
        setAclaraciones('');
    }

    const limpiarMecanismo = () =>{
        setMecanismo('');
        limpiarTipoAccionador();
    }

    const limpiarPersianaPvc = () =>{
        setAncho('');
        setAlto('');
        setMedidaIndicada('');
        setProfundidadGuia('');
        setFormato('');
        setMecanismo('');
        setTipoAccionador('');
        setAclaraciones('');
    }

    const limpiarTipoMotor = () =>{
        setTipoMotor('');
        limpiarTipoAccionador();
    }

    const limpiarPortonAluminio = () =>{
        setTipoTablilla('');
        setAncho('');
        setAlto('');
        setMedidaIndicada('');
        setProfundidadGuia('');
        setFormato('');
        setTipoMotor('');
        setTipoAccionador('');
    }

    return (
        <CortinasContext.Provider value={{
            tipo,
            setTipo,
            alto,
            setAlto,
            ancho,
            setAncho,
            medidaIndicada,
            setMedidaIndicada,
            color,
            setColor,
            caida,
            setCaida,
            formato,
            setFormato,
            mecanismo,
            setMecanismo,
            tipoAccionador,
            setTipoAccionador,
            tipoMotor,
            setTipoMotor,
            conCajon,
            setConCajon,
            ubicacionExteriorCajon,
            setUbicacionExteriorCajon,
            ubicacionCajon,
            setUbicacionCajon,
            tipoMecanismo,
            setTipoMecanismo,
            tipoTablilla,
            setTipoTablilla,
            especificacionBarrio,
            setEspecificacionBarrio,
            errorMessage,
            setErrorMessage,
            enviarCortina,
            aclaraciones,
            setAclaraciones,
            muestrasAbierto,
            setMuestrasAbierto,
            linea,
            setLinea,
            lineaScreen, 
            setLineaScreen,
            mecanismoRoller, 
            setMecanismoRoller,
            colorAccesorios, 
            setColorAccesorios,
            ladoTirador, 
            setLadoTirador,
            profundidadGuia,
            setProfundidadGuia,
            tipoAccionador,
            setTipoAccionador,
            deleteErrorMessage,
            formularioEnviado,

            limpiarColor,

            limpiarLadoTirador,
            limpiarTipoAccionador,
            limpiarLineaScreen,
            limpiarRoller,

            limpiarMecanismo,
            limpiarPersianaPvc,

            limpiarTipoMotor,
            limpiarPortonAluminio
        }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };