import Filtros from './FiltrosYProductos/filtrosYProductos';
import Footer from '../Principal/Footer/footer.jsx';
import Catalogos from './Catalogos/catalogos.jsx';
import { useCarrito } from '../contextCarrito.jsx';
import ConfirmarCompra from './Confirmar compra/confirmarCompra.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';
import CartelError from './CartelError/cartelError.jsx';
import PedidoRealizado from './Confirmar compra/Pedido realizado/pedidoRealizado.jsx';
import Pagos from './Confirmar compra/Pagos/pagos.jsx';
import { useTienda } from '../contextTienda.jsx';
import { ProviderCortinas } from '../contextCortinas.jsx';

export default function Ventas() {
  const {
    confirmarCompraAbierto,
    compraRealizadaAbierto,
    mostrarCartelError
  } = useCarrito();

  const {
    setStipoProceso,
    setAcabado,
    acabado,
    tipoProceso,
    stipoProceso,
    setTipoProceso
  } = useTienda();

  const { mostrarPagos } = useTienda();

  const atrasProcesos = () => {
    if (acabado != null && tipoProceso == 'anodizados') {
      setAcabado(null);
    }
    else if (stipoProceso != null) {
      setStipoProceso(null);
    }
    else if (tipoProceso != null) {
      setTipoProceso(null);
    }
  }

  return (
    <>
      <ProviderCortinas>
        <RenderHeader />
        <DesplegablePerfil />
        <Catalogos />
        <Filtros />
        {confirmarCompraAbierto && <ConfirmarCompra />}
        {mostrarCartelError && <CartelError />}
        {compraRealizadaAbierto && <PedidoRealizado />}
        {mostrarPagos && <Pagos />}
        {tipoProceso && <button className="atrasProcesos" onClick={() => atrasProcesos()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z" />
          </svg>
        </button>}
        <Footer />
      </ProviderCortinas>
    </>
  );
}