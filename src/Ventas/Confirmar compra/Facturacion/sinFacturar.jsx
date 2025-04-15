import { useCarrito } from "../../../contextCarrito";
import { useFinalizarCompra } from "../../../contextFinalizarCompra";
import { useVariables } from "../../../contextVariables";

export default function SinFacturar() {

    const {
        setMostrarFacturacion,
        setMostrarFinalizarPedido,
        setMostrarPagos,
        setDatosPedido
    } = useVariables();

    const { metodoPago } = useFinalizarCompra();

    const {
        confirmarCompra,
        limpiarCarrito
    } = useCarrito();

    const confirmar = (e, datosPedido) => {
        e.preventDefault();

        //setDatosPedido('Sin facturar')

        setMostrarFacturacion(false);
        //setMostrarFinalizarPedido(true);
        //setMostrarPagos(true);
        confirmarCompra('Sin facturar')
    }

    return (
        <div className="contenedorConfirmarBoton">
            <button onClick={(e) => confirmar(e, 'Sin facturar')} className="confirmarBoton">{metodoPago == 'tarjeta' ? 'Pagar y confirmar pedido' : 'Confirmar pedido'}</button>
        </div>
    );
}