import { createContext, useContext, useState, useEffect } from 'react';

const CortinasContext = createContext();

function useCortinas() {
    return useContext(CortinasContext);
}

function ProviderCortinas({ children }) {

    const [tipo, setTipo] = useState('');
    const [alto, setAlto] = useState('');
    const [ancho, setAncho] = useState('');
    const [conMecanismo, setConMecanismo] = useState();
    const [alturaIndicada, setAlturaIndicada] = useState('');

    const [color, setColor] = useState('');
    const [caida, setCaida] = useState('');
    const [tirador, setTirador] = useState('');

    const [tipoEnrollador, setTipoEnrollador] = useState('');

    const [conCajon, setConCajon] = useState();
    const [tipoCajon, setTipoCajon] = useState('');
    const [ubicacionCajon, setUbicacionCajon] = useState('');
    const [tipoMecanismo, setTipoMecanismo] = useState('');
    const [control, setControl] = useState();
    const [tecla, setTecla] = useState();
    const [tipoTablilla, setTipoTablilla] = useState('');
    const [especificacionTubular, setEspecificacionTubular] = useState('');

    return (
        <CortinasContext.Provider value={{ tipo, setTipo, alto, setAlto, ancho, setAncho, conMecanismo, setConMecanismo, alturaIndicada, setAlturaIndicada //SEGUIR EXPORTANDO  }}>
            {children}
        </CortinasContext.Provider>
    );
}

export { CortinasContext, useCortinas, ProviderCortinas };