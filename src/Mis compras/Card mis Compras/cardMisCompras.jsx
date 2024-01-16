import './cardMisCompras.css';
import { useState, useEffect } from 'react';
import ProductoHistorial from '../Producto Historial/productoHistorial';
import { useProductos } from '../../contextProductos';
import { useCarrito } from '../../contextCarrito';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


export default function CardMisCompras(args) {
    const arrayProductos = args.data.productos.split(' ').map((str) => parseInt(str, 10));
    const arrayCantidades = args.data.cantidades.split(' ').map((str) => parseInt(str, 10));
    const arrayPrecios = args.data.precios.split(' ').map((str) => parseInt(str, 10));
    const [cardComprasAbierto, setCardComprasAbierto] = useState(false);
    const productos = useProductos();
    const carrito = useCarrito();
    const navigate = useNavigate();

    const toggleCardCompras = () => {
        setCardComprasAbierto(!cardComprasAbierto);
    }

    const total = arrayProductos.reduce((accumulator, _, index) => {
        if (productos.productosIndexado[arrayProductos[index]]) {
            return parseInt(accumulator + arrayCantidades[index] * arrayPrecios[index] * (productos.productosIndexado[arrayProductos[index]].kg || 1));
        }
    }, 0);

    const repetirCompra = () => {
        Array.from({ length: arrayProductos.length }).map((_, index) => {
            console.log(`Iteración ${index + 1}:`);

            const producto = productos.productosIndexado[arrayProductos[index]];

            if (producto && typeof producto === 'object' && producto !== null) {
                console.log(`ID: ${producto.id}, Cod. Orig: ${producto.cod_orig}, Cantidad: ${arrayCantidades[index]} ,Detalle: ${producto.detalle}, Precio: ${producto.precio}`);

                carrito.añadirElemento(producto.id, arrayCantidades[index]);
            } else {
                console.warn(`No se encontró un objeto válido para el índice ${arrayProductos[index]}`);
            }

            return null;
        });
        navigate('/tienda');
        carrito.setCarritoAbierto(true);
    };

    const fechaString = args.data.fecha; // Supongamos que fechaString es "2024-01-16"
    const partesFecha = fechaString.split('-');
    const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    return (
        <div className="contenedorPrincipalCardMisCompras">
            <div className="headCardMisCompras">
                <div className="fechaCardMisComprasContainer">
                    <h1 className="fechaCardMisCompras">{fechaFormateada}</h1>
                </div>
                <div className="divisorHeadMisCompras" />
                <div className="cantidadYBotonesCaontainer">
                    <div className="cantidadYPoliginosContainer">
                        <div className="poligono poligonoMisCompras" />
                        <h1>

                            {arrayCantidades.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}

                            {arrayCantidades.reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 1 ? ' PRODUCTO' : ' PRODUCTOS'}
                        </h1>
                    </div>
                    <div className="botonesContainer">
                        <button className={`botonCollapseCardCompras ${cardComprasAbierto ? 'open' : ''}`} onClick={toggleCardCompras}>
                            VER COMPRA
                        </button>
                        <button className="botonRepetirCompra" onClick={repetirCompra} >
                            VOLVER A COMPRAR
                        </button>
                    </div>
                </div>
            </div>
            <div className={`bodyCardMisCompras ${cardComprasAbierto ? 'open' : ''}`}>
                <div className="productosHistorialContainer">
                    {Array.from({ length: arrayProductos.length }).map((_, index) => (
                        <ProductoHistorial key={index} id={arrayProductos[index]} cantidad={arrayCantidades[index]} precio={arrayPrecios[index]} />
                    ))}
                </div>
                <div className="totalContainer">
                    <h2 className="precioViejo">TOTAL: ${total}</h2>
                </div>
            </div>
        </div>
    );
}