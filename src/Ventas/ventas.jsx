import Filtros from './FiltrosYProductos/filtrosYProductos';
import Header from '../Principal/Header/header.jsx';
import Carrito from './Carrito/carrito';

export default function Ventas(){
    return(
        <>
            <Header/>
            <Carrito/>
            <Filtros/>
        </>
    );
}