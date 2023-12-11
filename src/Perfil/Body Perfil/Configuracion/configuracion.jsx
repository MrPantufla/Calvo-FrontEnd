import { useDesplegableConfiguracion } from '../../../contextDesplegableConfiguracion';
import { useEditarDatos } from '../../../contextEditarDatos';
import { useEditarContraseña } from '../../../contextEditarContraseña';
import { useDirecciones } from '../../../contextDireciones';
import './configuracion.css';

export default function Configuracion() {
    const desplegable = useDesplegableConfiguracion();
    const editarDatos = useEditarDatos();
    const editarContraseña = useEditarContraseña();
    const direcciones = useDirecciones();

    return (
        <div
            className={`desplegableConfiguracion ${desplegable.hovered ? 'open' : ''}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
        >
            <div className="configuracionContainer">
                <a onClick={editarDatos.abrirEditarDatos}>DATOS DE USUARIO</a>
                <a onClick={direcciones.abrirDirecciones}>DIRECCIÓN DE ENVÍO</a>
                <a onClick={editarContraseña.abrirEditarContraseña}>CAMBIAR CONTRASEÑA</a>
            </div>
        </div>
    );
}
