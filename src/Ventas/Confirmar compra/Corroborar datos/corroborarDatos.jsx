import './corroborarDatos.css';
import { useAuth } from "../../../contextLogin";
import { useDireccion } from "../../../contextDireccion";
import { useCarrito } from "../../../contextCarrito";
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../../../contextTienda';

export default function CorroborarDatos() {
    const auth = useAuth();
    const direccion = useDireccion();
    const carrito = useCarrito();
    const navigate = useNavigate();
    const tienda = useTienda();

    return (
        <div className="contenedorPrincipalCorroborarDatos">
            <h2>CORROBORA TUS DATOS</h2>
            <div className="direccionYDatosContainer">
                <p>NOMBRE Y APELLIDO:<span> {auth.state.userInfo.nombre} {auth.state.userInfo.apellido}</span></p>
                <p>TELÉFONO:<span> {auth.state.userInfo.telefono}</span></p>
                <p>DIRECCIÓN:<span> {direccion.calle} {direccion.numero}</span></p>
                <p>CP:<span> {direccion.cp}</span></p>
                <p>LOCALIDAD:<span> {direccion.localidad}</span></p>
                <p>PROVINCIA:<span> {direccion.provincia}</span></p>
            </div>
            <div className="botonCorroborarContainer">
                <button className="confirmarCompra" onClick={() => { carrito.confirmarCompra(); carrito.limpiarCarrito(); carrito.setConfirmarCompraAbierto(false); tienda.setMostrarPagos(true); carrito.setDatosCorroborados(true)}}>
                    Confirmar compra
                </button>
                <button className="editarDatosDeCuenta" onClick={() => navigate('/perfil')}>
                    Editar datos
                </button>
            </div>
        </div>
    );
}