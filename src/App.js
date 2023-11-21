import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Perfil from './Perfil/perfil.jsx';
import LoginYRegistro from './Login y registro/loginYRegistro.jsx';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LoginProvider } from './contextLogin';

function App() {
  const apiUrl = "http://localhost:8080/api";
  return (
    <LoginProvider>
      <Router>
      <Routes>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/tienda" element={<Ventas/>}/>
      <Route path="/login" element={<LoginYRegistro/>}/>
      <Route path="/perfil" element={<Perfil/>}/>
      </Routes>
    </Router>
    </LoginProvider>
    
  );
}

export default App;
