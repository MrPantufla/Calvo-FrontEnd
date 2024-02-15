import './confirmarCompra.css';
import { useDireccion } from '../../contextDireccion';
import CorroborarDatos from './Corroborar datos/corroborarDatos';
import { useCarrito } from '../../contextCarrito';
import ErrorDirecion from './Error direccion/errorDireccion';

export default function ConfirmarCompra() {
    const {
        calle,
        numero,
        cp,
        localidad,
        provincia
    } = useDireccion();

    const carrito = useCarrito();

    const handleParteUtilizableClick = (event) => {
        event.stopPropagation();
    }

    const cerrarConfirmarCompra = () =>{
        carrito.setConfirmarCompraAbierto(false)
        console.log(carrito.confirmarCompraAbierto)
    }

    return (
        <div className="contenedorPrincipalConfirmarCompra" onClick={cerrarConfirmarCompra}>
            <div className="parteUtilizableConfirmarCompra" onClick={handleParteUtilizableClick}>
                    {calle=='' || numero=='' || cp=='' || localidad=='' || provincia=='' ? 
                    (
                        <ErrorDirecion/>
                    ) 
                    : 
                    (<CorroborarDatos />)}
            </div>
        </div>
    );
}