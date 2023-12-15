import './cardMisCompras.css';
import { useState } from 'react';

export default function CardMisCompras(args) {

    const [cardMisComprasAbierto, setCardMisComprasAbierto] = useState(false);
    const arrayProductos = args.data.productos.split(' ').map((str) => parseInt(str, 10));
    const arrayCantidades = args.data.cantidades.split(' ').map((str) => parseInt(str, 10));
    const arrayPrecios = args.data.precios.split(' ').map((str) => parseInt(str, 10));

    const sumaCantidades = arrayCantidades.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <div className="contenedorPrincipalCardMisCompras">
            <div className="headCardMisCompras">
                <h1>{args.data.fecha} - {arrayCantidades} productos</h1>
            </div>
            <div className={`colapsableCardMisCompras ${cardMisComprasAbierto ? 'open' : ''}`}>

            </div>
        </div>
    );
}