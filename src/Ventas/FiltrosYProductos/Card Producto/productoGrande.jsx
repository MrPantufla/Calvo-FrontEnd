import './productoGrande.css';
import ca from '../../../Imagenes/ca.png';
import { useCarrito } from '../../../contextCarrito.jsx';
import { useAuth } from '../../../contextLogin.jsx';
import { useTienda } from '../../../contextTienda.jsx';
import { useState } from 'react';

export default function ProductoGrande(args) {
    const [aptoParaCerrar, setAptoParaCerrar] = useState(false)

    const {
        state,
        setMostrarLogin
    } = useAuth();

    const { isMobile } = useTienda();

    const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
    const elementoExistente = elementosCarrito.find((elemento) => elemento.id === args.id);
    const cantidad = elementoExistente ? elementoExistente.cantidad : 0;
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
        if (state.userInfo.email_confirmado) {
            añadirElemento(args.id, 1);
        }
        else {
            setMostrarLogin(true);
        }
    }

    const restarContador = () => {
        if (state.userInfo.email_confirmado) {
            if (cantidad > 0) {
                restarElemento(args.id);
            }
        }
        else {
            setMostrarLogin(true);
        }
    }

    const handleClose = () => {
        if (aptoParaCerrar == true) {
            args.onClose();
        }
    };

    const handleParteUtilizableClick = (event) => {
        setAptoParaCerrar(false);
        event.stopPropagation();
    };

    return (
        <div className="contenedorPrincipalProductoGrande" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleClose}>
            <div className="parteUtilizableProductoGrande" onMouseDown={handleParteUtilizableClick} onMouseUp={handleParteUtilizableClick}>
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
                            //src={`/ImagenesProductos/${args.cod_int.toLowerCase()}.png`}
                            src={args.tipo_prod == 'PERFIL' ?
                                (`/PngsPerfiles/${args.cod_orig.slice(2).trim()}.png`)
                                :
                                (args.tipo_prod == 'ACCESORIO' ?
                                    (`/PngsAccesorios/${args.cod_int.trim().toUpperCase()}.png`)
                                    :
                                    (''))}
                            onError={(e) => {
                                //e.target.src = `/ImagenesProductos/${args.cod_int.toLowerCase()}.jpg`;
                                e.target.src = `PngsMaquinas/${args.cod_int.toUpperCase()}.png`

                                e.target.onerror = () => {
                                    //e.target.src = `/ImagenesProductos/xd.png`;
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
                                    <p className="valorKg">{args.kg}kg</p></>) : ('')}
                            </div>
                        </div>
                        <div className="conjuntoCantidad">
                            {!isMobile ? (<p className="textoCantidad">CANTIDAD EN EL CARRITO</p>) : (<></>)}
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