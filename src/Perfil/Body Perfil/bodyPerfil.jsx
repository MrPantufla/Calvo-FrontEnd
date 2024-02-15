import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';

export default function BodyPerfil(){
    const {state} = useAuth();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <div className="nombreYEmailPerfilContainer">
                <h1>{state.userInfo.nombre ? state.userInfo.nombre.toUpperCase() : ''} {state.userInfo.apellido ? state.userInfo.apellido.toUpperCase() : ''}</h1>
                <h2>{state.userInfo.email ? state.userInfo.email : ''}</h2>
            </div>
            <Configuracion/>
        </div>
    );
}