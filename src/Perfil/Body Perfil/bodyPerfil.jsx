import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';

export default function BodyPerfil(){
    const auth = useAuth();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <div className="nombreYEmailPerfilContainer">
                <h1>{auth.state.userInfo.nombre ? auth.state.userInfo.nombre.toUpperCase() : ''} {auth.state.userInfo.apellido ? auth.state.userInfo.apellido.toUpperCase() : ''}</h1>
                <h2>{auth.state.userInfo.email ? auth.state.userInfo.email : ''}</h2>
            </div>
            <Configuracion/>
        </div>
    );
}