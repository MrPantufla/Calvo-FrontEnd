import { useVariables } from "../../../contextVariables";

export default function Efectivo() {

    const {
        setMostrarPagos,
        setMostrarFacturacion
    } = useVariables();

    const confirmar = () =>{
        setMostrarPagos(false);
        setMostrarFacturacion(true);
    }

    return (
        <div className="contenedorConfirmarBoton">
            <button className="confirmarBoton" onClick={() => confirmar()}>Confirmar</button>
        </div>
    );
}