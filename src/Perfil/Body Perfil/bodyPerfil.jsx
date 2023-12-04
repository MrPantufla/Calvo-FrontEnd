import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';
import EditarDatos from './Configuracion/Editar Datos/editarDatos.jsx';
import { useEditarDatos } from '../../contextEditarDatos.jsx';

export default function BodyPerfil(){
    const auth = useAuth();
    const editarDatos = useEditarDatos();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <Configuracion/>
            {editarDatos.editarDatosAbierto ? (<EditarDatos/>) : (<div/>) }
            <h1>Hola, {auth.state.userInfo.nombre}</h1>
        </div>
    );
}