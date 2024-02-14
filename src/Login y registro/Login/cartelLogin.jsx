import './cartelLogin.css';
import { useAuth } from '../../contextLogin';

export default function CartelLogin() {
    const auth = useAuth();

    const handleCloseLogin = () => {
        auth.setMostrarCartelLogin(false)
    }

    const noCerrar = (event) =>{
        event.stopPropagation();
    }

    return (
        <div className="contenedorPrincipalCartelLogin" onClick={handleCloseLogin} style={{ display: auth.mostrarCartelLogin ? 'flex' : 'none' }}>
            <div className="contenedorCartelLogin" onClick={noCerrar}>
                <h2>SESIÓN INICIADA COMO</h2>
                <h2>{auth.state.userInfo.nombre} {auth.state.userInfo.apellido}</h2>
                <button onClick={handleCloseLogin}>Aceptar</button>
            </div>
        </div>
    );
}