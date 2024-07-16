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
  const location = useLocation();

  const {
    hovered,
    abrirHover,
    cerrarHover,
    setAnchoPerfil,
    setAnchoCatalogos
  } = useDesplegableCatalogos();

  const {
    perfilHovered,
    abrirPerfil,
    cerrarPerfil
  } = useDesplegablePerfil();

  const { mobile } = useTienda();

  const {
    state,
  } = useAuth();

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
  }

  const handleInicioClick = () => {
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

  window.addEventListener("resize", handleResize);
  window.addEventListener('load', handleResize);

  useEffect(() => {
    handleResize();
  }, [])

  return (
    <header className="container-fluid px-0 contenedorPrincipalHeader" id="header" style={headerStyle}>
      <div className="decoracionGris decoracionHeader" style={decoracionStyle}>
        <div className="decoracionRoja decoracionHeader" style={decoracionStyle} />
      </div>
      <div className="row filaHeader">
        <div className="col-12 col-sm-4 logoContainer columnas">
          <img onClick={() =>window.location.href = '/'} className="logo" src={logo} alt="logo_calvo_aluminios" />
        </div>
        <div className="col-12 col-sm-8 secciones columnas" style={{ paddingRight: location.pathname === '/tienda' ? '11rem' : '0' }}>
          <NavLink to="/" className="seccion" onClick={() => handleInicioClick()}>
            <p>INICIO</p>
          </NavLink>
          <NavLink to="/tienda" className="seccion" onClick={() => handleInicioClick()}>
            <p>TIENDA</p>
          </NavLink>
          {location.pathname === '/' &&
            (<a href="#quienesSomos" className="seccion">
              <p>QUIÉNES SOMOS</p>
            </a>)
          }
          {location.pathname === '/' ?
            (<a href="#contacto" className="seccion">
              <p>CONTACTO</p>
            </a>)
            :
            (location.pathname === '/tienda' ?
              (<div className={`catalogosYArrow seccion ${hovered ? 'hovered' : ''}`} onMouseEnter={abrirHover} onMouseLeave={cerrarHover} id="catalogosHeader">
                <p>
                  CATÁLOGOS
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-caret-down-fill flechaCatalogos" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </p>
              </div>)
              :
              (<></>))
          }
          <div
            id="perfilHeader"
            className={`perfil ${perfilHovered ? 'perfilHovered' : ''}`} onMouseEnter={abrirPerfil} onMouseLeave={cerrarPerfil}
            style={{ width: location.pathname === '/tienda' ? '15rem' : '23rem' }}
          >{state.logueado ?
            (<p>
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg> {state.userInfo.nombre.toUpperCase()}
            </p>)
            :
            (<div className="iconoContainer">
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>)}

          </div>
          {location.pathname == '/tienda' ? (
            <>
              <Carrito />
              <Favoritos />
            </>)
            :
            (<></>)
          }
        </div>
      </div>
    </header >
  );
}