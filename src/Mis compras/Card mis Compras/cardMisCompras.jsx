import './cardMisCompras.css';
import { useState, useEffect } from 'react';
import ProductoHistorial from '../Producto Historial/productoHistorial';
import { useProductos } from '../../contextProductos';
import { useCarrito } from '../../contextCarrito';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextLogin';

export default function CardMisCompras(args) {
    const [cardComprasAbierto, setCardComprasAbierto] = useState(false);

    const { productosIndexado } = useProductos();

    const {
        setCarritoAbierto,
        añadirElemento
    } = useCarrito();

    const { state } = useAuth();

    const navigate = useNavigate();

    const toggleCardCompras = () => {
        setCardComprasAbierto(!cardComprasAbierto);
    }

    const total = args.data.reduce((accumulator, currentItem) => {
        if (productosIndexado[currentItem.producto]) {
            return parseInt(accumulator + (currentItem.p_vta * currentItem.cantidad * (productosIndexado[currentItem.producto].rubro != 85 ? (productosIndexado[currentItem.producto].kg || 1) : (1))));
        }
        else {
            return parseInt(accumulator + (currentItem.p_vta * currentItem.cantidad))
        }
    }, 0);

    const repetirCompra = () => {
        Array.from({ length: args.data.length }).map((_, index) => {

            const producto = productosIndexado[args.data[index].producto];

            if (producto && typeof producto === 'object' && producto !== null) {
                if (args.data[index].proceso) {
                    añadirElemento(`${producto.id}(${args.data[index].proceso}(${args.data[index].acabado || 0}))`, args.data[index].cantidad)
                }
                else {
                    añadirElemento(producto.id, args.data[index].cantidad);
                }
            }

            return null;
        });
        navigate('/tienda');
        setCarritoAbierto(true);
    };

    const fechaString = args.data[0].fecha;
    const partesFecha = fechaString.split('/');
    const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    useEffect(() => {
        setCardComprasAbierto(false);
    }, [args.id])

    return (
        <div className="contenedorPrincipalCardMisCompras" >
            <div className="headCardMisCompras">
                <div className="fechaCardMisComprasContainer">
                    <h1 className="fechaCardMisCompras">{fechaFormateada}</h1>
                </div>
                <div className="divisorHeadMisCompras" />
                <div className="cantidadYBotonesContainer">
                    <div className="cantidadYPoliginosContainer">
                        <div className="poligono poligonoMisCompras" />
                        <h1>
                            {args.data.length}

                            {args.data.length === 1 ? ' PRODUCTO' : ' PRODUCTOS'}
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
            <div className={`bodyCardMisCompras ${cardComprasAbierto == true ? 'open' : ''}`}>
                <div className="productosHistorialContainer">
                    {Array.from({ length: args.data.length }).map((_, index) => (
                        <ProductoHistorial key={index} id={args.data[index].producto} cantidad={args.data[index].cantidad} precio={args.data[index].p_vta} proceso={args.data[index].proceso} acabado={args.data[index].acabado} />
                    ))}
                </div>
                <div className="totalContainer">
                    <h2 className="precioViejo">{`TOTAL: ${total} ${(state.userInfo && state.userInfo.categoria == 'MAYORISTA') && `- CON DESCUENTO: $${parseInt(total*97/100)}`}`}</h2>
                </div>
            </div>
        </div>
    );
}