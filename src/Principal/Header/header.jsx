import './header.css';
import logo from '../../Imagenes/logoTransparente-min.png';

export default function Header(){
    return(
        <div className="container-fluid px-0 contenedorPrincipalHeader" id="header">
            <div className="row fila">
                <div className="col-4 logoContainer columnas">
                    <img className="logo" src={logo} alt="logo_calvo_aluminios"/>
                </div>
                <div className="col-6 secciones columnas">
                    <a className="seccion" href="home">INICIO</a>
                    <a className="seccion" href="ventas">VENTAS</a>
                    <a className="seccion">CONTACTO</a>
                </div>
                <div className="col-2 perfil columnas">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill logoPerfil" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
    <p>Mi perfil</p>
                </div>
            </div>
        </div>
    );
}

