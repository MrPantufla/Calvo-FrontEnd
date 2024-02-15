import './productoHistorial.css';
import perfil1 from '../../Imagenes/perfil1.png';
import { useProductos } from '../../contextProductos';
import { useEffect, useState } from 'react';

export default function ProductoHistorial(args){

    const {productosIndexado} = useProductos();
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
                <p>PRECIO: ${parseInt(args.precio*args.cantidad*(kg || 1))} ({args.cantidad} x ${parseInt(args.precio*(kg || 1))})</p>
            </div>
        </div>
    );
}