import './cartelError.css';
import { useCarrito } from '../../contextCarrito';
import { useNavigate } from 'react-router-dom';

export default function CartelError(){
    const {
        ocultarCartel,
        mostrarCartelError
    } = useCarrito();

    const navigate = useNavigate();

    const clickParteUtilizable = (e) => {
        e.stopPropagation();
    }

    const navegarAContacto = () =>{
        navigate('/');
        setTimeout(() => {
            document.getElementById('redesSocialesContainer').scrollIntoView({ behavior: 'smooth' });
        }, 200);
        ocultarCartel();
    }

    return(
        <div className={`contenedorPrincipalCartelError ${mostrarCartelError ? 'open' : ''}`} onClick={ocultarCartel}>
            <div className="parteUtilizableCartelError" onClick={(e) => clickParteUtilizable(e)}>
                <h2>Hacete cliente mayorista para realizar pedidos de perfiles</h2>
                <a onClick={navegarAContacto}>Llama a nuestras oficinas o envianos un mensaje para consultar</a>
                <button onClick={ocultarCartel}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}
