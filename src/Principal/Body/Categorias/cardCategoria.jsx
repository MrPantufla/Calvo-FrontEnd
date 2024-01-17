import './cardCategoria.css';
import imagen from '../../../Imagenes/categoria.jpg';
import { useNavigate } from 'react-router-dom';

export default function CardCategoria(args) {
    const navigate = useNavigate();

    const navegarACategoria = () => {
        navigate('/tienda');
        setTimeout(() => {
            const elemento = document.getElementById('labelPERFIL');
            elemento.dispatchEvent(new Event('click'));
        }, 200);
    }


    return (
        <div className="contenedorPrincipalCardCategoria" onClick={navegarACategoria}>
            <p className="nombreCategoria">{args.cat}</p>
            <div className="imagenContainerCategoria">
                <div className="sombraInterna"></div>
                <img className="imagenCategoria" src={imagen} alt="Imagen de la categoría" />
            </div>
        </div>
    );
}