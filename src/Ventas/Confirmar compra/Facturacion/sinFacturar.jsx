import { useVariables } from "../../../contextVariables";

export default function SinFacturar() {

    const {
        setMostrarFacturacion
    } = useVariables();

    const confirmar = () =>{
        setMostrarFacturacion(false);
    }

    return (
        <div className="contenedorConfirmarBoton">
            <button onClick={() => confirmar()} className="confirmarBoton">Confirmar</button>
        </div>
    );
}