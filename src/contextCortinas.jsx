import { createContext, useContext, useState } from 'react';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';
import Cookies from 'js-cookie';

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
    const [ladoMecanismo, setLadoMecanismo] = useState('');
    const [tipoAccionador, setTipoAccionador] = useState('');

    const [formato, setFormato] = useState('');
    const [mecanismo, setMecanismo] = useState('');

    const [tipoMotor, setTipoMotor] = useState('');

    const [cajon, setCajon] = useState('');
    const [tipoCajon, setTipoCajon] = useState('');
    const [tipoMecanismo, setTipoMecanismo] = useState('');
    const [tipoTablilla, setTipoTablilla] = useState('');
    const [especificacionBarrio, setEspecificacionBarrio] = useState('');
    const [anchoCajon, setAnchoCajon] = useState('');
    const [altoCajon, setAltoCajon] = useState('');
    const [profundidadCajon, setProfundidadCajon] = useState('');
    const [medidaIndicadaCajon, setMedidaIndicadaCajon] = useState('');
    const [ubicacionCajon, setUbicacionCajon] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [formularioEnviado, setFormularioEnviado] = useState(false);

    const enviarCortina = (textoCortina) => {
        
        const textoUsuario =
            "Nombre y apellido: " + state.userInfo.nombre + " " + state.userInfo.apellido + "\n" +
            "Telefono: " + state.userInfo.telefono + "\n" +
            "Email: " + state.userInfo.email
        ;

        let tokenParaEnviar = Cookies.get('jwtToken');

        if (tokenParaEnviar == undefined) {
            tokenParaEnviar = null;
        }

        fetch(`${backend}/api/recibirCortina`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : tokenParaEnviar,
            },
            body: JSON.stringify({textoUsuario, textoCortina}),
        })
            .then(response => {
                if (response.ok) {
                    setFormularioEnviado(true);
                    return null;
                } else {
                    return response.text();
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

    const limpiarLadoMecanismo = () =>{
        setLadoMecanismo('');
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
        setLadoMecanismo('');
        setCaida('');
        setColorAccesorios('');
        setAclaraciones('');
    }

    const limpiarMecanismo = () =>{
        setMecanismo('');
        setLadoMecanismo('');
        limpiarTipoAccionador();
    }

    const limpiarTipoCajon = () =>{
        setAnchoCajon('');
        setAltoCajon('');
        setProfundidadCajon('');
        setMedidaIndicadaCajon('');
        setUbicacionCajon('');
    }

    const limpiarCajon = () =>{
        setTipoCajon('');
        setAnchoCajon('');
        setAltoCajon('');
        setProfundidadCajon('');
        setMedidaIndicadaCajon('');
        setUbicacionCajon('');
    }

    const limpiarMecanismoPersianaAluminio = () =>{
        setCajon('');
        limpiarCajon();
        setMecanismo('');
        setTipoAccionador('');
        setLadoMecanismo('');
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

    const limpiarPersianaAluminio = () =>{
        setTipoTablilla('');
        setAncho('');
        setAlto('');
        setMedidaIndicada('');
        setProfundidadGuia('');
        setFormato('');
        limpiarMecanismo();
        limpiarCajon();
        setMecanismo('');
        setTipoAccionador('');
        setAclaraciones('');
    }

    const limpiarTodo = () =>{
        limpiarRoller();
        limpiarPersianaPvc();
        limpiarPortonAluminio();
        limpiarPersianaAluminio();
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
            cajon,
            setCajon,
            tipoCajon,
            setTipoCajon,
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
            ladoMecanismo, 
            setLadoMecanismo,
            profundidadGuia,
            setProfundidadGuia,
            tipoAccionador,
            setTipoAccionador,
            anchoCajon,
            setAnchoCajon,
            altoCajon,
            setAltoCajon,
            profundidadCajon,
            setProfundidadCajon,
            medidaIndicadaCajon,
            setMedidaIndicadaCajon,
            deleteErrorMessage,
            formularioEnviado,
            ubicacionCajon,
            setUbicacionCajon,

            limpiarColor,

            limpiarLadoMecanismo,
            limpiarTipoAccionador,
            limpiarLineaScreen,
            limpiarRoller,

            limpiarMecanismo,
            limpiarPersianaPvc,

            limpiarTipoMotor,
            limpiarPortonAluminio,

            limpiarMecanismoPersianaAluminio,
            limpiarPersianaAluminio,
            limpiarTipoCajon,
            limpiarCajon,
            
            limpiarTodo
        }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };