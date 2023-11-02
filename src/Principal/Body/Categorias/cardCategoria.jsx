import './cardCategoria.css';
import imagen from '../../../Imagenes/categoria.jpg';

export default function CardCategoria(args) {
    return (
        <div className="contenedorPrincipalCardCategoria">
            <p className="nombreCategoria">{args.cat}</p>
            <div className="imagenContainer">
                <div className="sombraInterna"></div>
                <img className="imagenCategoria" src={imagen} alt="Imagen de la categoría"/>
            </div>
        </div>
    );
}