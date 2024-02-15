import { useCarrito } from '../../../contextCarrito';
import './pedidoRealizado.css';

export default function PedidoRealizado() {
  const {
    setCompraRealizadaAbierto,
    compraRealizadaAbierto
  } = useCarrito();

  const cerrarVentana = () =>{
    setCompraRealizadaAbierto(false);
  }

  const parteUtilizableClick = (e) =>{
    e.stopPropagation();
  }

  return (
    <div className="contenedorPrincipalPedidoRealizado" onClick={cerrarVentana} style={{ display: compraRealizadaAbierto ? 'flex' : 'none' }}>
      <div className="parteUtilizablePedidoRealizado" onClick={parteUtilizableClick}>
        <h2>Gracias por realizar tu pedido, nos estaremos comunicando a la brevedad</h2>
        <button onClick={cerrarVentana}>Aceptar</button>
      </div>
    </div>
  );
}
