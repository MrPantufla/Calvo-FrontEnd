import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVariables } from './contextVariables';
import Cookies from 'js-cookie';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {

    const { backend } = useVariables();

    const [ordenamientoActivo, setOrdenamientoActivo] = useState(null);
    const [productosIndexado, setProductosIndexado] = useState([]);
    const [coloresArray, setColoresArray] = useState([]);
    const [productosEliminados, setProductosEliminados] = useState([]);
    const [dataCargada, setDataCargada] = useState(false);
    const [productosSueltos, setProductosSueltos] = useState([]);
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [procesosIndexado, setProcesosIndexado] = useState([]);
    const [procesosRenderizar, setProcesosRenderizar] = useState([]);

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
                const procesosTemporal = {};
                let procesosRenderizarTemporal = {};
                const troqueladosTemporal = {};

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

                    if(producto.tipo_prod == 'PUNTUAL' || producto.tipo_prod == 'MAQUINAS'){
                        precioFinal = 0;
                    }

                    if (producto.tipo_prod != 'PROCESOS') {
                        if (producto.cod_orig.endsWith('-S')) {
                            const baseCod = producto.cod_orig.slice(0, -2);
                            const referenciaPaquete = productosObtenidos.find(producto => producto.cod_orig == baseCod);

                            if (!productosSueltosTemporal[producto.id]) {
                                productosSueltosTemporal[producto.id] = [];
                            }
                            productosSueltosTemporal[producto.id] = ({ ...producto, precio: precioFinal, referenciaPaquete: referenciaPaquete })
                            if (!referencias[baseCod]) {
                                referencias[baseCod] = [];
                            }
                            referencias[baseCod].push({ id: producto.id, color: producto.color });
                        }
                        else if (producto.cod_orig.endsWith('ES') && producto.tipo_prod == 'PERFIL') {
                            const baseCod = producto.cod_orig.slice(0, -1);
                            const referenciaPaquete = productosObtenidos.find(producto => producto.cod_orig == baseCod);

                            if (!productosSueltosTemporal[producto.id]) {
                                productosSueltosTemporal[producto.id] = [];
                            }
                            productosSueltosTemporal[producto.id] = ({ ...producto, precio: precioFinal, referenciaPaquete: referenciaPaquete })


                            if (!referencias[baseCod]) {
                                referencias[baseCod] = [];
                            }
                            referencias[baseCod].push({ id: producto.id, color: producto.color });
                        }
                        else {
                            acumulador.push({ ...producto, precio: precioFinal, referencia: '' });
                        }
                    }
                    else {
                        const codigo = producto.cod_orig.trim();
                        const pintRegex = /^PINT\s\S+$/;
                        const trozadoRegex = /\bTROZADO\b/i;
                        const pdtRegex = /\bPDT\b/i;
                        switch(producto.rubro){
                            case 88:{
                                if(codigo.slice(-2) != 'CL' && codigo.slice(-3) != 'BYC' && !trozadoRegex.test(producto.detalle)){
                                    procesosTemporal[producto.id] = producto;

                                    if(codigo.slice(-2) != 'LL'){
                                        procesosRenderizarTemporal[producto.id] = producto;
                                    }
                                }
                                break;
                            }
                            case 67:{
                                if((codigo.slice(-2) == 'M2' || pintRegex.test(codigo) || codigo.slice(-2) == 'LL') && !pdtRegex.test(producto.detalle)){
                                    procesosTemporal[producto.id] = producto;
                                    if(codigo.slice(-2) != 'LL'){
                                        procesosRenderizarTemporal[producto.id] = producto;
                                    }
                                }
                                break;
                            }
                            case 78:{
                                if(!trozadoRegex.test(producto.detalle)){
                                    procesosRenderizarTemporal[producto.id] = producto;
                                    procesosTemporal[producto.id] = producto;
                                }
                                break;
                            }
                            case 3:{
                                if(pintRegex.test(codigo)){
                                    procesosRenderizarTemporal[producto.id] = producto;
                                }
                                break;
                            }
                            case 73:{
                                if(codigo.slice(-2) == 'M2' || pintRegex.test(codigo || codigo.slice(-2) == 'LL')){
                                    procesosTemporal[producto.id] = producto;
                                    if(codigo.slice(-2) != 'LL'){
                                        procesosRenderizarTemporal[producto.id] = producto;
                                    }
                                }
                                break;
                            }
                            default:{
                                procesosTemporal[producto.id] = producto;
                            }
                        }
                        
                    }

                    return acumulador;
                }, []);

                setProductosSueltos(productosSueltosTemporal);
                setProcesosIndexado(procesosTemporal);

                setProductosIndexado(productosActualizados.reduce((acc, el) => {

                    if (referencias[el.cod_orig]) {
                        const productoColor = referencias[el.cod_orig].find(referencia => referencia.color == el.color);
                        if (productoColor) {
                            el.referencia = productoColor.id;
                        }
                    }

                    acc[el.id] = el;

                    const colorEnMayusculas = el.color.trim().toUpperCase();
                    nuevosColores.add(colorEnMayusculas);

                    return acc;
                }, {}));

                procesosRenderizarTemporal = Object.values(procesosRenderizarTemporal);

                setProcesosRenderizar(procesosRenderizarTemporal.reduce((acc, el) => {
                    acc[el.id] = el;
                    return acc;
                }, {}));

                setColoresArray([...nuevosColores]);
                obtenerProductosEliminados();
                obtenerProductosDestacados();
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
                console.error('Error obteniendo productos eliminados');
                return false;
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            return false;
        }
    };

    const obtenerProductosDestacados = async () => {
        try {
            const response = await fetch(`${backend}/api/obtenerProductosDestacados`);

            if (response.ok) {
                const data = await response.json();
                setProductosDestacados(data);
                return true;
            }
            else {
                console.error('Error obteniendo productos destacados');
                return false;
            }
        }
        catch (error) {
            console.log('Error desconocido: ', error);
            return false;
        }
    }

    const guardarDestacados = async () => {
        let tokenParaEnviar = Cookies.get('jwtToken');

        if (tokenParaEnviar == undefined) {
            tokenParaEnviar = null;
        }
        console.log(productosDestacados)
        try {
            const response = await fetch(`${backend}/api/guardarDestacados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenParaEnviar,
                },
                body: JSON.stringify(productosDestacados),
            });

            if (response.ok) {
                console.log("Produtos destacados exitosamente");
                return true;
            }
            else {
                console.log(response);
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }

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

    const ordenarPorDestacados = (productos, destacados) => {
        const destacadosMap = new Map();
        destacados.forEach((id, index) => {
            // Mapeamos el índice en el array de destacados a una posición inversa
            destacadosMap.set(id, destacados.length - 1 - index);
        });

        return productos.sort((prodA, prodB) => {
            const posA = destacadosMap.has(prodA.id) ? destacadosMap.get(prodA.id) : Infinity;
            const posB = destacadosMap.has(prodB.id) ? destacadosMap.get(prodB.id) : Infinity;

            if (posA !== posB) {
                return posA - posB; // Ordenar según la posición en el array de destacados invertido
            } else {
                return prodA.id - prodB.id; // Ordenar por ID si no están en destacados o tienen la misma posición
            }
        });
    };

    const ordenarPorPrecioAsc = (productos) => {
        return productos.sort((prodA, prodB) => {
            const precioA = prodA.kg !== 0 ? prodA.precio * prodA.kg : prodA.precio;
            const precioB = prodB.kg !== 0 ? prodB.precio * prodB.kg : prodB.precio;

            if(precioA === 0 && precioB !== 0){
                return 1
            }
            
            if(precioB === 0 && precioA !== 0){
                return -1;
            }

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
        return productos.sort((prodA, prodB) => {
            // Si prodA tiene peso 0 y prodB no, prodA va al final
            if (prodA.kg === 0 && prodB.kg !== 0) {
                return 1;
            }
            // Si prodB tiene peso 0 y prodA no, prodB va al final
            if (prodB.kg === 0 && prodA.kg !== 0) {
                return -1;
            }
            // En cualquier otro caso, ordenar normalmente por peso ascendente
            return prodA.kg - prodB.kg;
        });
    };

    const ordenarPorKgDesc = (productos) => {
        return productos.sort((prodA, prodB) => {
            // Si prodA tiene peso 0 y prodB no, prodA va al final
            if (prodA.kg === 0 && prodB.kg !== 0) {
                return 1;
            }
            // Si prodB tiene peso 0 y prodA no, prodB va al final
            if (prodB.kg === 0 && prodA.kg !== 0) {
                return -1;
            }
            // En cualquier otro caso, ordenar normalmente por peso descendente
            return prodB.kg - prodA.kg;
        });
    };

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

    useEffect(() => {
        if (!ordenamientoActivo) {
            if (productosDestacados) {
                setOrdenamientoActivo('destacados');
            }
        }

    }, [ordenamientoActivo])

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
            case 'destacados':
                return ordenarPorDestacados(productos, productosDestacados);
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
            productosSueltos,
            productosDestacados,
            guardarDestacados,
            setProductosDestacados,
            productosDestacados,
            procesosRenderizar
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export { ProductosContext, useProductos, ProductosProvider };
