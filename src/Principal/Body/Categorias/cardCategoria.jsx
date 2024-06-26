import './cardCategoria.css';
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../../../contextTienda';

export default function CardCategoria(args) {
    const navigate = useNavigate();
    
    const {
        togglearRubro,
        seleccionarCortinas
    } = useTienda();

    const navegarACategoria = () => {
        navigate('/tienda');
        setTimeout(() => {
            window.scrollTo(0, 0);
            args.cat == 'POLICARBONATOS Y POLIESTIRENOS' ? (togglearRubro(31)) : (togglearRubro(args.referencia));
            args.cat == 'CORTINAS' && (seleccionarCortinas())
        }, 100);
    };


    return (
        <div className="contenedorPrincipalCardCategoria" onClick={navegarACategoria}>
            <p className="nombreCategoria">{args.cat}</p>
            <div className="imagenContainerCategoria">
                <div className="sombraInterna"></div>
                <img className="imagenCategoria" src={/*imagen*/`/Categorias/${args.imagen}.jpeg`} alt="Imagen de la categoría" />
            </div>
        </div>
    );
}