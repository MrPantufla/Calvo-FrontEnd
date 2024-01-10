import './productoHistorial.css';
import perfil1 from '../../Imagenes/perfil1.png';
import { useProductos } from '../../contextProductos';
import { useEffect, useState } from 'react';

export default function ProductoHistorial(args){

    const productos = useProductos();
    const producto = productos.productosIndexado[args.id];
    const [cod_orig, setCod_orig] = useState("CA");
    const [detalle, setDetalle] = useState("detalle");
    const [color, setColor] = useState("color")

    useEffect(() => {
        if (producto && producto.cod_orig && producto.detalle) {
            setCod_orig(producto.cod_orig);
            setDetalle(producto.detalle);
            setColor(producto.color.toUpperCase())
        }
    }, [producto]);

    return(
        <div className="contenedorPrincipalProductoHistorial">
            <div className="imagenProductoHistorialContainer">
                <img src={perfil1}/>
                <p><span className="cod_origProductoHistorial">{cod_orig}</span> - {detalle}</p>
            </div>
            <div className="informacionProductoHistorialContainer">
                <p>COLOR: {color}</p>
                <p>CANTIDAD: {args.cantidad}</p>
                <p>PRECIO: ${args.precio*args.cantidad} ({args.cantidad} x ${args.precio})</p>
            </div>
        </div>
    );
}