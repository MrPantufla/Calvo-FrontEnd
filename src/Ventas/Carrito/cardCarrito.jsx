import './cardCarrito.css';
import perfil from '../../Imagenes/perfil.jpg';
import { useCarrito } from '../../context.jsx'


export default function CardCarrito(args){
    const { restarElemento, actualizarCantidadElemento, eliminarElemento } = useCarrito();

    const handleRestarCantidad = () => {
        if (args.cantidad > 1) {
          actualizarCantidadElemento(args.codigo, args.cantidad - 1);
        } 
        else {
          restarElemento(args.codigo);
        }
    }

    const handleSumarCantidad = () => {
        actualizarCantidadElemento(args.codigo, args.cantidad + 1);
    }

    const handleEliminar = () => {
        eliminarElemento(args.codigo);
    }

    return(
        <div className="contenedorPrincipalCardCarrito">
            <div className="imagenYCodigoCardCarrito">
                <img className="imagenCardCarrito" src={perfil} />
                <p className="codigo">{args.codigo}</p>
            </div>
            <div className="textoCardCarrito">
                <p>{args.nombre}</p>
                <p>Total: ${args.precio*args.cantidad}</p>
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