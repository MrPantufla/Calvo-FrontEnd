import { createContext, useContext } from 'react';
import { useState } from 'react';

const FinalizaCompraContext = createContext();

function useFinalizarCompra() {
    return useContext(FinalizaCompraContext);
}

function FinalizarCompraProvider({ children }) {

    const [medioEnvio, setMedioEnvio] = useState('');
    const [tipoEnvio, setTipoEnvio] = useState('');
    const [codigoSucursal, setCodigoSucursal] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [numeroTarjeta1, setNumeroTarjeta1] = useState('');
    const [numeroTarjeta2, setNumeroTarjeta2] = useState('');
    const [numeroTarjeta3, setNumeroTarjeta3] = useState('');
    const [numeroTarjeta4, setNumeroTarjeta4] = useState('');
    const [mesCaducidad, setMesCaducidad] = useState('');
    const [anioCaducidad, setAnioCaducidad] = useState('');
    const [codigoSeguridad, setCodigoSeguridad] = useState('');
    const [metodoFacturacion, setMetodoFacturacion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //Facturacion
    const [nombreYApellido, setNombreYApellido] = useState('');
    const [cp, setCp] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dni, setDni] = useState('');
    const [cuit, setCuit] = useState('');
    const [keyDownEnter, setKeyDownEnter] = useState(null);

    const limpiarFinalizarCompra = () =>{
        setMedioEnvio('');
        setTipoEnvio('');
        setMetodoPago('');
        setNumeroTarjeta1('');
        setNumeroTarjeta2('');
        setNumeroTarjeta3('');
        setNumeroTarjeta4('');
        setMesCaducidad('');
        setAnioCaducidad('');
        setCodigoSeguridad('');
        setMetodoFacturacion('');
        setErrorMessage('');
    }

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
            setErrorMessage,
            tipoEnvio,
            setTipoEnvio, 
            nombreYApellido, 
            setNombreYApellido,
            cp, 
            setCp,
            localidad, 
            setLocalidad,
            direccion, 
            setDireccion,
            dni, 
            setDni,
            cuit, 
            setCuit,
            keyDownEnter, 
            setKeyDownEnter
        }}>
            {children}
        </FinalizaCompraContext.Provider>
    );
}

export { FinalizaCompraContext, useFinalizarCompra, FinalizarCompraProvider };