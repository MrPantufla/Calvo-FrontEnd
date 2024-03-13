import './confirmarCompra.css';
import { useDireccion } from '../../contextDireccion';
import CorroborarDatos from './Corroborar datos/corroborarDatos';
import { useCarrito } from '../../contextCarrito';
import { useState } from 'react';
import ErrorDirecion from './Error direccion/errorDireccion';

export default function ConfirmarCompra() {
    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);
    
    const {
        calle,
        numero,
        cp,
        localidad,
        provincia
    } = useDireccion();

    const carrito = useCarrito();

    const handleParteUtilizableClick = (event) => {
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    const cerrarConfirmarCompra = () =>{
        if(aptoParaCerrar == true){
            carrito.setConfirmarCompraAbierto(false)
        }
    }

    return (
        <div className="contenedorPrincipalConfirmarCompra" onClick={cerrarConfirmarCompra} onMouseDown={() => setAptoParaCerrar(true)}>
            <div className="parteUtilizableConfirmarCompra" onMouseDown={handleParteUtilizableClick} onMouseUp={handleParteUtilizableClick}>
                    {calle=='' || numero=='' || cp=='' || localidad=='' || provincia=='' ? 
                        (<ErrorDirecion/>) 
                        : 
                        (<CorroborarDatos />)
                    }
            </div>
        </div>
    );
}