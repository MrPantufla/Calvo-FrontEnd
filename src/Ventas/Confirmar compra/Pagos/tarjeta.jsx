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
                <div className="form-group-tarjeta">
                    <label htmlFor="numeroTarjeta">Número de tarjeta</label>
                    <input id="numeroTarjeta" type="numer" />
                </div>

                <div className="form-group-tarjeta">
                    <label htmlFor="mesCaducidad" />
                    <input id="mesCaducidad" type="number" />
                </div>

                <div className="form-group-tarjeta">
                    <label htmlFor="anioCaducidad" />
                    <input id="anioCaducidad" type="number" />
                </div>

                <div className="form-group-tarjeta">
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