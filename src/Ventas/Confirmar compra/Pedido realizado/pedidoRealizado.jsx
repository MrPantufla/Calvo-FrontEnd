import { useCarrito } from '../../../contextCarrito';
import './pedidoRealizado.css';

export default function PedidoRealizado() {
  const carrito = useCarrito();

  const cerrarVentana = () =>{
    carrito.setCompraRealizadaAbierto(false);
  }

  const parteUtilizableClick = (e) =>{
    e.stopPropagation();
  }

  return (
    <div className="contenedorPrincipalPedidoRealizado" onClick={cerrarVentana} style={{ display: carrito.compraRealizadaAbierto ? 'flex' : 'none' }}>
      <div className="parteUtilizablePedidoRealizado" onClick={parteUtilizableClick}>
        <h2>Gracias por realizar tu pedido, nos estaremos comunicando en breves</h2>
        <button onClick={cerrarVentana}>Aceptar</button>
      </div>
    </div>
  );
}
