import './productoGrande.css';
import ca from '../../../Imagenes/ca.webp';
import { useCarrito } from '../../../contextCarrito.jsx';
import { useAuth } from '../../../contextLogin.jsx';
import { useTienda } from '../../../contextTienda.jsx';
import { useState } from 'react';
import { marcasUnicasPerfiles } from '../../../rubros.js';

export default function ProductoGrande(args) {

    const {
        id = { id },
        cod_orig = { cod_orig },
        tipo_prod = { tipo_prod },
        srubro = { srubro },
        detalle = { detalle },
        precio = { precio },
        marca = { marca },
        rubro = { rubro },
        color = { color },
        kg = { kg },
        cod_int = { cod_int },
        pesos = { pesos },
        dolar = { dolar },
        referencia = { referencia },
        cantidad = { cantidad },
    } = args.producto;

    const [aptoParaCerrar, setAptoParaCerrar] = useState(false)

    const {
        state,
        setMostrarLogin
    } = useAuth();

    const { isMobile } = useTienda();

    const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
    const elementoExistente = elementosCarrito.find((elemento) => elemento.id === id);
    const cantidadCarrito = elementoExistente ? elementoExistente.cantidadCarrito : 0;
    const colorCorregido = (color).replace(/\s+/g, '-');
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(null);

    let codigo;
    marcasUnicasPerfiles.find(marcaPerfil => marca == marcaPerfil) ? (codigo = cod_orig) : (codigo = cod_int);

    const usarBlanco = (color == 'Negro' ||
        color == 'Azul' ||
        color == 'Marron oscuro' ||
        color == 'Bronce oscuro' ||
        color == 'Simil madera' ||
        color == 'Platil' ||
        color == 'Peltre' ||
        color == 'Fume'
    );

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

    const imagenStyle = (kg <= 0 && color === 'Ind') ? { height: '35rem' } : {};

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
                        <h1>{codigo}</h1>
                        {referencia ?
                            (<h2>{detalle} <span className="codOrig">{`${cantidadSeleccionada ? ('(' + cantidadSeleccionada + 'u.)') : ('')}`}</span></h2>)
                            :
                            (<h2>{detalle} <span className="codOrig">{`${cantidad > 1 ? ('(' + cantidad + 'u.)') : ('')}`}</span></h2>)
                        }
                    </div>

                    <div className="imagenProductoGrandeContainer" style={imagenStyle}>
                        <img
                            className="imagenProductoGrande"
                            onContextMenu={handleContextMenu}
                            src={marcasUnicasPerfiles.find(marcaPerfil => marca == marcaPerfil) ?
                                (`/ImagenesPerfiles/${codigo.slice(2).trim()}.webp`)
                                :
                                (tipo_prod == 'ACCESORIO' ?
                                    (`/ImagenesAccesorios/${codigo.trim().toUpperCase()}.webp`)
                                    :
                                    (tipo_prod == 'PUNTUAL' ?
                                        (`/ImagenesPuntuales/${codigo.trim().toUpperCase()}.webp`)
                                        :
                                        (tipo_prod == 'MAQUINAS' ?
                                            (`/ImagenesMaquinas/${codigo.trim().toUpperCase()}.webp`)
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
                        {kg > 0 &&
                            <div className="kgProductoGrandeContainer">
                                <div className="textoPesoPromedio">
                                    <p>PESO PROMEDIO</p>
                                    <p className="valorKg">{kg}kg</p>
                                </div>

                            </div>
                        }

                        <div className="colorProductoGrandeContainer">
                            {color == "Ind" ? (<></>) : (<><p className="textoColorProductoGrande">COLOR </p>
                                <div className="muestraColorProductoGrande" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                                    <p className="colorAtributo" style={usarBlanco ? { color: 'white' } : {}}>
                                        {color.toUpperCase()}
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