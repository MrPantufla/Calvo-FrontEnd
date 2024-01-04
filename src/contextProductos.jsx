import React, { createContext, useContext, useEffect, useState } from 'react';
import { productos } from './productos.js';
import { useAuth } from './contextLogin.jsx';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {
    const auth = useAuth();
    const [precioAscActivo, setPrecioAscActivo] = useState(false);
    const [precioDescActivo, setPrecioDescActivo] = useState(false);
    const [kgAscActivo, setKgAscActivo] = useState(false);
    const [kgDescActivo, setKgDescActivo] = useState(false);
    const [cod_origAscActivo, setCod_origAscActivo] = useState(false);
    const [cod_origDescActivo, setCod_origDescActivo] = useState(false);
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
        return productos.sort((prodA, prodB) => {
            const precioA = prodA.kg !== 0 ? prodA.precio * prodA.kg : prodA.precio;
            const precioB = prodB.kg !== 0 ? prodB.precio * prodB.kg : prodB.precio;

            return precioA - precioB;
        });
    }

    const ordenarPorPrecioDesc = (productos) => {
        return productos.sort((prodA, prodB) => {
            const precioA = prodA.kg !== 0 ? prodA.precio * prodA.kg : prodA.precio;
            const precioB = prodB.kg !== 0 ? prodB.precio * prodB.kg : prodB.precio;

            return precioB - precioA;
        });
    };

    const ordenarPorKgAsc = (productos) => {
        return productos.sort((prodA, prodB) => prodA.kg - prodB.kg);
    }

    const ordenarPorKgDesc = (productos) => {
        const nuevosProductos = productos.sort((prodA, prodB) => prodB.kg - prodA.kg);
        return nuevosProductos;
    }

    const ordenarPorCod_origAsc = (productos) => {
        const nuevosProductos = productos.sort((prodA, prodB) => {
            const cod_origA = prodA.cod_orig.toLowerCase();
            const cod_origB = prodB.cod_orig.toLowerCase();

            if (cod_origA < cod_origB) {
                return -1;
            }
            if (cod_origA > cod_origB) {
                return 1;
            }
            return 0;
        });

        return nuevosProductos;
    }

    const ordenarPorCod_origDesc = (productos) => {
        const nuevosProductos = productos.sort((prodA, prodB) => {
            const cod_origA = prodA.cod_orig.toLowerCase();
            const cod_origB = prodB.cod_orig.toLowerCase();

            if (cod_origA > cod_origB) {
                return -1;
            }
            if (cod_origA < cod_origB) {
                return 1;
            }
            return 0;
        });

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
            case 'cod_origAsc':
                return ordenarPorCod_origAsc(productos);
            case 'cod_origDesc':
                return ordenarPorCod_origDesc(productos);
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
            cod_origAscActivo,
            cod_origDescActivo,
            setCod_origAscActivo,
            setCod_origDescActivo,
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
