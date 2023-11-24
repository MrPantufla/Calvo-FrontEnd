import './cartelLogout.css';
import { useAuth } from '../contextLogin';
import { useEffect } from 'react';

export default function CartelLogout() {
    const auth = useAuth();

    const handleCloseLogout = () => {
        auth.setMostrarCartelLogout(false)
    }

    const noCerrar = (event) =>{
        event.stopPropagation();
    }

    return (
        <div className="contenedorPrincipalCartelLogout" onClick={handleCloseLogout} style={{ display: auth.mostrarCartelLogout ? 'flex' : 'none' }}>
            <div className="contenedorCartelLogout" onClick={noCerrar}>
                <h2>Sesión cerrada</h2>
                <button onClick={handleCloseLogout}>Aceptar</button>
            </div>
        </div>
    );
}