import './cartelCliente.css';
import { useAuth } from '../../contextLogin';
import { useState } from 'react';
import { useVariables } from '../../contextVariables';

export default function CartelCliente() {
    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

    const { setMostrarCartelCliente } = useVariables();

    const handleCloseCartel = () => {
        if(aptoParaCerrar == true){
            setMostrarCartelCliente(false)
        }
    }

    const noCerrar = (event) =>{
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    return (
        <div className="contenedorPrincipalCartelCliente" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleCloseCartel}>
            <div className="parteUtilizableCartelCliente" onMouseDown={noCerrar} onMouseUp={noCerrar}>
                <h1>¡IMPORTANTE!</h1>
                <p>Momentáneamente solo nuestros clientes pueden realizar compras desde la aplicación. Si ya sos cliente de la empresa y estás viendo este texto, <a href="#contacto">comunicate con nosotros</a> para activar correctamente tu cuenta de cliente</p>
                <button className="botonAceptar" onClick={()=> setMostrarCartelCliente(false)}>Aceptar</button>
            </div>
        </div>
    );
}