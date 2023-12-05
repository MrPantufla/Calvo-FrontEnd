import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';
import EditarDatos from './Configuracion/Editar Datos/editarDatos.jsx';
import { useEditarDatos } from '../../contextEditarDatos.jsx';
import EditarContraseña from './Configuracion/Editar Contraseña/editarContraseña.jsx';
import { useEditarContraseña } from '../../contextEditarContraseña.jsx';

export default function BodyPerfil(){
    const auth = useAuth();
    const editarDatos = useEditarDatos();
    const editarContraseña = useEditarContraseña();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <Configuracion/>
            {editarDatos.editarDatosAbierto ? (<EditarDatos/>) : (<div/>) }
            {editarContraseña.editarContraseñaAbierto ? (<EditarContraseña/>) : (<div/>)}
            <h1>Hola, {auth.state.userInfo.nombre}</h1>
        </div>
    );
}