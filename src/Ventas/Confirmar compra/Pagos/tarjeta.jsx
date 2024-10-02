import { useVariables } from '../../../contextVariables';
import './tarjeta.css';

export default function Tarjeta() {
    const {
        setMostrarPagos,
        setMostrarFacturacion
    } = useVariables();

    const confirmar = () => {
        setMostrarPagos(false);
        setMostrarFacturacion(true);
    }

    return (
        <>
            <div className="contenedorFormConfirmarCompra">
                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="numeroTarjeta">Número de tarjeta</label>
                    <input id="numeroTarjeta" type="number" />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="mesCaducidad" />
                    <input id="mesCaducidad" type="number" />

                    <label htmlFor="anioCaducidad" />
                    <input id="anioCaducidad" type="number" />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="codigoSeguridad" />
                    <input id="codigoSeguridad" type="number" />
                </div>
            </div>

            <div className="contenedorConfirmarBoton">
                <button onClick={() => confirmar()} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}