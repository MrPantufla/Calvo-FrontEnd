import './domicilio.css';
import { useAuth } from '../../../../contextLogin';
import { useNavigate } from 'react-router-dom';
import { useVariables } from '../../../../contextVariables';
import { useConfiguracion } from '../../../../contextConfiguracion';

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
            <div className="datosContenedor">
                {direccionCargada ?
                    (<div className="datosDireccion">
                        <p>DOMICILIO: <span>{calle} {numero}</span></p>
                        <p>CÓDIGO POSTAL: <span>{cp}</span></p>
                        <p>LOCALIDAD: <span>{localidad}</span></p>
                        <p>PROVINCIA: <span>{provincia}</span></p>
                    </div>)
                    :
                    (<p>No existe una dirección cargada en tu cuenta</p>)
                }
                <button className="editarDireccion" onClick={() => viajarEditarDireccion()}>{direccionCargada ? 'Editar dirección' : 'Cargar dirección'}</button>
            </div>
            <div className="contenedorConfirmarBoton">
                {<button className="confirmarBoton" onClick={() => confirmar()}>Confirmar</button>}
            </div>
        </div>
    );
}