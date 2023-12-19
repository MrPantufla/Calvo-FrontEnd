import './cardCarrito.css';
import perfil from '../../Imagenes/perfil.jpg';
import { useCarrito } from '../../contextCarrito.jsx'
import { useProductos } from '../../contextProductos.jsx';

export default function CardCarrito(args){
    const carrito = useCarrito();
    const producto = useProductos().productosIndexado[args.id];

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

    return(
        <div className="contenedorPrincipalCardCarrito">
            <div className="imagenYCodigoCardCarrito">
                <img className="imagenCardCarrito" src={perfil} />
                <p className="codigo">{producto.cod_orig}</p>
            </div>
            <div className="textoCardCarrito">
                <p>{producto.detalle}</p>
                <p>Total: ${producto.precio*args.cantidad} ({args.cantidad} x ${producto.precio})</p>
                <div className="cantidad">
                    <button className="boton" onClick={handleRestarCantidad}>-</button>
                    <p>Cant: {args.cantidad}</p>
                    <button className="boton" onClick={handleSumarCantidad}>+</button>
                    <p className="eliminar" onClick={handleEliminar}>Eliminar</p>
                </div>
            </div>
        </div>
    );
}