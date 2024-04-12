import './configuracion.css'
import EditarContraseña from './Editar Contraseña/editarContraseña';
import EditarDatos from './Editar Datos/editarDatos';
import EditarDireccion from './Direcciones/editarDireccion';

export default function Configuracion(){
    return(
        <div className="contenedorPrincipalConfiguracion">
            <EditarDatos/>
            <EditarDireccion/>
            <EditarContraseña/>
        </div>
    );
}