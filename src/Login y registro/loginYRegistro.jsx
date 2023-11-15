import Login from './Login/login';
import Registro from './Registro/registro';

export default function LoginYRegistro(){
    return(
        <div className="contenedorPrincipalLoginYRegistro">
            <Login/>
            <Registro/>
        </div>
    );
}