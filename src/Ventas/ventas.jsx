import Filtros from './FiltrosYProductos/filtrosYProductos';
import Header from '../Principal/Header/header.jsx';
import Carrito from './Carrito/carrito';
import Favoritos from './Favoritos/favoritos.jsx';
import { useState, useEffect } from 'react';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';
import Catalogos from './Catalogos/catalogos.jsx';
import CartelLogout from '../Logout/cartelLogout.jsx';
import { productos } from '../productos.js'; //Por si la base de datos no anda

export default function Ventas(){
    const [jsonProductos, setJsonProductos] = useState([]);

    useEffect(() => {
        obtenerProductosFiltrados();
    }, []);

    const obtenerProductosFiltrados = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/productos`);
          if (response.ok) {
            const productosObtenidos = await response.json();
            setJsonProductos(productosObtenidos);
          } else {
            console.error('Error al obtener productos filtrados:', response.statusText);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
    }

    return(
        <>
            <Header/>
            <Catalogos/>
            <LoginYRegistro/>
            <CartelLogout/>
            <Carrito json={jsonProductos}/>
            <Favoritos/>
            <Filtros json={jsonProductos}/>
            <Footer/>
        </>
    );
}