import './headerMobile.css';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import LogoCalvo from '../../Imagenes/logo calvo.png'

export default function HeaderMobile() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();

    const handleInicioClick = () => {
        if (location.pathname === '/home') {
            window.scrollTo(0, 0);
        }
    };

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
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
                <div className="containerContainerLogoMobile">
                    <div className="containerLogoMobile">
                        <img src={LogoCalvo} />
                    </div>
                </div>
            </div>
            <Collapse className="containerMenuMobile" in={menuAbierto}>
                <div className="menu">
                    <div className="containerLogoMenu">
                        <img src={LogoCalvo} />
                    </div>
                    <div className="elementosMenu">
                        <NavLink to="/home" className="elemento" onClick={handleInicioClick}>
                            <p>INICIO</p>
                        </NavLink>
                        <NavLink to="/tienda" className="elemento">
                            <p>VENTAS</p>
                        </NavLink>
                        <a href="#quienesSomos" className="elemento">
                            <p>QUIÉNES SOMOS</p>
                        </a>
                        <a href="#contacto" className="elemento">
                            <p>CONTACTO</p>
                        </a>
                        <a className="elemento">
                            <p>PERFIL</p>
                        </a>
                    </div>
                </div>
            </Collapse>
        </div>
    );
}
