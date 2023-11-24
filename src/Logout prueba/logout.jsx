import { useAuth } from '../contextLogin.jsx';
import './logout.css';

export default function Logout() {
    const auth = useAuth();

    const handleLogout = () => {
        localStorage.clear();
        auth.logout();
        auth.setMostrarCartelLogout(true);
    }

    return (
        <div className="contenedorPrincipalLogout" style={{display: auth.state.logueado? 'inline' : 'none'}}>
            <button className="botonlogout" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}