import { useDesplegableConfiguracion } from '../../../contextDesplegableConfiguracion';
import { useEditarDatos } from '../../../contextEditarDatos';
import './configuracion.css';

export default function Configuracion() {
    const desplegable = useDesplegableConfiguracion();
    const editarDatos = useEditarDatos();

    return (
        <div
            className={`desplegableConfiguracion ${desplegable.hovered ? 'open' : ''}`}
            onMouseEnter={desplegable.abrirHover}
            onMouseLeave={desplegable.cerrarHover}
        >
            <div className="configuracionContainer">
                <a onClick={editarDatos.abrirEditarDatos}>DATOS DE CUENTA</a>
                <a>MIS DIRECCIONES</a>
                <a>HERRAMIENTAS</a>
            </div>
        </div>
    );
}
