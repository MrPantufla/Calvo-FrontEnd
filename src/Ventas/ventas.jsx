import Filtros from './FiltrosYProductos/filtrosYProductos';
import Header from '../Principal/Header/header.jsx';
import Carrito from './Carrito/carrito';
import { useState, useEffect } from 'react';

export default function Ventas(){
    const [jsonProductos, setJsonProductos] = useState([]);

    useEffect(() => {
        obtenerProductosFiltrados();
    }, []);

    const obtenerProductosFiltrados = async (tipo_prod) => {
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
            <Carrito json={jsonProductos}/>
            <Filtros json={jsonProductos}/>
        </>
    );
}