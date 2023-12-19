import Filtros from './FiltrosYProductos/filtrosYProductos';
import Header from '../Principal/Header/header.jsx';
import Carrito from './Carrito/carrito';
import Favoritos from './Favoritos/favoritos.jsx';
import { useState, useEffect } from 'react';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';
import Catalogos from './Catalogos/catalogos.jsx';
import CartelLogout from '../Logout/cartelLogout.jsx';
import { useCarrito } from '../contextCarrito.jsx';
import ConfirmarCompra from './Confirmar compra/confirmarCompra.jsx';
import { productos } from '../productos.js'; //Por si la base de datos no anda

export default function Ventas() {
  const carrito = useCarrito();
  return (
    <>
      <Header />
      <Catalogos />
      <LoginYRegistro />
      <CartelLogout />
      <Carrito />
      <Favoritos />
      <Filtros />
      {carrito.confirmarCompraAbierto ? (<ConfirmarCompra/>) : (<></>)}
      <Footer />
    </>
  );
}