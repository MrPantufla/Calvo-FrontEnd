import Carrusel from './Carrusel/carrusel.jsx';
import Categorias from './Categorias/categorias.jsx';
import './body.css';

export default function Body(){
    return(
        <div className="contenedorPrincipalBody">
            <Carrusel/>
            <Categorias/>
        </div>
        
    );
}