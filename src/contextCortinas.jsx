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
        }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };