import { useDesplegableConfiguracion } from '../../../contextDesplegableConfiguracion';
import { useEditarDatos } from '../../../contextEditarDatos';
import { useEditarContraseña } from '../../../contextEditarContraseña';
import './configuracion.css';

export default function Configuracion() {
    const desplegable = useDesplegableConfiguracion();
    const editarDatos = useEditarDatos();
    const editarContraseña = useEditarContraseña();

    return (
        <div
            className={`desplegableConfiguracion ${desplegable.hovered ? 'open' : ''}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
        >
            <div className="configuracionContainer">
                <a onClick={editarDatos.abrirEditarDatos}>DATOS DE USUARIO</a>
                <a>MIS DIRECCIONES</a>
                <a onClick={editarContraseña.abrirEditarContraseña}>CAMBIAR CONTRASEÑA</a>
            </div>
        </div>
    );
}
