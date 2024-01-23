import './headerMobile.css';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoCalvo from '../../Imagenes/logo calvo.png';
import calvoNegativo from '../../Imagenes/calvoNegativo.png';

export default function HeaderMobile() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();

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
                <div className="containerContainerLogoMobile">
                    <div className="containerLogoMobile">
                    <img src={location.pathname === '/home' ? LogoCalvo : calvoNegativo} alt="Logo" />
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
                            <p>VENTAS</p>
                        </NavLink>

                        <a href="#quienesSomos" className="elemento" onClick={toggleMenu}>
                            <p>QUIÉNES SOMOS</p>
                        </a>
                        <a href="#contacto" className="elemento" onClick={toggleMenu}>
                            <p>CONTACTO</p>
                        </a>
                        <a className="elemento" onClick={toggleMenu}>
                            <p>PERFIL</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
