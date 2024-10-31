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

function App() {

  return (
    <ProductosProvider>
      <DesplegableProviderCatalogos>
        <DesplegableProviderPerfil>
          <Router>
            <ZonasProvider>
              <LoginProvider>
                <CarritoProvider>
                  <FavoritosProvider>
                    <FinalizarCompraProvider>
                      <TiendaProvider>
                        <ConfiguracionProvider>
                          <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/tienda" element={<Ventas />} />
                            <Route path="/perfil" element={<Perfil />} />
                            <Route path="/misCompras" element={<MisCompras />} />
                            <Route path="/editarUsuarios" element={<EditarUsuarios />} />
                            <Route path="/terminosYCondiciones" element={<TerminosYCondiciones />} />
                            {/*<Route path="/pdf" element={<PdfCarrito/>} />*/}
                          </Routes>
                          <LoginYRegistro />
                        </ConfiguracionProvider>
                      </TiendaProvider>
                    </FinalizarCompraProvider>
                  </FavoritosProvider>
                </CarritoProvider>
              </LoginProvider>
            </ZonasProvider>
          </Router>
        </DesplegableProviderPerfil>
      </DesplegableProviderCatalogos>
    </ProductosProvider>
  );
}

export default App;