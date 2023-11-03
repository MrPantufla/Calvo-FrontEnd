import Carrusel from './Carrusel/carrusel.jsx';
import Categorias from './Categorias/categorias.jsx';
import Banner from './Banner/banner.jsx';
import InformacionYContacto from './Informacion y contacto/informacionYContacto.jsx';
import QuienesSomos from './Quienes somos/quienesSomos.jsx';
import './body.css';

export default function Body(){
    return(
        <div className="contenedorPrincipalBody">
            <Carrusel/>
            <Banner texto="NUESTROS PRODUCTOS"/>
            <Categorias/>
            <Banner texo="SOBRE NOSOTROS"/>
            <QuienesSomos/>
            <Banner texto="CONTACTANOS" />
            <InformacionYContacto/>
        </div>
        
    );
}