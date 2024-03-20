import './errorDireccion.css';
import { useConfiguracion } from '../../../contextConfiguracion';
import { useNavigate } from 'react-router-dom';

export default function ErrorDirecion(){
    const {abrirDireccion} = useConfiguracion();

    const navigate = useNavigate();

    const irAIngresarDireccion = () =>{
        abrirDireccion();
        navigate('/perfil');
    }

    return(
        <div className="contenedorPrincipalErrorDireccion">
            <div className="parteUtilizableErrorDireccion">
                <p>No hay una dirección cargada a tu cuenta o hay un problema con la actual, ingresa una para poder continuar con el pedido </p>
                <p className="segundoTexto"> Tu carrito se guardará</p>
                <button className="botonIngresarDireccion" onClick={irAIngresarDireccion}>
                    Ingresar dirección
                </button>
            </div>
        </div>
    );
}