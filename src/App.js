import './App.css';
import React from 'react';
import HomePage from './Principal/homePage';
import Ventas from './Ventas/ventas.jsx';
import Login from './Login/login.jsx';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const apiUrl = "http://localhost:8080/api";
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/tienda" element={<Ventas/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
