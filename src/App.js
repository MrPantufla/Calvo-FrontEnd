import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Perfil from './Perfil/perfil.jsx';
import { LoginProvider } from './contextLogin.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DesplegableProviderCatalogos } from './contextDesplegableCatalogos.jsx';
import MisCompras from './Mis compras/misCompras.jsx';
import { DesplegableProviderPerfil } from './contextDesplegablePerfil.jsx';
import { TiendaProvider } from './contextTienda.jsx';
import EditarUsuarios from './Editar usuarios/editarUsuarios.jsx';
import LoginYRegistro from './Login y registro/loginYRegistro.jsx';
import CartelCliente from './Login y registro/Cartel cliente/cartelCliente.jsx';
import { CarritoProvider } from './contextCarrito.jsx';
import { FavoritosProvider } from './contextFavoritos.jsx';
import { ProductosProvider } from './contextProductos.jsx';
import { ConfiguracionProvider } from './contextConfiguracion.jsx';
import { useVariables } from './contextVariables.jsx';
import TerminosYCondiciones from './Terminos y condiciones/terminosYCondiciones.jsx';
import { FinalizarCompraProvider } from './contextFinalizarCompra.jsx';
import { ZonasProvider } from './contextZonas.jsx';
import PdfCarrito from './Ventas/Carrito/PdfCarrito/pdfCarrito.jsx';

function App() {

  return (
    <ProductosProvider>
      <DesplegableProviderCatalogos>
        <DesplegableProviderPerfil>
          <Router>
            <ZonasProvider>
              <LoginProvider>
                <FinalizarCompraProvider>
                  <CarritoProvider>
                    <FavoritosProvider>
                      <TiendaProvider>
                        <ConfiguracionProvider>
                          <Routes>
                            <Route path="/" element={<HomePage />/*<h1>Nos encontramos con problemas en el servicio, volveremos pronto</h1>}*/} />
                            <Route path="/tienda" element={<Ventas />} />
                            <Route path="/perfil" element={<Perfil />} />
                            <Route path="/misCompras" element={<MisCompras />} />
                            <Route path="/editarUsuarios" element={<EditarUsuarios />} />
                            <Route path="/terminosYCondiciones" element={<TerminosYCondiciones />} />
                            {<Route path="/pdf" element={<PdfCarrito />} />}
                          </Routes>
                          <LoginYRegistro />
                        </ConfiguracionProvider>
                      </TiendaProvider>
                    </FavoritosProvider>
                  </CarritoProvider>
                </FinalizarCompraProvider>
              </LoginProvider>
            </ZonasProvider>
          </Router>
        </DesplegableProviderPerfil>
      </DesplegableProviderCatalogos>
    </ProductosProvider>
  );
}

export default App;