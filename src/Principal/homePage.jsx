import Header from './Header/header.jsx';
import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import HeaderMobile from './Header/headerMobile.jsx';
import InformacionYContacto from './Body/Informacion y contacto/informacionYContacto.jsx';
import './homePage.css';

export default function HomePage(){
    const mobile = (window.innerWidth < 768);
    return(
        <div className="contenedorHomePage">
            {mobile ? <HeaderMobile/> : <Header/>}
            <Body/>
            <Footer/>
        </div>
    );
}