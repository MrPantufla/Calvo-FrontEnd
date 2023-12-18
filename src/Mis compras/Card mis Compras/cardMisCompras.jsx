import './cardMisCompras.css';
import { useState, useEffect } from 'react';
import ProductoHistorial from '../Producto Historial/productoHistorial';
import { useProductos } from '../../contextProductos';
import { useCarrito } from '../../contextCarrito';
import { Link, useNavigate } from 'react-router-dom';

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
        return accumulator + arrayCantidades[index] * arrayPrecios[index];
    }, 0);

    const totalActual = arrayProductos.reduce((accumulator, _, index) => {
        if (productos.productosIndexado[arrayProductos[index]]) {
            return accumulator + productos.productosIndexado[arrayProductos[index]].precio * arrayCantidades[index];
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
    

    return (
        <div className="contenedorPrincipalCardMisCompras">
            <div className="headCardMisCompras">
                <h1>{args.data.fecha} - {arrayCantidades.reduce((accumulator, currentValue) => accumulator + currentValue, 0)} productos</h1>
                <div className="botonCollapseCardComprasContainer">
                    <button className="botonCollapseCardCompras" onClick={toggleCardCompras}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`bodyMisCompras ${cardComprasAbierto ? 'open' : ''}`}>
                <div className="productosHistorialContainer">
                    {Array.from({ length: arrayProductos.length }).map((_, index) => (
                        <ProductoHistorial key={index} id={arrayProductos[index]} cantidad={arrayCantidades[index]} precio={arrayPrecios[index]} />
                    ))}
                </div>
                <div className="totalYBotonContainer">
                    <h2>TOTAL: ${total}</h2>
                    <h2>Precio actual: ${totalActual}</h2>
                </div>
                <div className="botonRepetirCompraContainer">
                    <button className="botonRepetirCompra" onClick={repetirCompra} >
                        Repetir compra
                    </button>
                </div>
            </div>
        </div>
    );
}
