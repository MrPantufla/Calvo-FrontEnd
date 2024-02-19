import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CarritoProvider } from './contextCarrito.jsx';
import { FavoritosProvider } from './contextFavoritos.jsx';
import { LoginProvider } from './contextLogin.jsx';
import { ProductosProvider } from './contextProductos.jsx';
import { VariablesProvider } from './contextVariables.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VariablesProvider>
    <ProductosProvider>
      <LoginProvider>
        <CarritoProvider>
          <FavoritosProvider>
            <App />
          </FavoritosProvider>
        </CarritoProvider>
      </LoginProvider>
    </ProductosProvider>
  </VariablesProvider>
);