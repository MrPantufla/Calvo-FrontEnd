import { useCarrito } from '../../../contextCarrito';
import { useState } from 'react';
import './pedidoRealizado.css';

export default function PedidoRealizado() {
  const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

  const {
    setCompraRealizadaAbierto,
    compraRealizadaAbierto
  } = useCarrito();

  const cerrarVentana = () =>{
    if(aptoParaCerrar == true){
      setCompraRealizadaAbierto(false);
    }
  }

  const parteUtilizableClick = (event) =>{
    setAptoParaCerrar(false);
    event.stopPropagation();
  }

  return (
    <div className="contenedorPrincipalPedidoRealizado" onMouseDown={() => setAptoParaCerrar(true)} onClick={cerrarVentana} style={{ display: compraRealizadaAbierto ? 'flex' : 'none' }}>
      <div className="parteUtilizablePedidoRealizado" onMouseDown={parteUtilizableClick} onMouseUp={parteUtilizableClick}>
        <h2>Gracias por realizar tu pedido, nos estaremos comunicando a la brevedad</h2>
        <button onClick={() => setCompraRealizadaAbierto(false)}>Aceptar</button>
      </div>
    </div>
  );
}
