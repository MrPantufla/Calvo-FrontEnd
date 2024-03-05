import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Perfil from './Perfil/perfil.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DesplegableProviderCatalogos } from './contextDesplegableCatalogos.jsx';
import MisCompras from './Mis compras/misCompras.jsx';
import { DireccionProvider } from './contextDireccion.jsx';
import { ConfiguracionProvider } from './contextConfiguracion.jsx';
import { DesplegableProviderPerfil } from './contextDesplegablePerfil.jsx';
import { TiendaProvider } from './contextTienda.jsx';
import EditarUsuarios from './Editar usuarios/editarUsuarios.jsx';
import LoginYRegistro from './Login y registro/loginYRegistro.jsx';

function App() {
  const apiUrl = "http://localhost:8080/api";
  return (
    <TiendaProvider>
      <ConfiguracionProvider>
        <DireccionProvider>
          <DesplegableProviderCatalogos>
            <DesplegableProviderPerfil>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tienda" element={<Ventas />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/misCompras" element={<MisCompras />} />
                  <Route path="/editarUsuarios" element={<EditarUsuarios />} />
                </Routes>
              </Router>
              <LoginYRegistro/>
            </DesplegableProviderPerfil>
          </DesplegableProviderCatalogos>
        </DireccionProvider>
      </ConfiguracionProvider>
    </TiendaProvider>
    
  );
}

export default App;
