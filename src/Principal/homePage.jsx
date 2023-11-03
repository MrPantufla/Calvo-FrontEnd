import Header from './Header/header.jsx';
import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import InformacionYContacto from './Body/Informacion y contacto/informacionYContacto.jsx';
import './homePage.css';

export default function HomePage(){
    return(
        <div className="contenedorHomePage">
            <Header/>
            <Body/>
            <InformacionYContacto/>
            <Footer/>
        </div>
    );
}