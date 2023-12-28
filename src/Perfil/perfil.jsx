import Header from '../Principal/Header/header';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contextLogin.jsx';

export default function Perfil() {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        console.log("ENTRADA")
        if (!auth.state.logueado) {
            navigate("/home");
        }
    })

    return (
        <div className="contenedorPrincipalPerfil">
            <Header />
            <DesplegablePerfil />
            <LoginYRegistro />
            <BodyPerfil />
            {/*<Footer />*/}
        </div>
    );
}