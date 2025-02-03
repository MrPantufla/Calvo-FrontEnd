import { useAuth } from "../../../../contextLogin";
import { useTienda } from "../../../../contextTienda";
import { useVariables } from "../../../../contextVariables";

export default function Arregla() {

    const { isMobile } = useTienda();

    const { state } = useAuth();

    const { 
        setMostrarEnvios, 
        setMostrarFacturacion, 
        setMostrarPagos 
    } = useVariables();

    const confirmar = () => {

        setMostrarEnvios(false);

        if (state.userInfo.cliente) {
            setMostrarFacturacion(true);
        }
        else {
            setMostrarPagos(true);
        }

    }

    return (
        <div className="contenedorPrincipalArregla aclaracionesConfirmarCompra">
            <p>
                -Por favor,<span> </span>
                <a href={isMobile ? `https://wa.me/5493456475294` : `https://web.whatsapp.com/send?phone=+5493456475294`} target='blank' rel='noopener noreferrer'>
                    comunicate
                </a>
                <span> </span>con ventas luego de hacer el pedido para coordinar la entrega
            </p>
            <div className="contenedorConfirmarBoton">
                <button className="confirmarBoton" onClick={() => confirmar()}>Confirmar</button>
            </div>
        </div>
    );
}