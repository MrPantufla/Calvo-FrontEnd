import './productoGrande.css';
import perfil1 from '../../../Imagenes/perfil1.png';
import perfil2 from '../../../Imagenes/perfil2.png';
import perfil3 from '../../../Imagenes/perfil3.png';
import perfil4 from '../../../Imagenes/perfil4.png';
import perfil5 from '../../../Imagenes/perfil5.png';
import ca from '../../../Imagenes/ca.png';
import { useCarrito } from '../../../contextCarrito.jsx';
import { useAuth } from '../../../contextLogin.jsx';

export default function ProductoGrande(args) {
    const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
    const elementoExistente = elementosCarrito.find((elemento) => elemento.id === args.id);
    const cantidad = elementoExistente ? elementoExistente.cantidad : 0;
    const auth = useAuth();
    const colorCorregido = (args.color).replace(/\s+/g, '-');

    const usarBlanco = (args.color == 'Negro' ||
        args.color == 'Azul' ||
        args.color == 'Marron oscuro' ||
        args.color == 'Bronce oscuro' ||
        args.color == 'Simil madera' ||
        args.color == 'Platil' ||
        args.color == 'Peltre' ||
        args.color == 'Fume'
    );

    const sumarContador = () => {
        if (auth.state.userInfo.email_confirmado) {
            añadirElemento(args.id, 1);
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
                    <img className="logoProductoGrande" src={ca} />
                </div>
                <div className="parteInternaUtilizableProductoGrande">
                    <div className="informacion">
                        <h1>{args.cod_orig}</h1>
                        <h2>{args.detalle}</h2>
                    </div>
                    <div className="imagenProductoGrandeContainer">
                        <img
                            className="imagenProductoGrande"
                            src={`/ImagenesProductos/${args.cod_int.toLowerCase()}.png`}
                            onError={(e) => {
                                e.target.src = `/ImagenesProductos/${args.cod_int.toLowerCase()}.jpg`;

                                e.target.onerror = () => {
                                    e.target.src = `/ImagenesProductos/xd.png`;
                                };
                            }}
                            alt="Imagen del producto"
                            loading="lazy"
                        />
                    </div>
                    <div className="kgCantidadColorContainer">
                        <div className="kgProductoGrandeContainer">
                            <div className="textoPesoPromedio">
                                {args.kg > 0 ? (<><p>PESO PROMEDIO</p>
                                    <p>{args.kg}kg</p></>) : ('')}
                            </div>
                        </div>
                        <div className="conjuntoCantidad">
                            <p className="textoCantidad">CANTIDAD EN EL CARRITO</p>
                            <div className="cantidad">
                                <button className="botonProductoGrande" onClick={restarContador}>-</button>
                                <p className="cantidadProductoGrande">{cantidad}</p>
                                <button className="botonProductoGrande" onClick={sumarContador}>+</button>
                            </div>
                        </div>
                        <div className="colorProductoGrandeContainer">
                            {args.color == "Ind" ? (<></>) : (<><p className="textoColorProductoGrande">COLOR </p>
                                <div className="muestraColorProductoGrande" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                                    <p className="colorAtributo" style={usarBlanco ? { color: 'white' } : {}}>
                                        {args.color.toUpperCase()}
                                    </p>
                                </div></>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}