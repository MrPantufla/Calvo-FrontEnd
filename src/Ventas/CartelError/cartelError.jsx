import './cartelError.css';
import { useCarrito } from '../../contextCarrito';
import { useNavigate } from 'react-router-dom';

export default function CartelError(){
    const carrito = useCarrito();
    const navigate = useNavigate();

    const clickParteUtilizable = (e) => {
        e.stopPropagation();
    }

    const navegarAContacto = () =>{
        navigate('/home');
        setTimeout(() => {
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        }, 200);
        carrito.ocultarCartel();
    }

    return(
        <div className={`contenedorPrincipalCartelError ${carrito.mostrarCartelError ? 'open' : ''}`} onClick={carrito.ocultarCartel}>
            <div className="parteUtilizableCartelError" onClick={(e) => clickParteUtilizable(e)}>
                <h2>Hacete cliente para realizar pedidos de perfiles</h2>
                <a onClick={navegarAContacto}>Llama a nuestras oficinas o envianos un mensaje para consultar</a>
                <button onClick={carrito.ocultarCartel}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}
