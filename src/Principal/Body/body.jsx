import Carrusel from './Carrusel/carrusel.jsx';
import Categorias from './Categorias/categorias.jsx';
import Banner from './Banner/banner.jsx';
import InformacionYContacto from './Informacion y contacto/informacionYContacto.jsx';
import QuienesSomos from './Quienes somos/quienesSomos.jsx';
import './body.css';

export default function Body() {

    return (
        <body className="contenedorPrincipalBody">
            <div className="decoracionBody" />
            <div className="decoracionDosBody"/>
            <div className="restoBody">
                <Carrusel />
                <Banner texto="NUESTROS PRODUCTOS" />
                <Categorias />
                <Banner id="quienesSomos" texto="SOBRE NOSOTROS" />
                <QuienesSomos />
                <Banner id="contacto" texto="CONTACTANOS" />
                <InformacionYContacto />
            </div>
        </body>
    );
}