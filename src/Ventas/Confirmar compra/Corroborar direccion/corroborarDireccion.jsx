import './corroborarDireccion.css';
import { useAuth } from "../../../contextLogin";
import { useDireccion } from "../../../contextDireccion";
import { useCarrito } from "../../../contextCarrito";
import { useNavigate } from 'react-router-dom';

export default function CorroborarDireccion() {
    const {state} = useAuth();

    const {
        calle,
        numero,
        cp,
        localidad,
        provincia
    } = useDireccion();

    const {
        setInstanciaPedido
    } = useCarrito();

    const navigate = useNavigate();

    return (
        <div className="contenedorPrincipalCorroborarDatos">
            <h2>DIRECCIÓN DE ENVÍO</h2>
            <div className="direccionYDatosContainer">
                <p>NOMBRE Y APELLIDO:<span> {state.userInfo.nombre} {state.userInfo.apellido}</span></p>
                <p>DIRECCIÓN:<span> {calle} {numero}</span></p>
                <p>CP:<span> {cp}</span></p>
                <p>LOCALIDAD:<span> {localidad}</span></p>
                <p>PROVINCIA:<span> {provincia}</span></p>
            </div>
            <div className="botonCorroborarContainer">
                <button className="confirmarCompra" onClick={() => setInstanciaPedido('facturacion')}>
                    Continuar
                </button>
                <button className="editarDatosDeCuenta" onClick={() => navigate('/perfil')}>
                    Editar datos
                </button>
            </div>
        </div>
    );
}