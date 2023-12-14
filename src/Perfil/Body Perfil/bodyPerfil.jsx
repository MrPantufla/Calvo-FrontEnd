import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import EditarDatos from './Configuracion/Editar Datos/editarDatos.jsx';
import EditarContraseña from './Configuracion/Editar Contraseña/editarContraseña.jsx';
import Direcciones from './Configuracion/Direcciones/editarDireccion.jsx';

export default function BodyPerfil(){
    const auth = useAuth();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <div className="nombreYEmailContainer">
                <h1>{auth.state.userInfo.nombre} {auth.state.userInfo.apellido}</h1>
                <h2>{auth.state.userInfo.email}</h2>
            </div>
            <EditarDatos/>
            <Direcciones/>
            <EditarContraseña/>
        </div>
    );
}