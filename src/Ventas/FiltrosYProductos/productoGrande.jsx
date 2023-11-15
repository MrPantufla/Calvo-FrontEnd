import './productoGrande.css';
import perfil from '../../Imagenes/perfil.jpg';
import { useCarrito } from '../../context.jsx';

export default function ProductoGrande(props) {
    const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
    const elementoExistente = elementosCarrito.find((elemento) => elemento.cod_orig === props.cod_orig);
    const cantidad = elementoExistente ? elementoExistente.cantidad : 0;

    const sumarContador = () => {
        añadirElemento(props.cod_orig, props.detalle, 1, 777);
    }

    const restarContador = () => {
        if (cantidad > 0) {
            restarElemento(props.cod_orig);
        }
    }

    const handleClose = () => {
        props.onClose();
    };

    const handleParteUtilizableClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="contenedorPrincipalProductoGrande" onClick={handleClose}>
            <div className="parteUtilizableProductoGrande" onClick={handleParteUtilizableClick}>
                <div className="botonCerrarContainer">
                    <button className="botonCerrarProductoGrande" onClick={handleClose}>
                        X
                    </button>
                </div>
                <div className="productoGrandeContainer">
                    <div className="informacion">
                        <h1>{props.cod_orig}</h1>
                        <h2>{props.detalle}</h2>
                        <p>asdmhasfdhasfdhasgdv</p>
                    </div>
                    <img className="imagenProductoGrande" src={perfil} />
                    <div className="cantidad">
                        <button className="boton" onClick={restarContador}>-</button>
                        <span>{cantidad}</span>
                        <button className="boton" onClick={sumarContador}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}