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
      <div className="parteUtilizablePedidoRealizado" onMouseDown={parteUtilizableClick} onMouseUp={parteUtilizableClick}>
        <h2>{respuestaCompra}</h2>
        {respuestaCompra &&
          (respuestaRecibida == false) &&
          <div className="spinner-border cargandoRespuesta spinnerFinalizarCompra" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
        <button onClick={() => { setCompraRealizadaAbierto(false); setRespuestaCompra(false) }}>Aceptar</button>
      </div>
    </div >
  );
}