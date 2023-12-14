import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Perfil from './Perfil/perfil.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DesplegableProviderCatalogos } from './contextDesplegableCatalogos.jsx';

function App() {
  const apiUrl = "http://localhost:8080/api";
  return (

        <DesplegableProviderCatalogos>
          <Router>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/tienda" element={<Ventas />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </Router>
        </DesplegableProviderCatalogos>
  );
}

export default App;
