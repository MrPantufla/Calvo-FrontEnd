import './confirmarCompra.css';
import { useDireccion } from '../../contextDireccion';
import CorroborarDireccion from './Corroborar direccion/corroborarDireccion';
import { useCarrito } from '../../contextCarrito';
import { useState } from 'react';
import ErrorDirecion from './Error direccion/errorDireccion';
import { Facturacion } from './Facturacion/facturacion';

export default function ConfirmarCompra() {
    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

    const {
        calle,
        numero,
        cp,
        localidad,
        provincia
    } = useDireccion();

    const {
        setConfirmarCompraAbierto,
        instanciaPedido,
        setInstanciaPedido
    } = useCarrito();

    const handleParteUtilizableClick = (event) => {
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    const cerrarConfirmarCompra = () => {
        if (aptoParaCerrar == true) {
            setConfirmarCompraAbierto(false);
            setInstanciaPedido('');
        }
    }

    return (
        <div className="contenedorPrincipalConfirmarCompra" onClick={cerrarConfirmarCompra} onMouseDown={() => setAptoParaCerrar(true)}>
            <div className="parteUtilizableConfirmarCompra" onMouseDown={handleParteUtilizableClick} onMouseUp={handleParteUtilizableClick}>
                {instanciaPedido == 'envio' ?
                    (<>
                        {calle == '' || numero == '' || cp == '' || localidad == '' || provincia == '' ?
                            (<ErrorDirecion />)
                            :
                            (<CorroborarDireccion />)
                        }
                    </>)
                    :
                    (<>
                        {instanciaPedido == 'facturacion' ? 
                            (<Facturacion/>) 
                            : 
                            (<>

                            </>)
                        }
                    </>)
                }
            </div>
        </div>
    );
}