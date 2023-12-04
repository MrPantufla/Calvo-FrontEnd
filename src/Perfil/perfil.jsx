import Header from '../Principal/Header/header';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';

export default function Perfil(){
    return(
        <div className="contenedorPrincipalPerfil">
            <Header/>
            <LoginYRegistro/>
            <BodyPerfil/>
            <Footer/>
        </div>
    );
}