import { useAuth } from '../../contextLogin.jsx';
import './bodyPerfil.css';
import Configuracion from './Configuracion/configuracion.jsx';
import EditarDatos from './Configuracion/Editar Datos/editarDatos.jsx';
import { useEditarDatos } from '../../contextEditarDatos.jsx';
import EditarContraseña from './Configuracion/Editar Contraseña/editarContraseña.jsx';
import { useEditarContraseña } from '../../contextEditarContraseña.jsx';
import { useDirecciones } from '../../contextDireciones.jsx';
import Direcciones from './Configuracion/Direcciones/direcciones.jsx';

export default function BodyPerfil(){
    const auth = useAuth();
    const editarDatos = useEditarDatos();
    const editarContraseña = useEditarContraseña();
    const direcciones = useDirecciones();

    return(
        <div className="contenedorPrincipalBodyPerfil">
            <Configuracion/>
            {editarDatos.editarDatosAbierto ? (<EditarDatos/>) : (<></>) }
            {direcciones.direccionesAbierto ? (<Direcciones/>) : (<></>)}
            {editarContraseña.editarContraseñaAbierto ? (<EditarContraseña/>) : (<></>)}
            <h1>Hola, {auth.state.userInfo.nombre}</h1>
        </div>
    );
}