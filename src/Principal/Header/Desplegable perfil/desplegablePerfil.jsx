import './desplegablePerfil.css';
import { useDesplegablePerfil } from '../../../contextDesplegablePerfil';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contextLogin';
import { useFavoritos } from '../../../contextFavoritos';
import { useDesplegableCatalogos } from '../../../contextDesplegableCatalogos';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../../contextCarrito';

export default function DesplegablePerfil() {
    const location = useLocation();
    const perfil = useDesplegablePerfil();
    const [perfilTop, setPerfilTop] = useState(7.1);
    const auth = useAuth();
    const favoritos = useFavoritos();
    const catalogos = useDesplegableCatalogos();
    const navigate = useNavigate();
    const carrito = useCarrito();

    const rightDesplegablePerfil = location.pathname === '/tienda' ? '10.2rem' : '0';

    let ruta;
    if (auth.state.logueado) {
        ruta = auth.state.userInfo.email_confirmado ? "/perfil" : "";
    }
    else {
        ruta = "";
    }

    const handleToggleLogin = () => {
        if (!auth.state.logueado) {
            auth.setMostrarLogin(true);
        }
        else {
            if (!auth.state.userInfo.email_confirmado) {
                auth.setMostrarLogin(true);
            }
        }
    };

    const stylePerfil = {
        right: rightDesplegablePerfil,
        top: `${perfilTop}rem`,
        width: location.pathname == "/tienda" ? `calc(var(--rightAnchoPerfil) - 2.7rem)` : `calc(var(--rightAnchoPerfil) - 3.4rem)`
    }

    const handleCerrarSesion = async () => {
        navigate('/home');
        auth.logout();
        favoritos.setFavoritos('');
        carrito.limpiarCarrito();
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const maxPerfilTop = 7.1; // ajusta el valor máximo de altura según tus necesidades
            const minPerfilTop = 6.1; // ajusta el valor mínimo de altura según tus necesidades
            const alturaHeader = 150; // ajusta según tus necesidades

            // Calcula la nueva posición top en función del scroll
            let newTop =
                maxPerfilTop -
                (maxPerfilTop - minPerfilTop) * (scrollPosition / alturaHeader);

            // Asegúrate de que newTop no sea menor que el valor mínimo de 7
            newTop = Math.max(minPerfilTop, newTop);

            // Establece la nueva posición top
            setPerfilTop(newTop);
        };

        // Agrega el event listener para el scroll
        window.addEventListener('scroll', handleScroll);

        // Limpia el event listener al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const mostrarIniciarSesion = () => {
        auth.setOpcionSeleccionada('login');
        auth.setMostrarLogin(true);
    }

    const mostrarRegistro = () => {
        auth.setOpcionSeleccionada('registro');
        auth.setMostrarLogin(true);
    }

    return (
        <div
            className={`desplegablePerfil ${perfil.perfilHovered ? 'open' : ''}`}
            onMouseEnter={() => {
                perfil.abrirPerfil();
            }}
            onMouseLeave={perfil.cerrarPerfil}
            style={stylePerfil}
        >
            <div className="descargarPerfilContainer">
                {auth.state.logueado ?
                    (<>
                        <NavLink to={ruta} onClick={handleToggleLogin} className="miPerfilNavLink">MI PERFIL</NavLink>
                        <a onClick={handleCerrarSesion}>CERRAR SESIÓN</a>
                    </>)
                    :
                    (<>
                        <a onClick={mostrarIniciarSesion}>INICIAR SESIÓN</a>
                        <a onClick={mostrarRegistro}>REGISTRARME</a>
                    </>
                    )}
            </div>
        </div>
    );
}