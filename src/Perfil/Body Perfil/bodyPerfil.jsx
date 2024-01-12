import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';

export default function BodyPerfil(){
    const auth = useAuth();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <div className="nombreYEmailContainer">
                <h1>{auth.state.userInfo.nombre} {auth.state.userInfo.apellido}</h1>
            </div>
            <Configuracion/>
        </div>
    );
}