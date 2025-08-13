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

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    let colorParaUsar = producto.color.toUpperCase();

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
        colorParaUsar == 'BRONCE MEDIO' ||
        colorParaUsar == 'BRONCE'
    );

    const precio = args.precio * ((producto && marcasUnicasPerfiles.includes(producto.marca)) ? (producto.kg) || (1) : (1)) + args.precioTroquelado;
    const precioIntFinal = Math.round(precio - precio / 100 * (args.descuento || 0));

    const precioParaMostrarString = precioIntFinal ? (precioIntFinal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
    const precioParaMostrarStringCant = precioIntFinal ? (precioIntFinal * args.cantidad).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

    let codigoImagen;

    let codigo;

    const esPerfil = producto && marcasUnicasPerfiles.some(marcaPerfil => producto.marca == marcaPerfil);

    codigo = esPerfil ? (producto.cod_orig && producto.cod_orig) : (producto.cod_int && producto.cod_int)

    if (producto && producto.referenciaPaquete) {
        codigoImagen = esPerfil ? (producto.referenciaPaquete.cod_orig) : (producto.referenciaPaquete.cod_int);
    }
    else {
        codigoImagen = (producto && esPerfil) ? (producto.cod_orig) : (producto.cod_int);
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
                    onContextMenu={handleContextMenu}
                    loading='lazy'
                />
                <p>
                    <span className="cod_origProductoHistorial">{codigo}</span> - {producto.detalle || 'PRODUCTO ELIMINADO'} {args.acabado && procesos[args.acabado] ? (' - ' + procesos[args.acabado].detalle) : ''} <span className="codOrig">{producto.cod_orig.slice(-2) == '-M' ? ("(" + producto.cantidad + " m.)") : (producto.cantidad > 1 && ("(" + producto.cantidad + " u.)"))}</span>
                </p>
            </div>
            <div className="informacionProductoHistorialContainer">
                {(producto.color && producto.color !== 'IND') && (
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