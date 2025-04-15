import './cardMisCompras.css';
import { useState, useEffect, useInsertionEffect } from 'react';
import ProductoHistorial from '../Producto Historial/productoHistorial';
import { useProductos } from '../../contextProductos';
import { useCarrito } from '../../contextCarrito';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextLogin';
import { useTienda } from '../../contextTienda';

export default function CardMisCompras(args) {
    const [cardComprasAbierto, setCardComprasAbierto] = useState(false);

    const {
        productosIndexado,
        productosSueltos,
        marcasUnicas,
        procesos
    } = useProductos();

    const {
        isMobile
    } = useTienda();

    const {
        setCarritoAbierto,
        añadirElemento,
        limpiarCarrito
    } = useCarrito();

    const { state } = useAuth();

    const navigate = useNavigate();

    const toggleCardCompras = () => {
        setCardComprasAbierto(!cardComprasAbierto);
    }

    const total = (conDescuento) => {
        return args.data.reduce((accumulator, currentItem) => {
            let producto = productosIndexado[currentItem.producto];

            if (!producto) {
                producto = productosSueltos[currentItem.producto]
            }

            let precioProvisional = 0;

            if (conDescuento && !(producto && producto.tipo_prod === 'PERFIL' && (producto.cod_orig.endsWith('E') || producto.cod_orig.endsWith('ES')))) {
                precioProvisional = ((currentItem.p_vta * currentItem.cantidad * ((producto && producto.rubro != 85) ? (producto.kg || 1) : 1) + currentItem.precioTroquelado) * 97 / 100);
            } else {
                precioProvisional = (currentItem.p_vta * currentItem.cantidad * ((producto && producto.rubro != 85) ? (producto.kg || 1) : 1)  + currentItem.precioTroquelado);
            }

            if (producto) {
                return accumulator + (precioProvisional - (precioProvisional / 100 * (currentItem.descuento || 0)));
            } else {
                return accumulator + ((currentItem.p_vta * currentItem.cantidad) - ((currentItem.p_vta * currentItem.cantidad) / 100 * (currentItem.descuento || 0)));
            }
        }, 0);
    }

    const repetirCompra = () => {
        limpiarCarrito();

        Array.from({ length: args.data.length }).map((_, index) => {

            let producto = productosIndexado[args.data[index].producto];

            if (!producto) {
                producto = productosSueltos[args.data[index].producto];
            }

            if (producto && typeof producto === 'object' && producto !== null) {
                if (args.data[index].proceso) {
                    añadirElemento(`${producto.id}${args.data[index].troquelado ? (`-${args.data[index].troquelado}`) : ''}(${args.data[index].proceso}(${args.data[index].acabado || 0}))`, args.data[index].cantidad)
                }
                else {
                    añadirElemento(producto.id, args.data[index].cantidad);
                }
            }

            return null;
        });
        navigate('/tienda');
        setCarritoAbierto(true);
    };

    const fechaString = args.data[0] ? args.data[0].fecha : 'NaN';
    const partesFecha = fechaString.split('/');
    const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    useEffect(() => {
        setCardComprasAbierto(false);
    }, [args.id])

    const precioParaMostrarString = Math.round((total(false))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const precioParaMostrarStringDescuento = Math.round((total(true))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const hayPerfil = args.data.some(producto => {
        const productoIndexado = productosIndexado[producto.producto];

        if (!productoIndexado) {
            return false;
        }

        const marcaProducto = productoIndexado.marca;
        const marcaEnSet = marcasUnicas.has(marcaProducto);

        return marcaEnSet;
    });

    let objetoCSV = [];

    args.data.forEach((item) => {

        let producto = null;

        if (productosIndexado[item.producto]) {
            producto = productosIndexado[item.producto];
        } else if (productosSueltos[item.producto]) {
            producto = productosSueltos[item.producto];
        }

        if (producto != null) {

            objetoCSV.push(
                {
                    Código: (marcasUnicas.has(producto.marca) ? (producto.cod_orig) : (producto.cod_int)),
                    Detalle: producto.detalle + (item.acabado != 0 ? (' - ' + procesos[item.acabado].detalle) : ''),
                    Color: (item.proceso == 0 ? producto.color : (procesos[item.proceso].rubro == 88 ? (`Anodizado ${procesos[item.proceso].color}`) : (procesos[item.proceso].color))),
                    Cantidad: item.cantidad
                }
            );
        }
    });

    function generarCSV(datos) {
        // Agregar la columna "Fecha" al final de cada fila, pero solo llenar la primera fila
        const encabezados = [...Object.keys(datos[0]), "Fecha"].join(";");

        const filas = datos.map((fila, index) => {
            const valores = Object.values(fila).map(valor => `"${valor}"`);
            // Solo la primera fila tiene la fecha; las demás filas tienen una celda vacía
            if (index === 0) {
                valores.push(`"${fechaFormateada}"`);
            } else {
                valores.push('""');
            }
            return valores.join(";");
        });

        // Combinar encabezados y filas
        return [encabezados, ...filas].join("\n");
    }


    const descargarArchivo = (nombreArchivo, contenido) => {
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + contenido], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nombreArchivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="contenedorPrincipalCardMisCompras" >
            <div className="headCardMisCompras">
                <div className="fechaCardMisComprasContainer">
                    <h1 className="fechaCardMisCompras">{fechaFormateada}</h1>
                </div>
                <div className="cantidadYBotonesContainer">
                    <div className="cantidadYPoliginosContainer">
                        <div className="poligono poligonoMisCompras" />
                        <h1>
                            {args.data.length}

                            {args.data.length === 1 ? ' PRODUCTO' : ' PRODUCTOS'}
                        </h1>
                    </div>
                    <div className="botonesContainer">
                        <button className={`botonCollapseCardCompras ${cardComprasAbierto ? 'open' : ''}`} onClick={toggleCardCompras}>
                            VER COMPRA
                        </button>
                        <button className="botonRepetirCompra" onClick={repetirCompra} >
                            VOLVER A COMPRAR
                        </button>
                    </div>
                </div>
            </div>
            <div className={`bodyCardMisCompras ${cardComprasAbierto == true && 'open'}`}>
                <div className="productosHistorialContainer">
                    {Array.from({ length: args.data.length }).map((_, index) => {
                        const producto = args.data[index];
                        return (
                            <ProductoHistorial
                                key={index}
                                id={producto.producto}
                                cantidad={producto.cantidad}
                                precio={producto.p_vta}
                                proceso={producto.proceso}
                                precioTroquelado={producto.precioTroquelado || 0}
                                acabado={producto.acabado}
                                descuento={producto.descuento || 0}
                            />
                        );
                    })}
                </div>
                <button onClick={() => descargarArchivo(`pedidoCalvo${fechaFormateada}.csv`, generarCSV(objetoCSV))}>
                    Descargar pedido <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                        <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                    </svg>
                </button>
                <div className="totalContainer">
                    <h2 className="precioViejo">
                        {`TOTAL${hayPerfil ? ' APROXIMADO' : ''}: $${precioParaMostrarString} `}
                        {(state.userInfo && state.userInfo.categoria == 'MAYORISTA') && (
                            <>
                                {isMobile && <br />}
                                {`${!isMobile ? '- ' : ''}CON PAGO AL CONTADO Y SIN SALDO: $${precioParaMostrarStringDescuento}`}
                            </>
                        )}
                    </h2>
                </div>
            </div>
        </div>
    );
}