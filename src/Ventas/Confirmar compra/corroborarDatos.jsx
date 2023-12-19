import { useAuth } from "../../contextLogin";
import { useDireccion } from "../../contextDireccion";
import { useCarrito } from "../../contextCarrito";
import CardCarrito from "../Carrito/cardCarrito";

export default function CorroborarDatos() {
    const auth = useAuth();
    const direccion = useDireccion();
    const carrito = useCarrito();

    return (
        <div className="contenedorPrincipalCorroborarDatos">
            <h2>Revisa los datos de tu pedido</h2>
            <div className="direccionYDatosContainer">
                <p>Nombre y apellido: {auth.nombre} {auth.apellido}</p>
                <p>Dirección: {direccion.calle} {direccion.numero}</p>
                <p>C.P: {direccion.cp}</p>
                <p>Localidad: {direccion.localidad}</p>
                <p>Provincia: {direccion.provincia}</p>
            </div>
            <div className="productosContainer">
                {console.log(carrito.elementos)}
                {carrito.elementos.map((elemento, index) => (
                    <CardCarrito
                        key={index}
                        id={elemento.id}
                        cantidad={elemento.cantidad}
                    />
                ))}
            </div>
            <div className="botonCorroborarContainer">
                <button className="botonCorroborarDatos" onClick={() => { carrito.confirmarCompra(); carrito.limpiarCarrito(); carrito.setConfirmarCompraAbierto(false)}}>
                    Confirmar compra
                </button>
            </div>
        </div>
    );
}