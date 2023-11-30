import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';

export default function BodyPerfil(){
    const auth = useAuth();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <Configuracion/>
            <h1>Hola, {auth.state.userInfo.nombre}</h1>
        </div>
    );
}