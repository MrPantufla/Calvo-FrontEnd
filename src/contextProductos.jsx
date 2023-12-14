import React, { createContext, useContext, useEffect, useState } from 'react';
import { productos } from './productos.js';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {
    const [jsonProductos, setJsonProductos] = useState([]);

    useEffect(() => {
        obtenerProductosFiltrados();   //Comentar para version de muestra
        //setJsonProductos(productos); //Descomentar para version de muestra
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

    const productosIndexado = jsonProductos.reduce((acc, el) => {
        acc[el.id] = el;
        return acc;
    }, {});

    return (
        <ProductosContext.Provider value={{ productosIndexado }}>
            {children}
        </ProductosContext.Provider>
    );
}

export { ProductosContext, useProductos, ProductosProvider };
