import Header from '../Principal/Header/header';
import BodyPerfil from './Body Perfil/bodyPerfil';
import Footer from '../Principal/Footer/footer.jsx';
import LoginYRegistro from '../Login y registro/loginYRegistro.jsx';
import { EditarContraseñaProvider } from '../contextEditarContraseña.jsx';
import { EditarDatosProvider } from '../contextEditarDatos.jsx';
import { DireccionesProvider } from '../contextDireciones.jsx';

export default function Perfil() {
    return (
        <div className="contenedorPrincipalPerfil">
            <Header />
            <LoginYRegistro />

            <DireccionesProvider>
                <EditarDatosProvider>
                    <EditarContraseñaProvider>
                        <BodyPerfil />
                    </EditarContraseñaProvider>
                </EditarDatosProvider>
            </DireccionesProvider>
            
            <Footer />
        </div>
    );
}