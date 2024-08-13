import { useCarrito } from '../../../contextCarrito';
import { useState } from 'react';
import './pedidoRealizado.css';

export default function PedidoRealizado() {
  const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

  const {
    setCompraRealizadaAbierto,
    compraRealizadaAbierto,
    respuestaCompra,
    setRespuestaCompra,
    respuestaRecibida
  } = useCarrito();

  const cerrarVentana = () => {
    if (aptoParaCerrar == true) {
      setCompraRealizadaAbierto(false);
    }
  }

  const parteUtilizableClick = (event) => {
    setAptoParaCerrar(false);
    event.stopPropagation();
  }

  const cargandoClick = () => { }

  return (
    <div className="contenedorPrincipalPedidoRealizado" onMouseDown={() => setAptoParaCerrar(true)} onClick={respuestaRecibida ? cerrarVentana : cargandoClick} style={{ display: compraRealizadaAbierto ? 'flex' : 'none' }}>
      {respuestaRecibida ?
        (<div className="parteUtilizablePedidoRealizado" onMouseDown={parteUtilizableClick} onMouseUp={parteUtilizableClick}>
          {respuestaCompra &&
            (<h2>{respuestaCompra}</h2>)
          }
          <button onClick={() => { setCompraRealizadaAbierto(false); setRespuestaCompra(false) }}>Aceptar</button>
        </div>)
        :
        (<div className="spinner-border cargandoRespuesta" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>)
      }
    </div >
  );
}