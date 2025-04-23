import './headerMobile.css';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoCalvo from '../../Imagenes/logo_calvo.webp';
import calvoNegativo from '../../Imagenes/calvoNegativo.webp';
import { useTienda } from '../../contextTienda';
import { useAuth } from '../../contextLogin';
import { useNavigate } from 'react-router-dom';
import { useFavoritos } from '../../contextFavoritos';
import { useCarrito } from '../../contextCarrito';

export default function HeaderMobile() {
    const {
        menuAbierto, 
        setMenuAbierto
    } = useTienda();

    const location = useLocation();

    const { isFold } = useTienda();

    const {
        state,
        setMostrarLogin,
        setOpcionSeleccionada,
        logout
    } = useAuth();

    const { setFavoritos } = useFavoritos();

    const navigate = useNavigate();
    const [catalogosOpen, setCatalogosOpen] = useState(false);

    const handleInicioClick = () => {
        window.scrollTo(0, 0);
    };

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
        setCatalogosOpen(false);
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
        setOpcionSeleccionada('login');
        setMostrarLogin(true);
        setMenuAbierto(false);
    }

    const mostrarRegistro = () => {
        setOpcionSeleccionada('registro');
        setMostrarLogin(true);
        setMenuAbierto(false);
    }

    const handleCerrarSesion = async () => {
        navigate('/');
        logout();
        setFavoritos('');
        setMenuAbierto(false);
    }

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

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (menuAbierto && !event.target.closest('.menu') && !event.target.closest('.containerBotonMobile')) {
                setMenuAbierto(false); // Cierra el menú
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [menuAbierto]);

    return (
        <header className="containerGeneralHeaderMobile">
            <div className="containerBotonYLogoMobile">
                <div className="containerBotonMobile">
                    <button className="botonHeader" id="toggleHeaderButton" onClick={toggleMenu} aria-label='abrirOCerrarMenu'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>
                <div className={`containerContainerLogoMobile ${isFold && location.pathname === '/tienda' ? 'foldTienda' : ''}`}>
                    <div className="containerLogoMobile">
                        <img src={location.pathname === '/tienda' ? calvoNegativo : LogoCalvo} alt="Logo" onClick={() => window.location.href = '/'} loading='lazy'/>
                    </div>
                </div>
            </div>
            <div className={`containerMenuMobile ${menuAbierto ? 'menuAbierto' : ''}`}>
                <div className="menu">
                    <div className="containerLogoMenu">
                        <img src={calvoNegativo} loading='lazy'/>
                    </div>
                    <div className="elementosMenu">
                        <NavLink to="/" className="elemento" onClick={() => { handleInicioClick(); toggleMenu(); }}>
                            <p>INICIO</p>
                        </NavLink>
                        <NavLink to="/tienda" className="elemento" onClick={() => { handleInicioClick(); toggleMenu(); }}>
                            <p>TIENDA</p>
                        </NavLink>
                        {location.pathname === "/" ? (
                            <>
                                {/*<a href="#quienesSomos" className="elemento" onClick={toggleMenu}>
                                    <p>QUIÉNES SOMOS</p>
                                </a>*/}
                                {<a href="#preguntasFrecuentes" className="elemento" onClick={toggleMenu}>
                                    <p>PREGUNTAS FRECUENTES</p>
                                </a>}
                                <a href="#contacto" className="elemento" onClick={toggleMenu}>
                                    <p>CONTACTO</p>
                                </a>
                            </>
                        ) : (
                            <>
                                {location.pathname === '/tienda' && (
                                    <div className={`elemento catalogos  ${catalogosOpen && 'open'}`}>
                                        <div className="textoCatalogosHeaderMobileContainer" onClick={() => { toggleCatalogos() }}>
                                            <p className="textoCatalogosHeaderMobile">CATÁLOGOS</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="var(--colorSecundario)" className="bi bi-caret-down-fill flechaCatalogos" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                        </div>
                                        <div className="bodyElemento">
                                            <p onClick={() => handleDownload('Catálogo Perfiles Calvo')}>PERFILES</p>
                                            <p onClick={() => handleDownload('Catálogo Accesorios Calvo')}>ACCESORIOS</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {state.logueado ?
                            (<>
                                <div className="elemento" onClick={() => { handleInicioClick(); toggleMenu(); state.logueado ? navigate("/misCompras") : setMostrarLogin(true) }}>
                                    <p>MIS COMPRAS</p>
                                </div>
                                {state.userInfo ? ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'ventas') && (<div className="elemento" onClick={() => navigate("/editarUsuarios")}><p>EDITAR USUARIOS</p></div>)) : ''}
                                <NavLink to={ruta} onClick={() => {handleToggleLogin(); toggleMenu();}} className="miPerfilNavLink elemento"><p>MI PERFIL</p></NavLink>
                                <div className="elemento" onClick={handleCerrarSesion} style={{ marginTop: '2.5rem' }}><p>CERRAR SESIÓN</p></div>
                            </>)
                            :
                            (<>
                                <div className="elemento" onClick={mostrarIniciarSesion} style={{ marginTop: '2.5rem' }}><p>INICIAR SESIÓN</p></div>
                                <div className="elemento" onClick={mostrarRegistro}><p>REGISTRARME</p></div>
                            </>)
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}
