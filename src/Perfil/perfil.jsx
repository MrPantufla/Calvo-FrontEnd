import './perfil.css';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';

export default function Perfil() {
    return (
        <div className="contenedorPrincipalPerfil">
            <RenderHeader/>
            <div className="decoracionBody decoracionPerfil"/>
            <div className="decoracionDosBody decoracionDosPerfil" />
            <DesplegablePerfil />
            <BodyPerfil />
            <Footer />
        </div>
    );
}