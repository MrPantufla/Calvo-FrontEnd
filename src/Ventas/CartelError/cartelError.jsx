import './cartelError.css';
import { useCarrito } from '../../contextCarrito';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CartelError(){
    const {
        ocultarCartel,
        setMostrarCartelError
    } = useCarrito();

    const navigate = useNavigate();

    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

    const navegarAContacto = () =>{
        navigate('/');
        setTimeout(() => {
            document.getElementById('redesSocialesContainer').scrollIntoView({ behavior: 'smooth' });
        }, 200);
        ocultarCartel();
    }

    const handleCloseCartel = () => {
        if(aptoParaCerrar == true){
            setMostrarCartelError(false)
        }
    }

    const noCerrar = (event) =>{
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    return(
        <div className={`contenedorPrincipalCartelError`} onMouseDown={() => setAptoParaCerrar(true)} onClick={handleCloseCartel}>
            <div className="parteUtilizableCartelError" onMouseDown={noCerrar} onMouseUp={noCerrar}>
                <h2>Hacete cliente mayorista para realizar pedidos de perfiles</h2>
                <a onClick={navegarAContacto}>Llama a nuestras oficinas o envianos un mensaje para consultar</a>
                <button onClick={() => setMostrarCartelError(false)}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}
