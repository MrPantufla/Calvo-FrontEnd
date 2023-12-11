import './productoGrande.css';
import perfil1 from '../../Imagenes/perfil1.png';
import perfil2 from '../../Imagenes/perfil2.png';
import perfil3 from '../../Imagenes/perfil3.png';
import perfil4 from '../../Imagenes/perfil4.png';
import perfil5 from '../../Imagenes/perfil5.png';
import logoProductoGrande from '../../Imagenes/logoProductoGrande.png';
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
                <div className="logoProductoGrandeContainer">
                    <img className="logoProductoGrande" src={logoProductoGrande} />
                </div>
                <div className="parteInternaUtilizableProductoGrande">
                    <div className="productoGrandeContainer">
                        <div className="informacion">
                            <h1>{args.cod_orig}</h1>
                            <h2>{args.detalle}</h2>
                        </div>
                        <div className="imagenProductoGrandeContainer">
                            <img className="imagenProductoGrande" src={args.id % 5 == 0 ?
                                (perfil1)
                                :
                                (args.id % 5 == 1 ?
                                    (perfil2)
                                    :
                                    (args.id % 5 == 2 ?
                                        (perfil3)
                                        :
                                        (args.id % 5 == 3 ?
                                            (perfil4)
                                            :
                                            (perfil5))))} />
                        </div>
                        <p className="textoCantidad">CANTIDAD EN EL CARRITO</p>
                        <div className="cantidad">
                            <button className="botonProductoGrande" onClick={restarContador}>-</button>
                            <p className="cantidadProductoGrande">{cantidad}</p>
                            <button className="botonProductoGrande" onClick={sumarContador}>+</button>
                            <div className="coloresProductoGrande">
                                <div className="color natural" />
                                <div className="color blanco" />
                                <div className="color negro" />
                                <div className="color madera" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}