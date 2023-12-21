import './header.css';
import logo from '../../Imagenes/logo calvo.png';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logout from '../../Logout/logout';
import { useAuth } from '../../contextLogin';
import { useDesplegableCatalogos } from '../../contextDesplegableCatalogos';
import Carrito from '../../Ventas/Carrito/carrito';
import Favoritos from '../../Ventas/Favoritos/favoritos';
import { useDesplegablePerfil } from '../../contextDesplegablePerfil';

export default function Header() {
  const [headerSize, setHeaderSize] = useState(10);
  const location = useLocation();
  const mobile = (window.innerWidth < 768);

  const desplegableCatalogos = useDesplegableCatalogos();
  const desplegablePerfil = useDesplegablePerfil();

  const auth = useAuth();

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const maxSize = 10;
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

    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function recargarPagina() {
    if (window.location.href.includes("/home")) {
      window.location.reload();
    }
    else {
      window.location.href = '/home';
    }
  }

  const headerStyle = {
    height: `${headerSize}rem`,
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
    clipPath: `polygon(0 0, 100% 0, 100% 100%, ${headerSize * 0.68}rem 100%)`
  }

  const handleInicioClick = () => {
    window.scrollTo(0, 0);
  };

  const handleResize = () => {
    const perfilElement = document.getElementById("perfilHeader");
    if (perfilElement) {
      desplegableCatalogos.setAnchoPerfil(perfilElement.offsetWidth);
    }

    const catalogosElement = document.getElementById("catalogosHeader");
    if (catalogosElement) {
      desplegableCatalogos.setAnchoCatalogos(catalogosElement.offsetWidth);
    }

    console.log("catalogos: " + desplegableCatalogos.anchoCatalogos);
  };

  window.addEventListener("resize", handleResize);
  window.addEventListener('load', handleResize);

  return (
    <div className="container-fluid px-0 contenedorPrincipalHeader" id="header" style={headerStyle}>
      <Logout />
      <div className="decoracionGris decoracionHeader" style={decoracionStyle}>
        <div className="decoracionRoja decoracionHeader" style={decoracionStyle}/>
      </div>
      <div className="row filaHeader">
        <div className="col-12 col-sm-4 logoContainer columnas">
          <img onClick={recargarPagina} className="logo" src={logo} alt="logo_calvo_aluminios" />
        </div>
        <div className="col-12 col-sm-8 secciones columnas" style={{ paddingRight: location.pathname === '/tienda' ? '11rem' : '0' }}>
          <NavLink to="/home" className="seccion" onClick={handleInicioClick}>
            <p>INICIO</p>
          </NavLink>
          <NavLink to="/tienda" className="seccion" onClick={handleInicioClick}>
            <p>TIENDA</p>
          </NavLink>
          {location.pathname === '/home' ?
            (<a href="#quienesSomos" className="seccion">
              <p>QUIÉNES SOMOS</p>
            </a>)
            :
            (<NavLink to="/misCompras" className="seccion">
              <p>MIS COMPRAS</p>
            </NavLink>)}

          {location.pathname === '/home' ?
            (<a href="#contacto" className="seccion">
              <p>CONTACTO</p>
            </a>)
            :
            (location.pathname === '/tienda' ?
              (<div className={`catalogosYArrow seccion ${desplegableCatalogos.hovered ? 'hovered' : ''}`} onMouseEnter={desplegableCatalogos.abrirHover} onMouseLeave={desplegableCatalogos.cerrarHover} id="catalogosHeader">
                <p>
                  CATÁLOGOS
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill flechaCatalogos" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </p>
              </div>)
              :
              (<></>))
          }
          <div 
            id="perfilHeader" 
            className={`perfil ${desplegablePerfil.perfilHovered ? 'perfilHovered' : ''}`} onMouseEnter={desplegablePerfil.abrirPerfil} onMouseLeave={desplegablePerfil.cerrarPerfil}  
            onClick={handleToggleLogin}
            style={{ width: location.pathname === '/tienda' ? '15rem' : '23rem' }}
          >
            <div className="iconoContainer">
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>
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
    </div >
  );
}