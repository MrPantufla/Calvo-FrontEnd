import './cardCarrito.css';
import perfil from '../../Imagenes/perfil2.png';
import { useCarrito } from '../../contextCarrito.jsx'
import { useProductos } from '../../contextProductos.jsx';
import { useTienda } from '../../contextTienda.jsx';

export default function CardCarrito(args) {
    const carrito = useCarrito();
    const producto = useProductos().productosIndexado[args.id];
    const colorCorregido = (producto.color).replace(/\s+/g, '-');
    const tienda = useTienda();

    const usarBlanco = (producto.color == 'Negro' ||
        producto.color == 'Azul' ||
        producto.color == 'Marron oscuro' ||
        producto.color == 'Bronce oscuro' ||
        producto.color == 'Simil madera' ||
        producto.color == 'Platil' ||
        producto.color == 'Peltre' ||
        producto.color == 'Fume' ||
        producto.color == 'Verde'
    );

    const handleRestarCantidad = () => {
        if (args.cantidad > 1) {
            carrito.actualizarCantidadElemento(args.id, args.cantidad - 1);
        }
        else {
            carrito.restarElemento(args.id);
        }
    }

    const handleSumarCantidad = () => {
        carrito.actualizarCantidadElemento(args.id, args.cantidad + 1);
    }

    const handleEliminar = () => {
        carrito.eliminarElemento(args.id);
    }

    return (
        <div className="contenedorPrincipalCardCarrito">
            <div className="imagenYCodigoCardCarrito">
                <div className="imagenCardCarritoContainer">
                    <img
                        className="imagenCardCarrito"
                        src={`/ImagenesProductos/${producto.cod_int.toLowerCase()}.png`}
                        onError={(e) => {
                            e.target.src = `/ImagenesProductos/${producto.cod_int.toLowerCase()}.jpg`;

                            e.target.onerror = () => {
                                e.target.src = `/ImagenesProductos/xd.png`;
                            };
                        }}
                        alt="Imagen del producto"
                        loading="lazy"
                        onClick={()=> tienda.setProductoSeleccionado(producto)}
                    />
                </div>
                <p className="kgCardCarrito">{producto.kg > 0 ? ('- ' + producto.kg + 'kg -') : ('')}</p>
                <div className="codigoYDetalleCardCarritoContainer">
                    <p className="codigoYDetalleCardCarrito"><span>{producto.cod_orig}</span> - {producto.detalle}</p>
                </div>
            </div>
            <div className="restoCardCarrito">
                <div className="cantidadCardCarrito">
                    <button className="botonRestarCardCarrito" onClick={handleRestarCantidad}>-</button>
                    <div>
                        <p>{args.cantidad}</p>
                    </div>
                    <button className="botonSumarCardCarrito" onClick={handleSumarCantidad}>+</button>
                    <p className="eliminarCardCarrito" onClick={handleEliminar}><svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg></p>
                </div>
                <div className="colorCardCarritoContainer">
                    <>
                        <p className="textoColorCardCarrito">COLOR</p>
                        <div className="muestraColorCardCarrito" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                            <p className="colorCardCarrito" style={usarBlanco ? { color: 'white' } : {}}>
                                {producto.color == 'Ind' ? ('-') : (producto.color.toUpperCase())}
                            </p>
                        </div>
                    </>
                </div>
                <div className="precioContainer">
                    <p className="textoPrecioCardCarrito">{producto.tipo_prod == 'PERFIL' ? ('PRECIO APROX.') : ('PRECIO')}</p>
                    <div className="precioProductoCardCarrito">
                        <p>${parseInt(producto.precio * producto.kg * args.cantidad)}</p>
                    </div>
                    <div className="precioUnitarioCardCarrito">
                        <p>({args.cantidad} x ${parseInt(producto.precio * producto.kg)})</p>
                    </div>
                </div>
            </div>
        </div>
    );
}