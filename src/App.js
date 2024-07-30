import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Perfil from './Perfil/perfil.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DesplegableProviderCatalogos } from './contextDesplegableCatalogos.jsx';
import MisCompras from './Mis compras/misCompras.jsx';
import { DesplegableProviderPerfil } from './contextDesplegablePerfil.jsx';
import { TiendaProvider } from './contextTienda.jsx';
import EditarUsuarios from './Editar usuarios/editarUsuarios.jsx';
import LoginYRegistro from './Login y registro/loginYRegistro.jsx';
import { useAuth } from './contextLogin.jsx';
import CartelCliente from './Login y registro/Cartel cliente/cartelCliente.jsx';

function App() {
  const { mostrarCartelCliente } = useAuth();

  return (
    <DesplegableProviderCatalogos>
      <DesplegableProviderPerfil>
        <Router>
          <TiendaProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tienda" element={<Ventas />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/misCompras" element={<MisCompras />} />
              <Route path="/editarUsuarios" element={<EditarUsuarios />} />
            </Routes>
            {mostrarCartelCliente == true && <CartelCliente />}
          </TiendaProvider>
        </Router>
        <LoginYRegistro />
      </DesplegableProviderPerfil>
    </DesplegableProviderCatalogos>
  );
}

export default App;