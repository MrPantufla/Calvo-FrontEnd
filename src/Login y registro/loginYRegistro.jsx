import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';

export default function LoginYRegistro(){
    return(
        <div className="contenedorPrincipalLoginYRegistro">
            <Login/>
            <Registro/>
            <ConfirmacionCodigo/>
        </div>
    );
}