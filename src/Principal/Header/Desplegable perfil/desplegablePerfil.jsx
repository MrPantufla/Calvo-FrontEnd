import './desplegablePerfil.css';
import { useDesplegablePerfil } from '../../../contextDesplegablePerfil';
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextLogin';
import { useFavoritos } from '../../../contextFavoritos';
import { useCarrito } from '../../../contextCarrito';

export default function DesplegablePerfil() {
    const location = useLocation();

    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);

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

    const { setFavoritos } = useFavoritos();

    const { limpiarCarrito } = useCarrito();

    let rutaPerfil;
    if (state.logueado) {
        rutaPerfil = state.userInfo.email_confirmado ? "/perfil" : "";
    }
    else {
        rutaPerfil = "";
    }

    let rutaMisCompras;
    if (state.logueado) {
        rutaMisCompras = state.userInfo.email_confirmado ? "/misCompras" : "";
    }
    else {
        rutaMisCompras = "";
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
        top: `${6.1}rem`,
        width: location.pathname == "/tienda" ? `calc(var(--rightAnchoPerfil) - 2.7rem)` : `calc(var(--rightAnchoPerfil) - 3.4rem)`
    }

    const handleCerrarSesion = async () => {
        navigate('/');
        logout();
        setFavoritos('');
        limpiarCarrito();
    }

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
            className={`desplegablePerfil ${perfilHovered ? 'open' : ''} ${state.logueado ? 'logueado' : ''} ${state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? 'admin' : '') : ''}`}
            onMouseEnter={() => {
                abrirPerfil();
            }}
            onMouseLeave={cerrarPerfil}
            style={stylePerfil}
        >
            <div className="desplegablePerfilContainer">
                {state.logueado ?
                    (<>
                        <div onClick={() => { handleToggleLogin(); cerrarPerfil(); navigate(rutaPerfil, { replace: true }) }} className="perfilNavLink">MI PERFIL</div>
                        <div onClick={() => { handleToggleLogin(); cerrarPerfil(); navigate(rutaMisCompras, { replace: true }) }} className="perfilNavLink">MIS COMPRAS</div>
                        {state.userInfo ? (state.userInfo.tipo_usuario == 'admin' && (<a onClick={() => { navigate("/editarUsuarios"); cerrarPerfil() }}>EDITAR USUARIOS</a>)) : ''}
                        <a onClick={() => { handleCerrarSesion(); cerrarPerfil() }}>CERRAR SESIÓN</a>
                    </>)
                    :
                    (<>
                        <a onClick={() => { mostrarIniciarSesion(); cerrarPerfil() }}>INICIAR SESIÓN</a>
                        <a onClick={() => { mostrarRegistro(); cerrarPerfil() }}>REGISTRARME</a>
                    </>
                    )}
            </div>
        </div>
    );
}