import './productoGrande.css';
import perfil from '../../Imagenes/perfil.jpg';
import { useCarrito } from '../../contextCarrito.jsx';
import { useAuth } from '../../contextLogin.jsx';

export default function ProductoGrande(args) {
    const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
    const elementoExistente = elementosCarrito.find((elemento) => elemento.id === args.id);
    const cantidad = elementoExistente ? elementoExistente.cantidad : 0;
    const auth = useAuth();

    const sumarContador = () => {
        if (auth.state.userInfo.email_confirmado) {
            añadirElemento(args.id, args.cod_orig, args.detalle, 1, args.precio);
        }
        else {
            auth.setMostrarLogin(true);
        }
    }

    const restarContador = () => {
        if (auth.state.userInfo.email_confirmado) {
            if (cantidad > 0) {
                restarElemento(args.id);
            }
        }
        else {
            auth.setMostrarLogin(true);
        }
    }

    const handleClose = () => {
        args.onClose();
    };

    const handleParteUtilizableClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="contenedorPrincipalProductoGrande" onClick={handleClose}>
            <div className="parteUtilizableProductoGrande" onClick={handleParteUtilizableClick}>
                <div className="botonCerrarContainer">
                    <button className="botonCerrarProductoGrande" onClick={handleClose}>
                        X
                    </button>
                </div>
                <div className="productoGrandeContainer">
                    <div className="informacion">
                        <h1>{args.cod_orig}</h1>
                        <h2>{args.detalle}</h2>
                        <p>asdmhasfdhasfdhasgdv</p>
                        <p>${args.precio}</p>
                    </div>
                    <img className="imagenProductoGrande" src={perfil} />
                    <p className="textoCantidad">Cantidad en el carrito</p>
                    <div className="cantidad">
                        <button className="boton" onClick={restarContador}>-</button>
                        <span>{cantidad}</span>
                        <button className="boton" onClick={sumarContador}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}