import './productoHistorial.css';
import { useProductos } from '../../contextProductos';
import { useEffect, useState } from 'react';
import { marcasUnicasPerfiles } from '../../rubros';

export default function ProductoHistorial(args) {

    const { productosIndexado } = useProductos();

    const { procesos } = useProductos();

    const producto = productosIndexado[args.id];

    const [cod_orig, setCod_orig] = useState("CA");
    const [detalle, setDetalle] = useState("detalle");
    const [color, setColor] = useState("color");
    const [kg, setKg] = useState('kg');

    useEffect(() => {
        if (producto && producto.cod_orig && producto.detalle) {
            setCod_orig(producto.cod_orig);
            setDetalle(producto.detalle);
            setColor(producto.color.toUpperCase())
            setKg(producto.kg);
        }
        else {
            setCod_orig("");
            setDetalle("PRODUCTO ELIMINADO");
            setColor("");
            setKg("");
        }
    }, [producto]);

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    let colorCorregido = '';
    if (producto) {
        colorCorregido = (producto.color).replace(/\s+/g, '-');

        if (args.proceso && procesos[args.proceso] && procesos[args.proceso].rubro == 88) {
            colorCorregido = (procesos[args.proceso].color).replace(/\s+/g, '-');
        }
    }

    let codigo;
    marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil) ? (codigo = producto.cod_orig) : (codigo = producto.cod_int);

    const precioParaMostrarInt = parseInt(args.precio * args.cantidad * ((producto && producto.rubro != 85) ? ((kg * producto.cantidad) || (1 * producto.cantidad)) : (1 * producto.cantidad)));

    const precioParaMostrarString = precioParaMostrarInt ? (precioParaMostrarInt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
    const precioParaMostrarStringCant = precioParaMostrarInt ? (precioParaMostrarInt * args.cantidad).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

    return (
        <div className="contenedorPrincipalProductoHistorial">
            <div className="imagenProductoHistorialContainer">
                <img
                    src={marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil) ?
                        (`/ImagenesPerfiles/${codigo.slice(2).trim()}.webp`)
                        :
                        (producto.tipo_prod == 'ACCESORIO' ?
                            (`/ImagenesAccesorios/${codigo.trim().toUpperCase()}.webp`)
                            :
                            (producto.tipo_prod == 'PUNTUAL' ?
                                (`/ImagenesPuntuales/${codigo.trim().toUpperCase()}.webp`)
                                :
                                (producto.tipo_prod == 'MAQUINAS' ?
                                    (`/ImagenesMaquinas/${codigo.trim().toUpperCase()}.webp`)
                                    :
                                    ('')
                                )
                            )
                        )
                    }
                    onContextMenu={handleContextMenu} />
                <p>
                    <span className="cod_origProductoHistorial">{cod_orig}</span> - {detalle && detalle} {args.acabado && procesos[args.acabado] ? (' - ' + procesos[args.acabado].detalle) : ''}
                </p>
            </div>
            <div className="informacionProductoHistorialContainer">
                {(color && color !== 'IND') && (
                    <p style={{ backgroundColor: `var(--${colorCorregido})` }}>
                        {args.proceso && procesos[args.proceso] && procesos[args.proceso].rubro === 88
                            ? 'ANODIZADO: ' + (procesos[args.proceso].color ? procesos[args.proceso].color.toUpperCase() : '')
                            : 'COLOR: ' + color
                        }
                    </p>
                )}

                <p>CANTIDAD: {args.cantidad}</p>
                <p>
                    PRECIO: ${precioParaMostrarStringCant}<br />
                    ({args.cantidad} x ${precioParaMostrarString})
                </p>
            </div>
        </div>
    );
}