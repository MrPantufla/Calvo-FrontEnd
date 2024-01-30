import './headerMobile.css';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoCalvo from '../../Imagenes/logo calvo.png';
import calvoNegativo from '../../Imagenes/calvoNegativo.png';
import { useTienda } from '../../contextTienda';
import { useAuth } from '../../contextLogin';
import { useNavigate } from 'react-router-dom';
import { useFavoritos } from '../../contextFavoritos';
import { useCarrito } from '../../contextCarrito';

export default function HeaderMobile() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();
    const tienda = useTienda();
    const auth = useAuth();
    const navigate = useNavigate();
    const favoritos = useFavoritos();
    const carrito = useCarrito();
    const [catalogosOpen, setCatalogosOpen] = useState(false);

    const handleInicioClick = () => {
        window.scrollTo(0, 0);
    };

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (menuAbierto) {
                setMenuAbierto(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuAbierto]);

    const mostrarIniciarSesion = () => {
        auth.setOpcionSeleccionada('login');
        auth.setMostrarLogin(true);
        setMenuAbierto(false);
    }

    const mostrarRegistro = () => {
        auth.setOpcionSeleccionada('registro');
        auth.setMostrarLogin(true);
        setMenuAbierto(false);
    }

    const handleCerrarSesion = async () => {
        navigate('/home');
        auth.logout();
        favoritos.setFavoritos('');
        carrito.limpiarCarrito();
        setMenuAbierto(false);
    }

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

    const handleDownload = (filename) => {
        const filePath = `${process.env.PUBLIC_URL}/Archivos/${filename}.pdf`;
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + filePath;
        link.download = `${filename}.pdf`;
        link.click();
    };

    const toggleCatalogos = () => {
        setCatalogosOpen(!catalogosOpen);
    }

    return (
        <div className="containerGeneralHeaderMobile">
            <div className="containerBotonYLogoMobile">
                <div className="containerBotonMobile">
                    <button className="botonHeader" id="toggleHeaderButton" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>
                <div className={`containerContainerLogoMobile ${tienda.isFold && location.pathname === '/tienda' ? 'foldTienda' : ''}`}>
                    <div className="containerLogoMobile">
                        <img src={location.pathname === '/tienda' ? calvoNegativo : LogoCalvo} alt="Logo" />
                    </div>
                </div>
            </div>
            <div className={`containerMenuMobile ${menuAbierto ? 'menuAbierto' : ''}`}>
                <div className="menu">
                    <div className="containerLogoMenu">
                        <img src={calvoNegativo} />
                    </div>
                    <div className="elementosMenu">
                        <NavLink to="/home" className="elemento" onClick={() => { handleInicioClick(); toggleMenu(); }}>
                            <p>INICIO</p>
                        </NavLink>
                        <NavLink to="/tienda" className="elemento" onClick={() => { handleInicioClick(); toggleMenu(); }}>
                            <p>TIENDA</p>
                        </NavLink>
                        {location.pathname === "/home" ? (
                            <>
                                <a href="#quienesSomos" className="elemento" onClick={toggleMenu}>
                                    <p>QUIÉNES SOMOS</p>
                                </a>
                                <a href="#contacto" className="elemento" onClick={toggleMenu}>
                                    <p>CONTACTO</p>
                                </a>
                            </>
                        ) : (
                            <>
                                <NavLink to="/misCompras" className="elemento" onClick={() => { handleInicioClick(); toggleMenu(); }}>
                                    <p>MIS COMPRAS</p>
                                </NavLink>
                                {location.pathname === '/tienda' && (
                                    <div className={`elemento catalogos  ${catalogosOpen ? 'open' : ''}`}>
                                        <div className="textoCatalogosHeaderMobileContainer" onClick={() => { toggleCatalogos(); console.log("xd"); }}>
                                            <p className="textoCatalogosHeaderMobile">CATÁLOGOS</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="var(--colorSecundario)" className="bi bi-caret-down-fill flechaCatalogos" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                        </div>
                                        <div className="bodyElemento">
                                            <p onClick={() => handleDownload('perfiles')}>PERFILES</p>
                                            <p onClick={() => handleDownload('accesorios')}>ACCESORIOS</p>
                                            <p onClick={() => handleDownload('herramientas')}>HERRAMIENTAS</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {auth.state.logueado ?
                            (<>
                                <NavLink to={ruta} onClick={handleToggleLogin} className="miPerfilNavLink elemento"><p>MI PERFIL</p></NavLink>
                                <a className="elemento" onClick={handleCerrarSesion} style={{ marginTop: '2.5rem' }}><p>CERRAR SESIÓN</p></a>
                            </>)
                            :
                            (<>
                                <a className="elemento" onClick={mostrarIniciarSesion} style={{ marginTop: '2.5rem' }}><p>INICIAR SESIÓN</p></a>
                                <a className="elemento" onClick={mostrarRegistro}><p>REGISTRARME</p></a>
                            </>
                            )}
                    </div>

                </div>
            </div>
        </div>
    );
}
