import React, { createContext, useContext, useState } from 'react';
import { useVariables } from './contextVariables';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {
    const { backend } = useVariables();

    const [precioAscActivo, setPrecioAscActivo] = useState(false);
    const [precioDescActivo, setPrecioDescActivo] = useState(false);
    const [kgAscActivo, setKgAscActivo] = useState(false);
    const [kgDescActivo, setKgDescActivo] = useState(false);
    const [cod_origAscActivo, setCod_origAscActivo] = useState(false);
    const [cod_origDescActivo, setCod_origDescActivo] = useState(false);
    const [ordenamientoActivo, setOrdenamientoActivo] = useState('null');
    const [productosIndexado, setProductosIndexado] = useState([]);
    const [coloresArray, setColoresArray] = useState([]);
    const [productosEliminados, setProductosEliminados] = useState([]);

    const nuevosColores = new Set();

    const eliminarORestaurarProductos = (producto) => {
        if (productosEliminados.includes(producto)) {
            // Si el producto ya está en la lista, lo eliminamos
            setProductosEliminados(productosEliminados.filter(id => id !== producto));
        } else {
            // Si el producto no está en la lista, creamos una nueva lista con el producto agregado
            setProductosEliminados(prevProductosEliminados => [...prevProductosEliminados, producto]);
        }
    }

    const obtenerProductosFiltrados = async (categoria, descuentos) => {
        try {
            const response = await fetch(`${backend}/api/productos`);
            if (response.ok) {
                const productosObtenidos = await response.json();

                // Realizar actualizaciones según la categoría
                const productosActualizados = productosObtenidos.map((producto) => {
                    let precioFinal = producto.precio; // Precio inicial
                    if (categoria === 'MAYORISTA' && producto.precioMayorista) {
                        // Si es mayorista y hay precio mayorista, actualizar precio
                        precioFinal = producto.precioMayorista;
                    }
                    if (descuentos != null && descuentos[producto.rubro]) {
                        // Aplicar descuento si descuentos no es nulo y hay un valor en producto[rubro]
                        precioFinal -= parseInt(descuentos[producto.rubro] / 100 * producto.precio);
                    }

                    return { ...producto, precio: precioFinal };
                });

                // Indexar los productos actualizados
                setProductosIndexado(productosActualizados.reduce((acc, el) => {
                    acc[el.id] = el;

                    const colorEnMayusculas = el.color.trim().toUpperCase();
                    nuevosColores.add(colorEnMayusculas);

                    return acc;
                }, {}));

                setColoresArray([...nuevosColores]);
                obtenerProductosEliminados();
            } else {
                console.error('Error al obtener productos filtrados:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const obtenerProductosEliminados = async () => {
        try {
            const response = await fetch(`${backend}/api/obtenerProductosEliminados`);

            if (response.ok) {
                const data = await response.json();
                setProductosEliminados(data);
                console.log(typeof(data));
                return true;
            } else {
                console.error('Error');
                return false;
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            return false;
        }
    };

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

    const cerrarOrdenamientos = () => {
        setPrecioAscActivo(false);
        setPrecioDescActivo(false);
        setKgAscActivo(false);
        setKgDescActivo(false);
        setCod_origAscActivo(false);
        setCod_origDescActivo(false);
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
            setProductosIndexado,
            productosIndexado,
            ordenamientoActivo,
            setOrdenamientoActivo,
            obtenerProductosFiltrados,
            coloresArray,
            cerrarOrdenamientos,
            productosEliminados,
            eliminarORestaurarProductos
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export { ProductosContext, useProductos, ProductosProvider };
