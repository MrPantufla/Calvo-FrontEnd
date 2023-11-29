import './header.css';
import logo from '../../Imagenes/logo calvo.png';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logout from '../../Logout prueba/logout';
import { useAuth } from '../../contextLogin';
import { useDesplegable } from '../../contextDesplegable';

export default function Header() {
  const [headerSize, setHeaderSize] = useState(12);
  const location = useLocation();
  const mobile = (window.innerWidth < 768);

  const desplegable = useDesplegable();

  const auth = useAuth();
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

  function recargarPagina() {
    if (window.location.href.includes("/home")) {
      window.location.reload();
    }
    else {
      window.location.href = '/home';
    }
  }

  const headerStyle = {
    backgroundColor: 'var(--colorPrimario)',
    height: `${headerSize}rem`,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    display: mobile ? 'none' : 'flex',
    alignItems: 'center'
  };

  const handleInicioClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleResize = () => {
      const perfilElement = document.getElementById("perfilHeader");
      if (perfilElement) {
        desplegable.setAnchoPerfil(perfilElement.offsetWidth);
      }

      const catalogosElement = document.getElementById("catalogosHeader");
      if(catalogosElement){
        desplegable.setAnchoCatalogos(catalogosElement.offsetWidth);
      }
    };
  
    window.addEventListener("resize", handleResize);
  
    // Esperar hasta que el componente esté completamente cargado
    window.addEventListener("load", handleResize);
  
    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);


  return (
    <div className="container-fluid px-0 contenedorPrincipalHeader" id="header" style={headerStyle}>
      <Logout />
      <div className="row filaHeader">
        <div className="col-12 col-sm-4 logoContainer columnas">
          <img onClick={recargarPagina} className="logo" src={logo} alt="logo_calvo_aluminios" />
        </div>
        <div className="col-12 col-sm-8 secciones columnas">
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
            (<NavLink to="/perfil/misCompras" className="seccion">
              <p>MIS COMPRAS</p>
            </NavLink>)}

          {location.pathname === '/home' ?
            (<a href="#contacto" className="seccion">
              <p>CONTACTO</p>
            </a>)
            :
            (
              <div
              className={`catalogosYArrow seccion ${desplegable.hovered ? 'hovered' : ''}`}
                onMouseEnter={desplegable.abrirHover}
                onMouseLeave={desplegable.cerrarHover}
                id="catalogosHeader"
              >
                <p>
                  CATÁLOGOS
                  <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fillRule="currentColor" className="bi bi-arrow-down-short flechaCatalogos" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
                  </svg>
                </p>
              </div>
            )}
          <NavLink to={ruta} id="perfilHeader" className="perfil" onClick={handleToggleLogin}>
            <div className="iconoContainer">
              <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>
          </NavLink>
        </div>
      </div>
    </div >
  );
}