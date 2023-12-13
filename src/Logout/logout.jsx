import { useAuth } from '../contextLogin.jsx';
import './logout.css';
import { useFavoritos } from '../favoritosContext.jsx';

export default function Logout() {
    const favoritos = useFavoritos();
    const auth = useAuth();

    const handleLogout = () => {
        localStorage.clear();
        favoritos.setFavoritos('');
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