import { useVariables } from "../../../contextVariables";

export default function SinFacturar() {

    const {
        setMostrarFacturacion,
        setMostrarFinalizarPedido
    } = useVariables();

    const confirmar = (e, datosPedido) => {
        e.preventDefault();

        setMostrarFacturacion(false);
        setMostrarFinalizarPedido(true);
    }

    return (
        <div className="contenedorConfirmarBoton">
            <button onClick={(e) => confirmar(e, 'Sin facturar')} className="confirmarBoton">Confirmar</button>
        </div>
    );
}