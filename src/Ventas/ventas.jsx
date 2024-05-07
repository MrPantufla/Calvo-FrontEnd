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
    compraRealizadaAbierto
  } = useCarrito();

  const { mostrarPagos } = useTienda();

  return (
    <>
      <ProviderCortinas>
        <RenderHeader />
        <DesplegablePerfil />
        <Catalogos />
        <Filtros />
        {confirmarCompraAbierto ? (<ConfirmarCompra />) : (<></>)}
        <CartelError />
        {compraRealizadaAbierto ? (<PedidoRealizado />) : (<></>)}
        {mostrarPagos ? (<Pagos />) : (<></>)}
        <Footer />
      </ProviderCortinas>
    </>
  );
}