import Filtros from './FiltrosYProductos/filtrosYProductos';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';
import Catalogos from './Catalogos/catalogos.jsx';
import CartelLogout from '../Logout/cartelLogout.jsx';
import { useCarrito } from '../contextCarrito.jsx';
import ConfirmarCompra from './Confirmar compra/confirmarCompra.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';
import CartelError from './CartelError/cartelError.jsx';

export default function Ventas() {
  const carrito = useCarrito();
  return (
    <>
      <RenderHeader/>
      <DesplegablePerfil/>
      <Catalogos />
      <CartelLogout />
      <Filtros />
      {carrito.confirmarCompraAbierto ? (<ConfirmarCompra/>) : (<></>)}
      <CartelError/>
      <Footer />
    </>
  );
}