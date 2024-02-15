import './editarDireccion.css';
import { useConfiguracion } from '../../../../contextConfiguracion';
import FormularioDireccion from './formularioDireccion';

export default function Direcciones() {
    const {
        direccionAbierto,
        cerrarDireccion,
        abrirDireccion
    } = useConfiguracion();

    const toggleCollapse = () =>{
        direccionAbierto ? (cerrarDireccion()) : (abrirDireccion())
    }

    return (
        <div className="contenedorPrincipalEditar">
            <div className="headEditar" onClick={toggleCollapse}>
                <div className="textoHeadEditar">
                    <h1>DIRECCIÓN DE ENVÍO</h1>
                </div>
                <div className="botonCollapseEditarContainer">
                    <button className="botonCollapseEditar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="var(--colorRojo)" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ transform: direccionAbierto ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`colapsableEditarDireccion editarInformacion ${direccionAbierto ? 'open' : ''}`}>
                <FormularioDireccion/>
            </div>
        </div>
    );
}