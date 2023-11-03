import Carrusel from './Carrusel/carrusel.jsx';
import Categorias from './Categorias/categorias.jsx';
import Banner from './Categorias/banner.jsx';
import './body.css';

export default function Body(){
    return(
        <div className="contenedorPrincipalBody">
            <Carrusel/>
            <Banner texto="NUESTROS PRODUCTOS"/>
            <Categorias/>
        </div>
        
    );
}