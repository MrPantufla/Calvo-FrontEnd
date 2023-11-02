import './header.css';
import logo from '../../Imagenes/logo calvo.png';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [headerSize, setHeaderSize] = useState(12);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const maxSize = 12;
      const minSize = 7;
      const minSizeScroll = scrollHeight - 150;

      let newSize;

      if (scrollHeight - scrollPosition <= minSizeScroll) {
        newSize = minSize;
      } else {
        newSize = minSize - ((scrollHeight - scrollPosition - minSizeScroll) / (scrollHeight - minSizeScroll)) * (minSize - maxSize);
      }

      setHeaderSize(newSize);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerStyle = {
    backgroundColor: 'var(--colorPrimario)',
    height: `${headerSize}rem`,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center'
  };

  const handleInicioClick = () => {
    if (location.pathname === '/home') {
      window.scrollTo(0, 0);
    }
  };

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <div className="container-fluid px-0 contenedorPrincipalHeader" id="header" style={headerStyle}>
      <div className="row fila">
        <div className="col-4 logoContainer columnas">
        <NavLink to="/home" onClick={handleReloadClick}><img className="logo" src={logo} alt="logo_calvo_aluminios" /></NavLink>
        </div>
        <div className="col-8 secciones columnas">
          <NavLink to="/home" className="seccion" onClick={handleInicioClick}>
            <p>INICIO</p>
          </NavLink>
          <NavLink to="/tienda" className="seccion">
            <p>TIENDA</p>
          </NavLink>
          <NavLink to="/quienes-somos" className="seccion">
            <p>QUIÉNES SOMOS</p>
          </NavLink>
          <NavLink to="/contacto" className="seccion">
            <p>CONTACTO</p>
          </NavLink>
          <a className="perfil">
            <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
