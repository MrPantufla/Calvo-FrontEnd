import React, { createContext, useContext, useEffect, useState } from 'react';
import { productos } from './productos.js';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {
    const [precioAscActivo, setPrecioAscActivo] = useState(false);
    const [precioDescActivo, setPrecioDescActivo] = useState(false);
    const [kgAscActivo, setKgAscActivo] = useState(false);
    const [kgDescActivo, setKgDescActivo] = useState(false);
    const [ordenamientoActivo, setOrdenamientoActivo] = useState('null');
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

    const ordenarPorPrecioAsc = (productos) => {
        return productos.sort((prodA, prodB) => prodA.precio - prodB.precio);
    }

    const ordenarPorPrecioDesc = (productos) => {
        return productos.sort((prodA, prodB) => prodB.precio - prodA.precio);
    }

    const ordenarPorKgAsc = (productos) => {
        return productos.sort((prodA, prodB) => prodA.kg - prodB.kg);
    }

    const ordenarPorKgDesc = (productos) => {
        const nuevosProductos = productos.sort((prodA, prodB) => prodB.kg - prodA.kg);
        return nuevosProductos;
    }

    const ordenarProductos = (productos) => {
        switch (ordenamientoActivo) {
            case 'precioAsc':
                return ordenarPorPrecioAsc(productos);
            case 'precioDesc':
                return ordenarPorPrecioDesc(productos);
            case 'kgAsc':
                return ordenarPorKgAsc(productos);
            case 'kgDesc':
                return ordenarPorKgDesc(productos);
            default:
                return productos;
        }
    }

    return (
        <ProductosContext.Provider value={{
            precioAscActivo,
            precioDescActivo,
            kgAscActivo,
            kgDescActivo,
            setPrecioAscActivo,
            setPrecioDescActivo,
            setKgAscActivo,
            setKgDescActivo,
            ordenarProductos,
            productosIndexado,
            ordenamientoActivo,
            setOrdenamientoActivo
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export { ProductosContext, useProductos, ProductosProvider };
