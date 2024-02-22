import './desplegablePerfil.css';
import { useDesplegablePerfil } from '../../../contextDesplegablePerfil';
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextLogin';
import { useFavoritos } from '../../../contextFavoritos';
import { useCarrito } from '../../../contextCarrito';

export default function DesplegablePerfil() {
    const location = useLocation();
    const [perfilTop, setPerfilTop] = useState(7.1);
    const navigate = useNavigate();
    const rightDesplegablePerfil = location.pathname === '/tienda' ? '10.2rem' : '0';

    const {
        perfilHovered,
        abrirPerfil,
        cerrarPerfil
    } = useDesplegablePerfil();

    const {
        state,
        logout,
        setMostrarLogin,
        setOpcionSeleccionada
    } = useAuth();

    const {setFavoritos} = useFavoritos();
    
    const {limpiarCarrito} = useCarrito();

    let ruta;
    if (state.logueado) {
        ruta = state.userInfo.email_confirmado ? "/perfil" : "";
    }
    else {
        ruta = "";
    }

    const handleToggleLogin = () => {
        if (!state.logueado) {
            setMostrarLogin(true);
        }
        else {
            if (!state.userInfo.email_confirmado) {
                setMostrarLogin(true);
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
        logout();
        setFavoritos('');
        limpiarCarrito();
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
        setOpcionSeleccionada('login');
        setMostrarLogin(true);
    }

    const mostrarRegistro = () => {
        setOpcionSeleccionada('registro');
        setMostrarLogin(true);
    }

    return (
        <div
            className={`desplegablePerfil ${perfilHovered ? 'open' : ''} ${state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? 'admin' : ''): ''}`}
            onMouseEnter={() => {
                abrirPerfil();
            }}
            onMouseLeave={cerrarPerfil}
            style={stylePerfil}
        >
            <div className="desplegablePerfilContainer">
                {state.logueado ?
                    (<>
                        <NavLink to={ruta} onClick={handleToggleLogin} className="miPerfilNavLink">MI PERFIL</NavLink>
                        <a onClick={handleCerrarSesion}>CERRAR SESIÓN</a>
                        {state.userInfo ? (state.userInfo.tipo_usuario == 'admin' && (<a onClick={() => navigate("/editarUsuarios")}>EDITAR USUARIOS</a>)) : ''}
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