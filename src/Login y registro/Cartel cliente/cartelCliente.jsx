import './cartelCliente.css';
import { useAuth } from '../../contextLogin';

export default function CartelCliente() {
    const { setMostrarCartelCliente } = useAuth();

    return (
        <div className="contenedorPrincipalCartelCliente">
            <div className="parteUtilizableCartelCliente">
                <h1>¡IMPORTANTE!</h1>
                <p>Si ya sos cliente y estás viendo este texto, <a href="#contacto">comunicate con nosotros</a> para activar correctamente tu cuenta de cliente y cargar tus descuentos</p>
                <button className="botonAceptar" onClick={()=> setMostrarCartelCliente(false)}>Aceptar</button>
            </div>
        </div>
    );
}