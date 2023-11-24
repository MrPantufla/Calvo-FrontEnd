import Carrusel from './Carrusel/carrusel.jsx';
import Categorias from './Categorias/categorias.jsx';
import Banner from './Banner/banner.jsx';
import InformacionYContacto from './Informacion y contacto/informacionYContacto.jsx';
import QuienesSomos from './Quienes somos/quienesSomos.jsx';
import LoginYRegistro from '../../Login y registro/loginYRegistro.jsx';
import { useAuth } from '../../contextLogin.jsx';
import './body.css';

export default function Body(){
    const auth= useAuth();

    return(
        <div className="contenedorPrincipalBody">
            <LoginYRegistro/>
            <Carrusel/>
            <Banner texto="NUESTROS PRODUCTOS"/>
            <Categorias/>
            <Banner id="quienesSomos" texto="SOBRE NOSOTROS"/>
            <QuienesSomos/>
            <Banner id="contacto" texto="CONTACTANOS" />
            <InformacionYContacto/>
        </div>
        
    );
}