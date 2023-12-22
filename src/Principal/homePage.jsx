import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import DesplegablePerfil from './Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from './Header/renderHeader.jsx';
import './homePage.css';

export default function HomePage(){
    const mobile = (window.innerWidth < 768);
    return(
        <div className="contenedorHomePage">
            <RenderHeader/>
            <DesplegablePerfil/>
            <Body/>
            <Footer/>
        </div>
    );
}