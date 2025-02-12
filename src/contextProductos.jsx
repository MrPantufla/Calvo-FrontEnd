import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVariables } from './contextVariables';

const ProductosContext = createContext();

function useProductos() {
    return useContext(ProductosContext);
}

function ProductosProvider({ children }) {

    const {
        backend,
        obtenerToken
    } = useVariables();

    const [ordenamientoActivo, setOrdenamientoActivo] = useState('destacados');
    const [productosIndexado, setProductosIndexado] = useState([]);
    const [coloresArray, setColoresArray] = useState([]);
    const [productosEliminados, setProductosEliminados] = useState([]);
    const [productosDeProcesosEliminados, setProductosDeProcesosEliminados] = useState([]);
    const [preciosOcultos, setPreciosOcultos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [marcasUnicas, setMarcasUnicas] = useState([]);
    const [dataCargada, setDataCargada] = useState(false);
    const [productosSueltos, setProductosSueltos] = useState([]);
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [procesos, setProcesos] = useState([]);
    const [troquelados, setTroquelados] = useState([]);
    const [ofertas, setOfertas] = useState([]);

    const nuevosColores = new Set();

    const obtenerProductosFiltrados = async (categoria, descuentos, zona) => {
        try {
            const response = await fetch(`${backend}/productos/get`);
            if (response) {
                setDataCargada(true);
            }
            if (response.ok) {
                const productosObtenidos = await response.json();

                // Realizar actualizaciones según la categoría
                const referencias = {};
                const productosSueltosTemporal = {};
                let procesosTemporal = {};
                let troqueladosTemporal = {};

                const productosActualizados = productosObtenidos.reduce((acumulador, producto) => {

                    let precioFinal = producto.precio_vta1; // Precio inicial
                    if (categoria === 'MAYORISTA' && producto.precio_vta2) {
                        // Si es mayorista y hay precio mayorista, actualizar precio
                        precioFinal = producto.precio_vta2;

                        //Si es cliente mayorista sin zona, se le agrega 15% al precio de ECO
                        if (zona == 'S/ZONA' && producto.tipo_prod == 'PERFIL' && (producto.cod_orig.endsWith('E') || producto.cod_orig.endsWith('ES'))) {
                            precioFinal = precioFinal * 1.15;
                        }
                    }

                    let copiaPrecio = precioFinal;
                    if (descuentos != null && descuentos[producto.rubro]) {
                        // Aplicar descuento si descuentos no es nulo y hay un valor en producto[rubro]
                        precioFinal -= (descuentos[producto.rubro] / 100 * copiaPrecio);
                    }

                    if (producto.tipo_prod == 'PUNTUAL' || producto.tipo_prod == 'MAQUINAS') {
                        precioFinal = 0;
                    }

                    if (producto.tipo_prod != 'PROCESOS') {
                        if (producto.cod_orig.endsWith('-S')) {
                            const baseCod = producto.cod_orig.slice(0, -2);
                            const referenciaPaquete = productosObtenidos.find(p => (p.cod_orig == baseCod));

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
                            const referenciaPaquete = productosObtenidos.find(p => ((p.cod_orig == baseCod)) && (producto.color == p.color));

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
                        if (producto.rubro != 65) {
                            procesosTemporal[producto.id] = ({ ...producto, precio: precioFinal, referencia: '' });
                        }
                        else {
                            troqueladosTemporal[producto.id] = ({ ...producto, precio: precioFinal, referencia: '' });
                        }
                    }

                    return acumulador;
                }, []);

                setProductosSueltos(productosSueltosTemporal);

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
                procesosTemporal[0] = ({ cantidad: 1, cod_int: 0, cod_orig: "SINACABADO", color: "Ind", costo_f: 0, detalle: "SIN ACABADO", dolar: 1, finalizar: "NO", id: 0, iva: 21, kg: 0, marca: 0, pesos: "NO", precio: 0, precio_vta1: 0, precio_vta2: 0, referencia: "", rubro: 89, srubro: 0, tipo_prod: "PROCESOS" })
                procesosTemporal = Object.values(procesosTemporal);
                troqueladosTemporal = Object.values(troqueladosTemporal);

                setProcesos(procesosTemporal.reduce((acc, el) => {
                    acc[el.id] = el;
                    return acc;
                }, {}));

                setTroquelados(troqueladosTemporal.reduce((acc, el) => {
                    acc[el.id] = el;
                    return acc;
                }, {}));

                setColoresArray([...nuevosColores]);
                obtenerProductosEliminados(false);
                obtenerProductosEliminados(true);
                obtenerPreciosOcultos();
                obtenerProductosDestacados();
            } else {
                console.error('Error al obtener productos filtrados:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const obtenerProductosEliminados = async (proceso) => {
        let endpoint;

        if (proceso == true) {
            endpoint = 'getProcesos';
        }
        else {
            endpoint = 'getProductos'
        }

        try {
            const response = await fetch(`${backend}/productosEliminados/${endpoint}`);

            if (response.ok) {
                const data = await response.json();
                const productos = data.map(item => item.producto);
                if (proceso == true) {
                    setProductosDeProcesosEliminados(productos);
                }
                else {
                    setProductosEliminados(productos);
                }
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

    const obtenerPreciosOcultos = async () => {
        try {
            const response = await fetch(`${backend}/preciosOcultos/get`);

            if (response.ok) {
                const data = await response.json();
                setPreciosOcultos(Object.values(data).map(precioOculto => precioOculto.producto));
                return true;
            }
            else {
                console.error('Error obteniendo precios ocultos');
                return false;
            }
        }
        catch (error) {
            console.log('Error desconocido: ', error);
            return false;
        }
    }


    const obtenerProductosDestacados = async () => {
        try {
            const response = await fetch(`${backend}/productosDestacados/get`);

            if (response.ok) {
                const data = await response.json();
                setProductosDestacados(Object.values(data).map(destacado => destacado.producto));
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

        try {
            const response = await fetch(`${backend}/productosDestacados/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': obtenerToken(),
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

    const eliminarProducto = async (idProducto, procesos) => {
        let endpoint;
        let body;

        if (procesos == true) {
            endpoint = 'postEliminarProceso';
            body = { idProducto: idProducto.toString() };

        } else {
            endpoint = 'postEliminarProducto';
            body = { idProducto: parseInt(idProducto) };
        }

        try {
            
            const response = await fetch(`${backend}/productosEliminados/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': obtenerToken(),
                },
                body: JSON.stringify(body),
            });

            const responseBody = await response.text();

            if (response.status == 200) {
                if (responseBody.includes("eliminado")) {
                    if (procesos == true) {
                        setProductosDeProcesosEliminados(prevProductosDeProcesosEliminados => [...prevProductosDeProcesosEliminados, idProducto]);
                    }
                    else {
                        setProductosEliminados(prevProductosEliminados => [...prevProductosEliminados, idProducto]);
                    }
                } else if (responseBody.includes("restaurado")) {
                    if (procesos == true) {
                        setProductosDeProcesosEliminados(productosDeProcesosEliminados.filter(id => id != idProducto));
                    }
                    else {
                        setProductosEliminados(productosEliminados.filter(id => id !== idProducto));
                    }
                }
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            return false;
        }
    };

    const ocultarPrecio = async (idProducto) => {
        try {
            
            const response = await fetch(`${backend}/ocultarPrecio/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': obtenerToken(),
                },
                body: JSON.stringify(idProducto),
            });

            const responseBody = await response.text();

            if (response.status == 200) {
                if (responseBody.includes("ocultado")) {
                    setPreciosOcultos(prevPreciosOcultos => [...prevPreciosOcultos, idProducto]);
                } else if (responseBody.includes("restaurado")) {
                    setPreciosOcultos(preciosOcultos.filter(id => id !== idProducto));
                }
            }
            else {
                console.error('Error ocultando el precio:', response);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            return false;
        }
    };

    const ordenarPorDestacados = (productos, destacados) => {
        // Crear un mapa para almacenar las posiciones de los productos destacados
        const destacadosMap = new Map();

        // Iterar sobre los IDs de productos destacados y agregar al mapa por su posición invertida
        destacados.forEach((id, index) => {
            destacadosMap.set(id, destacados.length - 1 - index);
        });

        // Ordenar productos según la lógica establecida
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
            const precioA = ((marcasUnicas.has(prodA.marca) && prodA.kg !== 0) ? (prodA.precio * prodA.kg) : (prodA.precio)) * prodA.cantidad;
            const precioB = ((marcasUnicas.has(prodB.marca) && prodB.kg !== 0) ? (prodB.precio * prodB.kg) : (prodB.precio)) * prodB.cantidad;

            const prodAOculto = preciosOcultos.includes(prodA.id);
            const prodBOculto = preciosOcultos.includes(prodB.id);

            if (precioA === 0 && (precioB !== 0 && !prodBOculto)) {
                return 1;
            }
            if (precioB === 0 && (precioA !== 0 && !prodAOculto)) {
                return -1;
            }

            if (prodAOculto && !prodBOculto) {
                return 1;
            }
            if (prodBOculto && !prodAOculto) {
                return -1;
            }

            return precioA - precioB;
        });
    };

    const ordenarPorPrecioDesc = (productos) => {
        return productos.sort((prodA, prodB) => {
            const precioA = ((marcasUnicas.has(prodA.marca) && prodA.kg !== 0) ? (prodA.precio * prodA.kg) : (prodA.precio)) * prodA.cantidad;
            const precioB = ((marcasUnicas.has(prodB.marca) && prodB.kg !== 0) ? (prodB.precio * prodB.kg) : (prodB.precio)) * prodB.cantidad;

            const prodAOculto = preciosOcultos.includes(prodA.id);
            const prodBOculto = preciosOcultos.includes(prodB.id);

            // Mover productos con precio 0 al final si el otro tiene un precio mayor a 0 y no está oculto
            if (precioA === 0 && (precioB !== 0 && !prodBOculto)) {
                return 1;
            }
            if (precioB === 0 && (precioA !== 0 && !prodAOculto)) {
                return -1;
            }

            // Mover productos ocultos al final si el otro no está oculto
            if (prodAOculto && !prodBOculto) {
                return 1;
            }
            if (prodBOculto && !prodAOculto) {
                return -1;
            }

            // Ordenar por precio de forma descendente
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

    const ordenarPorCodigoAsc = (productos) => {
        const nuevosProductos = productos.sort((prodA, prodB) => {

            const codigoA = (marcasUnicas.has(prodA.marca)) ? (prodA.cod_orig) : (prodA.cod_int);
            const codigoB = (marcasUnicas.has(prodB.marca)) ? (prodB.cod_orig) : (prodB.cod_int);

            if (codigoA < codigoB) {
                return -1;
            }
            if (codigoA > codigoB) {
                return 1;
            }
            return 0;
        });

        return nuevosProductos;
    }

    const ordenarPorCodigoDesc = (productos) => {
        return productos.sort((prodA, prodB) => {
            // Si prodA tiene peso 0 y prodB no, prodA va al final
            const detalleA = prodA.detalle;
            const detalleB = prodB.detalle;
            // En cualquier otro caso, ordenar normalmente por peso descendente
            if (detalleB > detalleA) {
                return -1;
            }
            if (detalleB < detalleA) {
                return 1;
            }
            return 0;
        });
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
            case 'codigoAsc':
                return ordenarPorCodigoAsc(productos);
            case 'codigoDesc':
                return ordenarPorCodigoDesc(productos);
            case 'destacados':
                return ordenarPorDestacados(productos, productosDestacados);
            default:
                return productos;
        }
    }

    const extraerMetrosCuadrados = (cadena) => {
        const regex = /\b(\d+)[Xx](\d+)[Xx]\d+(?:mm|MM)?\b/;

        const resultado = cadena.match(regex);

        if (resultado) {
            const primerNumero = parseInt(resultado[1], 10);
            const segundoNumero = parseInt(resultado[2], 10);

            return primerNumero / 1000 * segundoNumero / 1000;
        }

        return null;
    }

    const extraerEspesor = (cadena) => {
        // Ajustamos la regex para capturar el tercer número
        const regex = /\b\d+[Xx]\d+[Xx](\d+)(?:mm|MM)?\b/;

        const resultado = cadena.match(regex);

        if (resultado) {
            // El tercer número está en el grupo de captura 1
            return parseInt(resultado[1], 10);
        }

        return null;
    };

    const obtenerMarcas = async () => {
        const response = await fetch(`${backend}/marcas/get`);
        if (response.ok) {
            const marcasResponse = await response.json();
            setMarcas(marcasResponse);

            let marcasSet = new Set();

            marcasResponse.forEach(marca => marca.items.forEach(item => marcasSet.add(item)));

            setMarcasUnicas(marcasSet);
        }
    }

    useEffect(() => {
        obtenerMarcas();
        obtenerOfertas();
    }, [])

    const obtenerOfertas = async () => {
        const response = await fetch(`${backend}/ofertas/get`);

        if (response.ok) {
            const asResponse = await response.json();

            setOfertas(asResponse);
        }
    }

    const ofertarProducto = async (idProducto, descuento) => {

        const Oferta = {
            idProducto: idProducto,
            descuento: descuento,
        };

        try {
            const response = await fetch(`${backend}/ofertas/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': obtenerToken(),
                },
                body: JSON.stringify(Oferta),
            });

            if (response.ok) {
                setOfertas((prevOfertas) => [
                    ...prevOfertas.filter((o) => o.idProducto !== idProducto),
                    Oferta,
                ]);
            }
        } catch (error) {
            console.error('Error al ofertar producto:', error);
        }
    };

    const eliminarOferta = async (idProducto) => {
        setOfertas(ofertas.filter(o => o.idProducto != idProducto))

        const response = await fetch(`${backend}/ofertas/postEliminar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': obtenerToken(),
            },
            body: JSON.stringify(idProducto),
        });
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
            procesos,
            troquelados,
            extraerMetrosCuadrados,
            marcas,
            marcasUnicas,
            ocultarPrecio,
            preciosOcultos,
            productosDeProcesosEliminados,
            ofertas,
            setOfertas,
            ofertarProducto,
            eliminarOferta,
            extraerEspesor
        }}>
            {children}
        </ProductosContext.Provider>
    );
}

export { ProductosContext, useProductos, ProductosProvider };
