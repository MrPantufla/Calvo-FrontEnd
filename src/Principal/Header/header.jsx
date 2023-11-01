import './header.css';
import logo from '../../Imagenes/logo calvo.png';
import React, { useEffect, useState } from 'react';

export default function Header() {
    const [headerSize, setHeaderSize] = useState(17);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const scrollHeight = document.body.scrollHeight - window.innerHeight;
          const maxSize = 17;
          const minSize = 8;
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

    return (
        <div className="container-fluid px-0 contenedorPrincipalHeader" id="header" style={headerStyle}>
            <div className="row fila">
                <div className="col-4 logoContainer columnas">
                    <img className="logo" src={logo} alt="logo_calvo_aluminios" />
                </div>
                <div className="col-8 secciones columnas">
                    <a className="seccion" href="home"><p>INICIO</p></a>
                    <a className="seccion"><p>QUIÉNES SOMOS</p></a>
                    <a className="seccion" href="ventas"><p>TIENDA</p></a>
                    <a className="seccion"><p>CONTACTO</p></a>
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

