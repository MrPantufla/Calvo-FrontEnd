import './domicilio.css';
import { useAuth } from '../../../../contextLogin';
import { useNavigate } from 'react-router-dom';
import { useVariables } from '../../../../contextVariables';
import { useConfiguracion } from '../../../../contextConfiguracion';
import { useFinalizarCompra } from '../../../../contextFinalizarCompra';

export default function Domicilio() {

    const navigate = useNavigate();

    const {
        setMostrarEnvios,
        setMostrarPagos
    } = useVariables();

    const {
        abrirDireccion
    } = useConfiguracion();

    const {
        state,
        calle,
        numero,
        cp,
        localidad,
        provincia
    } = useAuth();

    const {
        tipoEnvio,
        setTipoEnvio
    } = useFinalizarCompra();

    const direccionCargada = calle != '' && numero != '' && cp != '' && localidad != '' && provincia != '';

    const viajarEditarDireccion = () => {
        navigate('/perfil');
        setMostrarEnvios(false);
        abrirDireccion();
    }

    const confirmar = () => {
        setMostrarEnvios(false);
        setMostrarPagos(true);
    }

    return (
        <div className="contenedorPrincipalDomicilio">
            {state.userInfo && state.userInfo.cliente &&
                <div className="botonesOpcionesConfirmarCompra">
                    <button className={`${tipoEnvio == "transportePropio" && 'active'}`} onClick={() => setTipoEnvio("transportePropio")}>Transporte Calvo (sin costo)</button>
                    <button className={`${tipoEnvio == "correo" && 'active'}`} onClick={() => setTipoEnvio("correo")}>Servicio de correo</button>
                </div>
            }
            <div className="datosContenedor">
                {direccionCargada ?
                    (<div className="datosDireccion">
                        <p>DOMICILIO: <span>{calle} {numero}</span></p>
                        <p>CÓDIGO POSTAL: <span>{cp}</span></p>
                        <p>LOCALIDAD: <span>{localidad}</span></p>
                        <p>PROVINCIA: <span>{provincia}</span></p>
                    </div>)
                    :
                    (<p><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>No existe una dirección cargada en tu cuenta</p>)
                }
                <button className="editarDireccion" onClick={() => viajarEditarDireccion()}>{direccionCargada ? 'Editar dirección' : 'Cargar dirección'}</button>
            </div>
            <div className="contenedorConfirmarBoton">
                {(direccionCargada && ((state.userInfo && !state.userInfo.cliente) || (state.userInfo && state.userInfo.cliente && tipoEnvio != ''))) && <button className="confirmarBoton" onClick={() => confirmar()}>Confirmar</button>}
            </div>
        </div>
    );
}