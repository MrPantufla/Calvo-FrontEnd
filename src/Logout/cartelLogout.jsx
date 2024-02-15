import './cartelLogout.css';
import { useAuth } from '../contextLogin';

export default function CartelLogout() {
    const {
        setMostrarCartelLogout, 
        mostrarCartelLogout
    } = useAuth();

    const handleCloseLogout = () => {
        setMostrarCartelLogout(false)
    }

    const noCerrar = (event) =>{
        event.stopPropagation();
    }

    return (
        <div className="contenedorPrincipalCartelLogout" onClick={handleCloseLogout} style={{ display: mostrarCartelLogout ? 'flex' : 'none' }}>
            <div className="contenedorCartelLogout" onClick={noCerrar}>
                <h2>SESIÓN CERRADA</h2>
                <button onClick={handleCloseLogout}>Aceptar</button>
            </div>
        </div>
    );
}