import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VariablesProvider } from './contextVariables.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VariablesProvider>
    <App />
  </VariablesProvider>
);