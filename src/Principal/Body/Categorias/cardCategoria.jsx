import './cardCategoria.css';
import imagen from '../../../Imagenes/categoria.jpg';

export default function CardCategoria(args) {
    return (
        <div class="contenedorPrincipalCardCategoria">
            <p class="nombreCategoria">{args.cat}</p>
            <div class="imagenContainer">
                <div class="sombraInterna"></div>
                <img class="imagenCategoria" src={imagen} alt="Imagen de la categoría"/>
            </div>
        </div>
    );
}