import './cartelLogout.css';
import { useAuth } from '../../contextLogin';
import { useState } from 'react';

export default function CartelLogout() {
    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

    const {
        setMostrarCartelLogout, 
        mostrarCartelLogout
    } = useAuth();

    const handleCloseLogout = () => {
        if(aptoParaCerrar == true){
            setMostrarCartelLogout(false)
        }
    }

    const noCerrar = (event) =>{
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    return (
        <div className="contenedorPrincipalCartelLogout" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleCloseLogout} style={{ display: mostrarCartelLogout ? 'flex' : 'none' }}>
            <div className="contenedorCartelLogout" onMouseDown={noCerrar} onMouseUp={noCerrar}>
                <h2>SESIÓN CERRADA</h2>
                <button onClick={() => setMostrarCartelLogout(false)}>Aceptar</button>
            </div>
        </div>
    );
}