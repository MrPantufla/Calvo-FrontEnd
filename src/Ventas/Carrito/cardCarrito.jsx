import './cardCarrito.css';
import { useCarrito } from '../../contextCarrito.jsx'
import { useProductos } from '../../contextProductos.jsx';
import { useTienda } from '../../contextTienda.jsx';
import { marcasUnicasPerfiles } from '../../rubros.js';

export default function CardCarrito(args) {
    const {
        añadirElemento,
        restarElemento,
        eliminarElemento,
        extraerProducto,
        extraerTroquelado,
        extraerProceso,
        extraerAcabado
    } = useCarrito();

    const {
        productosIndexado,
        troquelados,
        extraerMetrosCuadrados
    } = useProductos();

    const { setProductoSeleccionado } = useTienda();

    const {
        productosSueltos,
        procesos,
        ofertas
    } = useProductos();

    const idSinProceso = extraerProducto(args.id.toString());
    const idTroquelado = extraerTroquelado(args.id.toString());
    const idProceso = extraerProceso(args.id.toString());
    const idAcabado = extraerAcabado(args.id.toString());

    let producto;

    producto = productosIndexado[idSinProceso];
    if (!producto) {
        producto = productosSueltos[idSinProceso];
    }

    let colorCorregido;
    let colorParaUsar;

    let proceso = procesos[idProceso];
    let acabado = procesos[idAcabado];
    let troquelado = troquelados[idTroquelado]

    if (proceso) {
        if (productosIndexado[producto.id].kg <= 1.8) {
            const procesoLiviano = Object.values(procesos).find(p => (p.cod_orig.slice(-2) == 'LL' && p.cod_orig.slice(0, -3) == proceso.cod_orig));

            if (procesoLiviano) {
                proceso = procesoLiviano;
            }
        }
    }

    if (proceso && proceso.color && proceso.color != 'Ind') {
        colorCorregido = (proceso.color).replace(/\s+/g, '-');
        colorParaUsar = proceso.color;
    }
    else {
        colorCorregido = (producto.color).replace(/\s+/g, '-');
        colorParaUsar = producto.color;
    }

    let codigo;
    marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil) ? (codigo = producto.cod_orig) : (codigo = producto.cod_int);

    let usarBlanco;

    if (!proceso) {
        usarBlanco = (producto.color == 'Negro' ||
            producto.color == 'Azul' ||
            producto.color == 'Marron osc' ||
            producto.color == 'Bronce osc' ||
            producto.color == 'Simil madera' ||
            producto.color == 'Platil' ||
            producto.color == 'Peltre' ||
            producto.color == 'Fume' ||
            producto.color == 'Rojo' ||
            producto.color == 'Gris azulado' ||
            producto.color == 'Bronce medio'
        )
    }
    else {
        usarBlanco = (proceso.color == 'Negro' ||
            proceso.color == 'Azul' ||
            proceso.color == 'Marron osc' ||
            proceso.color == 'Bronce osc' ||
            proceso.color == 'Simil madera' ||
            proceso.color == 'Platil' ||
            proceso.color == 'Peltre' ||
            proceso.color == 'Fume' ||
            proceso.color == 'Verde'
        )
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    let acabadoArreglado;

    if (acabado) {
        acabadoArreglado = acabado.detalle;
        if (acabadoArreglado.slice(-2) == 'M2') {
            acabadoArreglado = acabadoArreglado.slice(0, -3);
        }
    }

    const ofertaEncontrada = ofertas.find(o => o.idProducto == producto.id);

    const productoPrecioFinal = producto.precio - (ofertaEncontrada ? (ofertaEncontrada.descuento / 100 * producto.precio) : 0);

    const precioParaMostrarInt = parseInt(
        producto.rubro == 85 ?
            ((productoPrecioFinal * producto.cantidad + (proceso ? (proceso.precio * extraerMetrosCuadrados(producto.detalle)) : (0)) + (acabado ? (acabado.precio * extraerMetrosCuadrados(producto.detalle)) : 0)))
            :
            ((producto.kg > 0) ?
                (productoPrecioFinal * producto.cantidad * producto.kg +
                    (troquelado ? troquelado.precio : 0) +
                    (proceso ? proceso.precio * producto.kg : 0) +
                    (acabado ? acabado.precio * producto.kg : 0)
                )
                :
                (productoPrecioFinal * producto.cantidad)
            )
    );

    const precioParaMostrarString = precioParaMostrarInt ? (precioParaMostrarInt * args.cantidadCarrito).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
    const precioParaMostrarStringIndividual = precioParaMostrarInt ? (precioParaMostrarInt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

    let codigoImagen;

    let codigoAux;

    const esPerfil = marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil);

    esPerfil ? (codigoAux = producto.cod_orig) : (codigoAux = producto.cod_int);

    if(producto.referenciaPaquete){
        codigoImagen = esPerfil ? (producto.referenciaPaquete.cod_orig) : (producto.referenciaPaquete.cod_int);
    }
    else{
        codigoImagen = esPerfil ? (producto.cod_orig) : (producto.cod_int);
    }

    return (
        <div className="contenedorPrincipalCardCarrito">
            <div className="imagenYCodigoCardCarrito">
                <div className="imagenCardCarritoContainer">
                    <img
                        className="imagenCardCarrito"
                        onContextMenu={handleContextMenu}
                        src={marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil && codigoImagen) ?
                            (`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigoImagen.slice(2)}.webp`)
                            :
                            (`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigoImagen}.webp`)
                          }
                        alt="Imagen del producto"
                        loading="lazy"
                        onClick={() => setProductoSeleccionado(producto)}
                    />
                </div>
                <p className="kgCardCarrito">{producto.kg > 0 ? ('- ' + producto.kg + 'kg -') : ('')}</p>
                <div className="codigoYDetalleCardCarritoContainer">
                    <p className="codigoYDetalleCardCarrito"><span>{codigo}</span> - {`${producto.detalle} ${(acabado && acabado.id != 0) ? (' - ' + (acabadoArreglado)) : (``)}`} <span className="codOrig">{producto.cod_orig.slice(-2) == '-M' ? ("(" + producto.cantidad + " m.)") : (producto.cantidad > 1 && ("(" + producto.cantidad + " u.)"))}</span></p>
                </div>
            </div>
            <div className="restoCardCarrito">
                <div className="cantidadCardCarrito">
                    <button className="botonRestarCardCarrito" onClick={() => restarElemento(args.id)}>-</button>
                    <div>
                        <p>{args.cantidadCarrito}</p>
                    </div>
                    <button className="botonSumarCardCarrito" onClick={() => añadirElemento(args.id, 1)}>+</button>
                    <p className="eliminarCardCarrito" onClick={() => eliminarElemento(args.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </p>
                </div>
                <div className="colorCardCarritoContainer">
                    <>
                        <p className="textoColorCardCarrito">{`${(proceso && proceso.detalle.startsWith('ANODIZADO')) ? ('ANODIZADO') : ('COLOR')}`}</p>
                        <div className="muestraColorCardCarrito" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                            <p className="colorCardCarrito" style={usarBlanco ? { color: 'white' } : {}}>
                                {colorParaUsar == 'Ind' ? ('-') : (colorParaUsar.toUpperCase())}
                            </p>
                        </div>
                    </>
                </div>
                <div className="precioContainer">
                    <p className="textoPrecioCardCarrito">{producto.tipo_prod == 'PERFIL' ? ('PRECIO APROX.') : ('PRECIO')}</p>
                    <div className="precioProductoCardCarrito">
                        <p>
                            {`$${precioParaMostrarString}`}
                        </p>
                    </div>
                    <div className="precioUnitarioCardCarrito">
                        <p>({args.cantidadCarrito} x {`$${precioParaMostrarStringIndividual}`})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}