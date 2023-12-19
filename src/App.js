import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Perfil from './Perfil/perfil.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DesplegableProviderCatalogos } from './contextDesplegableCatalogos.jsx';
import MisCompras from './Mis compras/misCompras.jsx';
import { DireccionProvider } from './contextDireccion.jsx';

function App() {
  const apiUrl = "http://localhost:8080/api";
  return (
    <DireccionProvider>
      <DesplegableProviderCatalogos>
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/tienda" element={<Ventas />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/misCompras" element={<MisCompras />} />
          </Routes>
        </Router>
      </DesplegableProviderCatalogos>
    </DireccionProvider>
  );
}

export default App;
