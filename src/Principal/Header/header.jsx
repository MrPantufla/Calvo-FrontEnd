import './header.css';
import logo from '../../Imagenes/logo_calvo.webp';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextLogin';
import { useDesplegableCatalogos } from '../../contextDesplegableCatalogos';
import Carrito from '../../Ventas/Carrito/carrito';
import Favoritos from '../../Ventas/Favoritos/favoritos';
import { useDesplegablePerfil } from '../../contextDesplegablePerfil';
import { useTienda } from '../../contextTienda';

export default function Header() {
  const navigate = useNavigate();

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const location = useLocation();

  const { 
    hovered, 
    abrirHover, 
    cerrarHover, 
    setAnchoPerfil, 
    setAnchoCatalogos, 
    toggleHover 
  } = useDesplegableCatalogos();

  const { 
    perfilHovered, 
    abrirPerfil, 
    cerrarPerfil, 
    togglePerfil 
  } = useDesplegablePerfil();

  const { 
    mobile, 
    salirDeTienda 
  } = useTienda();
  const { state } = useAuth();

  const params = new URLSearchParams(location.search);

  const headerStyle = {
    height: `${8}rem`,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    display: mobile ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'right'
  };

  const decoracionStyle = {
    clipPath: `polygon(0 0, 100% 0, 100% 100%, ${8 * 0.68}rem 100%)`
  };

  const handleInicioClick = () => {
    for (const key of params.keys()) {
      params.delete(key);
    }
    salirDeTienda();
    
    window.scrollTo(0, 0);
  };

  const handleResize = () => {
    const perfilElement = document.getElementById("perfilHeader");
    if (perfilElement) {
      setAnchoPerfil(perfilElement.offsetWidth);
    }

    const catalogosElement = document.getElementById("catalogosHeader");
    if (catalogosElement) {
      setAnchoCatalogos(catalogosElement.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener('load', handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);

  useEffect(() => {
    const detectTouch = () => {
      setIsTouchDevice(true);
      window.removeEventListener('touchstart', detectTouch);
      window.removeEventListener('mousemove', detectMouse);
    };

    const detectMouse = () => {
      setIsTouchDevice(false);
      window.removeEventListener('touchstart', detectTouch);
      window.removeEventListener('mousemove', detectMouse);
    };

    window.addEventListener('touchstart', detectTouch, { passive: true });
    window.addEventListener('mousemove', detectMouse);

    return () => {
      window.removeEventListener('touchstart', detectTouch);
      window.removeEventListener('mousemove', detectMouse);
    };
  }, []);

  return (
    <header className="container-fluid px-0 contenedorPrincipalHeader" id="header" style={headerStyle}>
      <div className="decoracionGris decoracionHeader" style={decoracionStyle}>
        <div className="decoracionRoja decoracionHeader" style={decoracionStyle} />
      </div>
      <div className="row filaHeader">
        <div className="col-12 col-sm-4 logoContainer columnas">
          <a href="/" className="logo" >
            <img className="imagenLogo" src={logo} alt="logo_calvo_aluminios" loading='lazy'/>
          </a>
        </div>
        <div className="col-12 col-sm-8 secciones columnas" style={{ paddingRight: location.pathname === '/tienda' ? '12rem' : '0' }}>
          <div className="seccion" onClick={() => { handleInicioClick(); navigate('/', { replace: true }) }}>
            <p>INICIO</p>
          </div>
          <div className="seccion" onClick={() => { handleInicioClick(); navigate('/tienda', { replace: true }) }}>
            <p>TIENDA</p>
          </div>
          {location.pathname === '/' && (
            <a href="#preguntasFrecuentes" className="seccion">
              <p>PREGUNTAS FRECUENTES</p>
            </a>
          )}
          {/*location.pathname === '/' && (
            <a href="#quienesSomos" className="seccion">
              <p>QUIÉNES SOMOS</p>
            </a>
          )*/}
          {location.pathname === '/' ? (
            <a href="#contacto" className="seccion">
              <p>CONTACTO</p>
            </a>
          ) : location.pathname === '/tienda' && (
            <div
              className={`catalogosYArrow seccion ${(hovered) && 'hovered'}`}
              onMouseEnter={!isTouchDevice ? abrirHover : undefined}
              onMouseLeave={!isTouchDevice ? cerrarHover : undefined}
              onClick={() => toggleHover()}
              id="catalogosHeader"
            >
              <p>
                CATÁLOGOS
                <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-caret-down-fill flechaCatalogos" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </p>
            </div>
          )}
          <div
            id="perfilHeader"
            className={`perfil ${perfilHovered && 'perfilHovered'}`}
            onMouseEnter={!isTouchDevice ? abrirPerfil : undefined}
            onMouseLeave={!isTouchDevice ? cerrarPerfil : undefined}
            onClick={() => togglePerfil()}
            style={{ width: location.pathname === '/tienda' ? '15rem' : '23rem' }}
          >
            {state.logueado ? (
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
                {state.userInfo.nombre.toUpperCase()}
              </p>
            ) : (
              <div className="iconoContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </div>
            )}
          </div>
          {location.pathname === '/tienda' ? (
            <>
              <Carrito />
              <Favoritos />
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
