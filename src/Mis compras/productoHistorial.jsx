import './productoHistorial.css';
import perfil from '../Imagenes/perfil.jpg';
import { useProductos } from '../contextProductos';
import { useEffect, useState } from 'react';

export default function ProductoHistorial(args){

    const productos = useProductos();
    const producto = productos.productosIndexado[args.id];
    const [cod_orig, setCod_orig] = useState("CA");
    const [detalle, setDetalle] = useState("detalle");

    useEffect(() => {
        if (producto && producto.cod_orig && producto.detalle) {
            setCod_orig(producto.cod_orig);
            setDetalle(producto.detalle);
        }
    }, [producto]);

    return(
        <div className="contenedorPrincipalProductoHistorial">
            <div className="imagenProductoHistorialContainer">
                <img src={perfil}/>
            </div>
            <div className="informacionProductoHistorialContainer">
                <h2>{cod_orig} - {detalle}</h2>
                <h2>Cantidad: {args.cantidad}</h2>
                <h2>Total: ${args.precio*args.cantidad} ({args.cantidad} x ${args.precio})</h2>
            </div>
        </div>
    );
}