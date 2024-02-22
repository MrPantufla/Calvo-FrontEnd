import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import DesplegablePerfil from './Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from './Header/renderHeader.jsx';
import './homePage.css';
import CartelLogout from '../Login y registro/Logout/cartelLogout.jsx';

export default function HomePage(){
    return(
        <div className="contenedorHomePage">
            <RenderHeader/>
            <DesplegablePerfil/>
            <Body/>
            <Footer/>
            <CartelLogout/>
        </div>
    );
}