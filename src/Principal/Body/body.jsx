import Carrusel from './Carrusel/carrusel.jsx';
import Categorias from './Categorias/categorias.jsx';
import NuestrosProductos from './Categorias/nuestrosProductos.jsx';
import './body.css';

export default function Body(){
    return(
        <div className="contenedorPrincipalBody">
            <Carrusel/>
            <NuestrosProductos/>
            <Categorias/>
        </div>
        
    );
}