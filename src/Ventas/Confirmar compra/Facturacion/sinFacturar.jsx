import { useCarrito } from "../../../contextCarrito";
import { useVariables } from "../../../contextVariables";

export default function SinFacturar() {

    const {
        confirmarCompra,
        limpiarCarrito,
        setCarritoAbierto
    } = useCarrito();

    const {
        setMostrarFacturacion
    } = useVariables();

    const confirmar = (e, datosPedido) => {
        e.preventDefault();

        confirmarCompra(datosPedido);
        limpiarCarrito();
        setCarritoAbierto(false);
        setMostrarFacturacion(false);
    }

    return (
        <div className="contenedorConfirmarBoton">
            <button onClick={(e) => confirmar(e, 'Sin facturar')} className="confirmarBoton">Confirmar</button>
        </div>
    );
}