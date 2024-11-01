import { useVariables } from "../../../contextVariables";
import { useFinalizarCompra } from '../../../contextFinalizarCompra';
import { useCarrito } from "../../../contextCarrito";

export default function ConsumidorFinal() {

    const {
        setErrorMessage,
        nombreYApellido,
        setNombreYApellido,
        cp,
        setCp,
        localidad,
        setLocalidad,
        direccion,
        setDireccion,
        dni,
        setDni,
        almacenarFacturacion
    } = useFinalizarCompra();

    const { 
        setMostrarFacturacion,
        setMostrarFinalizarPedido
    } = useVariables();

    const {
        confirmarCompra,
        limpiarCarrito
    } = useCarrito();

    const confirmar = (e) => {
        e.preventDefault();

        const numerosRegex = /^[0-9]+$/;

        if (!nombreYApellido || !cp || !direccion || !dni || !localidad) {
            setErrorMessage('Por favor, completa todos los campos')
            return;
        }
        else if (!numerosRegex.test(dni)) {
            setErrorMessage('DNI solo puede contener números')
            return;
        }
        else if (dni.length > 9) {
            setErrorMessage('DNI demasiado largo')
            return;
        }

        let datosPedido = 'Facturar a ' + nombreYApellido + ', CP: ' + cp + ', DIRECCION: ' + direccion + ", DNI: " + dni;

        setMostrarFacturacion(false);
        limpiarCarrito();
        //setMostrarFinalizarPedido(true);
        confirmarCompra(datosPedido)
        almacenarFacturacion()
    }

    return (
        <>
            <div className="contenedorFormConfirmarCompra">
                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="nombreYApellido">NOMBRE Y APELLIDO</label>
                    <input id="nombreYApellido"
                        value={nombreYApellido}
                        onChange={(e) => setNombreYApellido(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="cp">CP</label>
                    <input id="cp"
                        value={cp}
                        onChange={(e) => setCp(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="localidad">LOCALIDAD</label>
                    <input id="localidad"
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="direccionFacturacion">DIRECCIÓN FISCAL</label>
                    <input id="direccionFacturacion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="dni">DNI</label>
                    <input id="dni"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                    />
                </div>
            </div>
            <div className="contenedorConfirmarBoton">
                <button onClick={(e) => confirmar(e)} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}