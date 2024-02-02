import './perfil.css';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contextLogin.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';

export default function Perfil() {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!auth.state.logueado || !auth.state.userInfo.email_confirmado) {
                navigate("/home");
            }
        }, 200);

        return () => clearTimeout(timeoutId);
    });

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