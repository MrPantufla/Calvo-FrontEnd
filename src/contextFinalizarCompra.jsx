import { createContext, useContext } from 'react';
import { useState } from 'react';

const FinalizaCompraContext = createContext();

function useFinalizarCompra() {
    return useContext(FinalizaCompraContext);
}

function FinalizarCompraProvider({ children }) {

    const [medioEnvio, setMedioEnvio] = useState(null);
    const [codigoSucursal, setCodigoSucursal] = useState(null);
    const [metodoPago, setMetodoPago] = useState(null);
    const [numeroTarjeta1, setNumeroTarjeta1] = useState('');
    const [numeroTarjeta2, setNumeroTarjeta2] = useState('');
    const [numeroTarjeta3, setNumeroTarjeta3] = useState('');
    const [numeroTarjeta4, setNumeroTarjeta4] = useState('');
    const [mesCaducidad, setMesCaducidad] = useState('');
    const [anioCaducidad, setAnioCaducidad] = useState('');
    const [codigoSeguridad, setCodigoSeguridad] = useState('');
    const [metodoFacturacion, setMetodoFacturacion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <FinalizaCompraContext.Provider value={{
            medioEnvio,
            setMedioEnvio,
            codigoSucursal,
            setCodigoSucursal,
            metodoPago,
            setMetodoPago,
            numeroTarjeta1, 
            setNumeroTarjeta1,
            numeroTarjeta2, 
            setNumeroTarjeta2,
            numeroTarjeta3, 
            setNumeroTarjeta3,
            numeroTarjeta4, 
            setNumeroTarjeta4,
            mesCaducidad,
            setMesCaducidad,
            anioCaducidad, 
            setAnioCaducidad,
            codigoSeguridad,
            setCodigoSeguridad,
            metodoFacturacion,
            setMetodoFacturacion,
            errorMessage,
            setErrorMessage
        }}>
            {children}
        </FinalizaCompraContext.Provider>
    );
}

export { FinalizaCompraContext, useFinalizarCompra, FinalizarCompraProvider };