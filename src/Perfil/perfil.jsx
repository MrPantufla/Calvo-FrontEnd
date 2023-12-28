import Header from '../Principal/Header/header';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';

export default function Perfil() {
    return (
        <div className="contenedorPrincipalPerfil">
                <Header />
                <DesplegablePerfil/>
                <LoginYRegistro />
                <BodyPerfil />
                {/*<Footer />*/}
        </div>
    );
}