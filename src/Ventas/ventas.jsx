import Filtros from './FiltrosYProductos/filtrosYProductos';
import Footer from '../Principal/Footer/footer.jsx';
import Catalogos from './Catalogos/catalogos.jsx';
import CartelLogout from '../Logout/cartelLogout.jsx';
import { useCarrito } from '../contextCarrito.jsx';
import ConfirmarCompra from './Confirmar compra/confirmarCompra.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';
import CartelError from './CartelError/cartelError.jsx';
import PedidoRealizado from './Confirmar compra/Pedido realizado/pedidoRealizado.jsx';
import Pagos from './Confirmar compra/Pagos/pagos.jsx';
import { useTienda } from '../contextTienda.jsx';
import BotonPagos from './Confirmar compra/Pagos/botonPagos.jsx';
import { ProviderCortinas } from '../contextCortinas.jsx';

export default function Ventas() {
  const carrito = useCarrito();
  const tienda = useTienda();

  return (
    <>
      <ProviderCortinas>
        <RenderHeader />
        <DesplegablePerfil />
        <Catalogos />
        <CartelLogout />
        <Filtros />
        {carrito.confirmarCompraAbierto ? (<ConfirmarCompra />) : (<></>)}
        <CartelError />
        {carrito.compraRealizadaAbierto ? (<PedidoRealizado />) : (<></>)}
        {tienda.mostrarPagos ? (<Pagos />) : (<></>)}
        <BotonPagos />
        <Footer />
      </ProviderCortinas>
    </>
  );
}