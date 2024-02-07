import { createContext, useContext, useState, useEffect } from 'react';

const CortinasContext = createContext();

function useCortinas() {
    return useContext(CortinasContext);
}

function ProviderCortinas({ children }) {

    const [tipo, setTipo] = useState();
    const [alto, setAlto] = useState();
    const [ancho, setAncho] = useState();
    const [conMecanismo, setConMecanismo] = useState();
    const [alturaIndicada, setAlturaIndicada] = useState();

    const [color, setColor] = useState();
    const [caida, setCaida] = useState();
    const [tirador, setTirador] = useState();

    const [tipoEnrollador, setTipoEnrollador] = useState();

    const [conCajon, setConCajon] = useState();
    const [tipoCajon, setTipoCajon] = useState();
    const [ubicacionCajon, setUbicacionCajon] = useState();
    const [tipoMecanismo, setTipoMecanismo] = useState();
    const [control, setControl] = useState();
    const [tecla, setTecla] = useState();
    const [tipoTablilla, setTipoTablilla] = useState();
    const [especificacionTubular, setEspecificacionTubular] = useState();

    const limpiarRoller = () => {
        setColor(undefined);
        setConMecanismo(undefined);
        setAlto(undefined);
        setAncho(undefined);
        setAlturaIndicada(undefined);
        descelectCaidaRoller();
    }

    const descelectCaidaRoller = () => {
        setTirador(undefined);
        setCaida(undefined);
    }

    const limpiarPersianPvc = () =>{
        setConMecanismo(undefined);
        setAlto(undefined);
        setAncho(undefined);
        setAlturaIndicada(undefined);
        descelectEnrolladorPersianaPvc();
    }

    const descelectEnrolladorPersianaPvc = () =>{
        setTipoEnrollador(undefined);
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
            tipoCajon,
            setTipoCajon,
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
            especificacionTubular,
            setEspecificacionTubular,
            descelectCaidaRoller,
            limpiarRoller
        }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };