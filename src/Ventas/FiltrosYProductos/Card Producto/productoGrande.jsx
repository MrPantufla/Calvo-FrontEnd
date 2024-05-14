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

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    return (
        <div className="contenedorPrincipalProductoGrande" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleClose}>
            <div className="parteUtilizableProductoGrande" onMouseDown={handleParteUtilizableClick} onMouseUp={handleParteUtilizableClick}>
                <div className="logoProductoGrandeContainer">
                    <img className="logoProductoGrande" src={ca} />
                </div>

                <div className="parteInternaUtilizableProductoGrande">
                    {!isMobile &&
                        <button className="anteriorProductoGrande" onClick={args.anterior}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="white" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                            </svg>
                        </button>
                    }

                    <div className="informacion">
                        <h1>{args.cod_orig}</h1>
                        <h2>{args.detalle}</h2>
                    </div>

                    <div className="imagenProductoGrandeContainer">
                        <img
                            className="imagenProductoGrande"
                            onContextMenu={handleContextMenu}
                            src={args.tipo_prod == 'PERFIL' ?
                                (`/PngsPerfiles/${args.cod_orig.slice(2).trim()}.png`)
                                :
                                (args.tipo_prod == 'ACCESORIO' ?
                                    (`/PngsAccesorios/${args.cod_int.trim().toUpperCase()}.png`)
                                    :
                                    (args.tipo_prod == 'PUNTUAL' ?
                                        (`/PngsPuntuales/${args.cod_int.trim().toUpperCase()}.png`)
                                        :
                                        (args.tipo_prod == 'MAQUINAS' ?
                                            (`/PngsMaquinas/${args.cod_int.trim().toUpperCase()}.png`)
                                            :
                                            ('')
                                        )
                                    )
                                )
                            }
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

                        {args.tipo_prod != 'MAQUINAS' ?
                            (<div className="conjuntoCantidad">
                                {!isMobile ? (<p className="textoCantidad">CANTIDAD EN EL CARRITO</p>) : (<></>)}
                                <div className="cantidad">
                                    <button className="botonProductoGrande" onClick={restarContador}>-</button>
                                    <p className="cantidadProductoGrande">{cantidad}</p>
                                    <button className="botonProductoGrande" onClick={sumarContador}>+</button>
                                </div>
                            </div>)
                            :
                            (<a
                                className="botonConsultarMaquina consultarMaquinaGrande"
                                target="blank"
                                href={isMobile ?
                                    (`https://wa.me/5493456475294?text=Consulta%20sobre%20${args.cod_orig}%20-%20${args.detalle}:%20`)
                                    :
                                    (`https://web.whatsapp.com/send?phone=+5493456475294&text=Consulta%20sobre%20${args.cod_orig}%20-%20${args.detalle}:%20`)
                                }
                            >
                                CONSULTAR
                            </a>)
                        }

                        <div className="colorProductoGrandeContainer">
                            {args.color == "Ind" ? (<></>) : (<><p className="textoColorProductoGrande">COLOR </p>
                                <div className="muestraColorProductoGrande" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                                    <p className="colorAtributo" style={usarBlanco ? { color: 'white' } : {}}>
                                        {args.color.toUpperCase()}
                                    </p>
                                </div></>)}
                        </div>
                    </div>

                    {!isMobile &&
                        <button className="siguienteProductoGrande" onClick={args.siguiente}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="white" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                                <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                            </svg>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}