import Login from './Login/login';
import Registro from './Registro/registro';
import ConfirmacionCodigo from './Confirmacion codigo/confirmacionCodigo';
import { LoginProvider } from '../contextLogin';

export default function LoginYRegistro(){
    return(
        <LoginProvider>
            <Login/>
            <Registro/>
            <ConfirmacionCodigo/>
        </LoginProvider>
    );
}