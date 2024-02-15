import './corroborarDatos.css';
import { useAuth } from "../../../contextLogin";
import { useDireccion } from "../../../contextDireccion";
import { useCarrito } from "../../../contextCarrito";
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../../../contextTienda';

export default function CorroborarDatos() {
    const {state} = useAuth();

    const {
        calle,
        numero,
        cp,
        localidad,
        provincia
    } = useDireccion();

    const {
        confirmarCompra,
        limpiarCarrito,
        setConfirmarCompraAbierto,
        setDatosCorroborados
    } = useCarrito();

    const {setMostrarPagos} = useTienda();

    const navigate = useNavigate();

    return (
        <div className="contenedorPrincipalCorroborarDatos">
            <h2>CORROBORA TUS DATOS</h2>
            <div className="direccionYDatosContainer">
                <p>NOMBRE Y APELLIDO:<span> {state.userInfo.nombre} {state.userInfo.apellido}</span></p>
                <p>TELÉFONO:<span> {state.userInfo.telefono}</span></p>
                <p>DIRECCIÓN:<span> {calle} {numero}</span></p>
                <p>CP:<span> {cp}</span></p>
                <p>LOCALIDAD:<span> {localidad}</span></p>
                <p>PROVINCIA:<span> {provincia}</span></p>
            </div>
            <div className="botonCorroborarContainer">
                <button className="confirmarCompra" onClick={() => { confirmarCompra(); limpiarCarrito(); setConfirmarCompraAbierto(false); setMostrarPagos(true); setDatosCorroborados(true)}}>
                    Confirmar compra
                </button>
                <button className="editarDatosDeCuenta" onClick={() => navigate('/perfil')}>
                    Editar datos
                </button>
            </div>
        </div>
    );
}