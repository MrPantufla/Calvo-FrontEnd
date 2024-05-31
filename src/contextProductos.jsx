import React, { createContext, useContext, useState } from 'react';
import { useVariables } from './contextVariables';
import Cookies from 'js-cookie';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {
    const { backend } = useVariables();

    const [ordenamientoActivo, setOrdenamientoActivo] = useState('null');
    const [productosIndexado, setProductosIndexado] = useState([]);
    const [coloresArray, setColoresArray] = useState([]);
    const [productosEliminados, setProductosEliminados] = useState([]);
    const [dataCargada, setDataCargada] = useState(false);
    const [productosSueltos, setProductosSueltos] = useState([]);

    const nuevosColores = new Set();

    const obtenerProductosFiltrados = async (categoria, descuentos) => {
        try {
            const response = await fetch(`${backend}/api/productos`);
            if (response) {
                setDataCargada(true);
            }
            if (response.ok) {
                const productosObtenidos = await response.json();

                // Realizar actualizaciones según la categoría
                const referencias = {};
                const productosSueltosTemporal = {};

                const productosActualizados = productosObtenidos.reduce((acumulador, producto) => {
                    let precioFinal = producto.precio_vta1; // Precio inicial
                    if (categoria === 'MAYORISTA' && producto.precio_vta2) {
                        // Si es mayorista y hay precio mayorista, actualizar precio
                        precioFinal = producto.precio_vta2;
                    }
                    let copiaPrecio = precioFinal;
                    if (descuentos != null && descuentos[producto.rubro]) {
                        // Aplicar descuento si descuentos no es nulo y hay un valor en producto[rubro]
                        precioFinal -= parseInt(descuentos[producto.rubro] / 100 * copiaPrecio);
                    }

                    if (producto.cod_orig.endsWith('-S')) {
                        if(!productosSueltosTemporal[producto.id]){
                            productosSueltosTemporal[producto.id] = [];
                        }
                        productosSueltosTemporal[producto.id] = (producto)
                        const baseCod = producto.cod_orig.slice(0, -2);
                        if (!referencias[baseCod]) {
                            referencias[baseCod] = [];
                        }
                        referencias[baseCod].push({id: producto.id, color: producto.color});
                    }
                    else if (producto.cod_orig.endsWith('ES') && producto.tipo_prod == 'PERFIL') {
                        if(!productosSueltosTemporal[producto.id]){
                            productosSueltosTemporal[producto.id] = [];
                        }
                        productosSueltosTemporal[producto.id] = (producto)
                        const baseCod = producto.cod_orig.slice(0, -1);
                        if(!referencias[baseCod]){
                            referencias[baseCod] = [];
                        }
                        referencias[baseCod].push({id: producto.id, color: producto.color});
                    }
                    else {
                        acumulador.push({ ...producto, precio: precioFinal, referencia: '' });
                    }
                    setProductosSueltos(productosSueltosTemporal);
                    return acumulador;
                }, []);

                // Indexar los productos actualizados
                setProductosIndexado(productosActualizados.reduce((acc, el) => {

                    if (referencias[el.cod_orig]) {
                        const productoColor = referencias[el.cod_orig].find(referencia => referencia.color == el.color);
                        if(productoColor){
                            el.referencia = productoColor.id;
                        }
                    }

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

    const eliminarProducto = async (idProducto) => {
        try {
            let tokenParaEnviar = Cookies.get('jwtToken');

            if (tokenParaEnviar == undefined) {
                tokenParaEnviar = null;
            }
            const response = await fetch(`${backend}/api/eliminarProducto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenParaEnviar,
                },
                body: JSON.stringify(idProducto),
            });

            const responseBody = await response.text();

            if (response.status == 200) {
                if (responseBody.includes("eliminado")) {
                    setProductosEliminados(prevProductosEliminados => [...prevProductosEliminados, idProducto]);
                } else if (responseBody.includes("restaurado")) {
                    setProductosEliminados(productosEliminados.filter(id => id !== idProducto));
                }
            }
            else {
                console.error('Error eliminando el producto:', response);
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

    return (
        <ProductosContext.Provider value={{
            ordenarProductos,
            setProductosIndexado,
            productosIndexado,
            ordenamientoActivo,
            setOrdenamientoActivo,
            obtenerProductosFiltrados,
            coloresArray,
            productosEliminados,
            eliminarProducto,
            dataCargada,
            productosSueltos
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export { ProductosContext, useProductos, ProductosProvider };
