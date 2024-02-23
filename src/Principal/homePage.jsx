import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import DesplegablePerfil from './Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from './Header/renderHeader.jsx';
import './homePage.css';
import CartelLogout from '../Login y registro/Logout/cartelLogout.jsx';
import CartelCliente from '../Login y registro/Cartel cliente/cartelCliente.jsx';
import { useAuth } from '../contextLogin.jsx';

export default function HomePage(){
    const { mostrarCartelCliente } = useAuth();
    return(
        <div className="contenedorHomePage">
            <RenderHeader/>
            <DesplegablePerfil/>
            <Body/>
            <Footer/>
            <CartelLogout/>
            {mostrarCartelCliente==true && <CartelCliente/>}
        </div>
    );
}