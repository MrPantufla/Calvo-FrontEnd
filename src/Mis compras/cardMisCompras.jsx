import './cardMisCompras.css';
import { useState } from 'react';
import perfil from '../Imagenes/perfil.jpg'
import ProductoHistorial from './productoHistorial';
import { useProductos } from '../contextProductos';

export default function CardMisCompras(args) {
    const [cardMisComprasAbierto, setCardMisComprasAbierto] = useState(false);
    const arrayProductos = args.data.productos.split(' ').map((str) => parseInt(str, 10));
    const arrayCantidades = args.data.cantidades.split(' ').map((str) => parseInt(str, 10));
    const arrayPrecios = args.data.precios.split(' ').map((str) => parseInt(str, 10));
    const [cardComprasAbierto, setCardComprasAbierto] = useState(false);
    const productos = useProductos();

    const toggleCardCompras = () => {
        setCardComprasAbierto(!cardComprasAbierto);
    }

    const total = arrayProductos.reduce((accumulator, _, index) => {
        return accumulator + arrayCantidades[index] * arrayPrecios[index];
    }, 0);

    const totalActual = arrayProductos.reduce((accumulator, _, index) => {
        if(productos.productosIndexado[index]){ 
            return accumulator + productos.productosIndexado[arrayProductos[index]].precio*arrayCantidades[index];
        }
    }, 0);

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
                {Array.from({ length: arrayProductos.length }).map((_, index) => (
                    <ProductoHistorial key={index} id={arrayProductos[index]} cantidad={arrayCantidades[index]} precio={arrayPrecios[index]} />
                ))}
                <div className="totalYBotonContainer">
                    <h2>TOTAL: ${total}</h2>
                    <h2>Precio actual: ${totalActual}</h2>
                </div>
            </div>
        </div>
    );
}
