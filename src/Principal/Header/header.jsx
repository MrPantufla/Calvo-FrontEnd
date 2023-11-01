import './header.css';
import logo from '../../Imagenes/logo calvo.png';

export default function Header() {
    return (
        <div className="container-fluid px-0 contenedorPrincipalHeader" id="header">
            <div className="row fila">
                <div className="col-4 logoContainer columnas">
                    <img className="logo" src={logo} alt="logo_calvo_aluminios" />
                </div>
                <div className="col-8 secciones columnas">
                    <a className="seccion" href="home">INICIO</a>
                    <a className="seccion">QUIÉNES SOMOS</a>
                    <a className="seccion" href="ventas">TIENDA</a>
                    <a className="seccion">CONTACTO</a>
                    <a className="seccion perfil"></a>
                </div>
            </div>
        </div>
    );
}

