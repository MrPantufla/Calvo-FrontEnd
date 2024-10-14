import './productoHistorial.css';
import { useProductos } from '../../contextProductos';
import { useEffect, useState } from 'react';
import { marcasUnicasPerfiles } from '../../rubros';

export default function ProductoHistorial(args) {

    const {
        productosIndexado,
        productosSueltos
    } = useProductos();

    const { procesos } = useProductos();

    let producto = productosIndexado[args.id];
    if (!producto) {
        producto = productosSueltos[args.id];
    }

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
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    let colorParaUsar = color;

    let colorCorregido = '';
    if (producto) {
        colorCorregido = (producto.color).replace(/\s+/g, '-');

        if (args.proceso && procesos[args.proceso] && (procesos[args.proceso].rubro == 88 || procesos[args.proceso].rubro == 65 || procesos[args.proceso].rubro == 67 || procesos[args.proceso].rubro == 78 || procesos[args.proceso].rubro == 3 || procesos[args.proceso].rubro == 73 || procesos[args.proceso].rubro == 89)) {
            colorParaUsar = procesos[args.proceso].color.toUpperCase();
            colorCorregido = (procesos[args.proceso].color).replace(/\s+/g, '-');
        }
    }

    const usarBlanco = (colorParaUsar == 'NEGRO' ||
        colorParaUsar == 'AZUL' ||
        colorParaUsar == 'MARRON OSC' ||
        colorParaUsar == 'BRONCE OSC' ||
        colorParaUsar == 'SIMIL MADERA' ||
        colorParaUsar == 'PLATIL' ||
        colorParaUsar == 'PELTRE' ||
        colorParaUsar == 'FUME' ||
        colorParaUsar == 'ROJO' ||
        colorParaUsar == 'GRIS AZULADO' ||
        colorParaUsar == 'BRONCE MEDIO'
    );

    const precioParaMostrarInt = parseInt(args.precio * ((producto && marcasUnicasPerfiles.includes(producto.marca)) ? (kg) || (1) : (1)));

    const precioParaMostrarString = precioParaMostrarInt ? (precioParaMostrarInt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
    const precioParaMostrarStringCant = precioParaMostrarInt ? (precioParaMostrarInt * args.cantidad).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

    let codigoImagen;

    let codigo;

    const esPerfil = producto && marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil);

    (producto && producto.cod_int && producto.cod_orig && esPerfil) ? (codigo = producto.cod_orig) : (producto && (codigo = producto.cod_int));

    if (producto.referenciaPaquete) {
        codigoImagen = esPerfil ? (producto.referenciaPaquete.cod_orig) : (producto.referenciaPaquete.cod_int);
    }
    else {
        codigoImagen = esPerfil ? (producto.cod_orig) : (producto.cod_int);
    }

    return (
        <div className="contenedorPrincipalProductoHistorial">
            <div className="imagenProductoHistorialContainer">
                <img
                    src={marcasUnicasPerfiles.find(marcaPerfil => producto.marca == marcaPerfil && codigoImagen) ?
                        (`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigoImagen.slice(2)}.webp`)
                        :
                        (`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigoImagen}.webp`)
                      }
                    onContextMenu={handleContextMenu} />
                <p>
                    <span className="cod_origProductoHistorial">{cod_orig}</span> - {detalle && detalle} {args.acabado && procesos[args.acabado] ? (' - ' + procesos[args.acabado].detalle) : ''} {producto.cantidad > 1 ? (<span className="cod_origProductoHistorial">({producto.cantidad}u.)</span>) : ('')}
                </p>
            </div>
            <div className="informacionProductoHistorialContainer">
                {(color && color !== 'IND') && (
                    <p style={{ backgroundColor: `var(--${colorCorregido})`, color: usarBlanco ? ('white') : ('black') }}>
                        {args.proceso && procesos[args.proceso] && procesos[args.proceso].rubro === 88
                            ? 'ANODIZADO: ' + (procesos[args.proceso].color ? procesos[args.proceso].color.toUpperCase() : '')
                            : 'COLOR: ' + colorParaUsar
                        }
                    </p>
                )}

                <p>CANTIDAD: {args.cantidad}</p>
                <p>
                    {`PRECIO${esPerfil ? ' APROXIMADO' : ''}: $${precioParaMostrarStringCant}`}<br />
                    ({args.cantidad} x ${precioParaMostrarString})
                </p>
            </div>
        </div>
    );
}