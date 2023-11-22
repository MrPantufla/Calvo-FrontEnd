import { useAuth } from '../contextLogin.jsx';
import './logout.css';

export default function Logout() {
    const auth = useAuth();

    const handleLogout = () => {
        localStorage.clear();
        auth.logout();
    }

    return (
        <div className="contenedorPrincipalLogout">
            <button className="botonlogout" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}