import './configuracion.css'
import EditarContraseña from './Editar Contraseña/editarContraseña';
import EditarDatos from './Editar Datos/editarDatos';
import EditarDireccion from './Direcciones/editarDireccion';
import EditarEmail from './Editar email/editarEmail';

export default function Configuracion(){
    return(
        <div className="contenedorPrincipalConfiguracion">
            <EditarDatos/>
            <EditarDireccion/>
            <EditarContraseña/>
            <EditarEmail/>
        </div>
    );
}