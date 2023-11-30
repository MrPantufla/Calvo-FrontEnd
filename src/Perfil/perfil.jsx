import Header from '../Principal/Header/header';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';

export default function Perfil(){
    return(
        <div className="contenedorPrincipalPerfil">
            <Header/>
            <BodyPerfil/>
            <Footer/>
        </div>
    );
}