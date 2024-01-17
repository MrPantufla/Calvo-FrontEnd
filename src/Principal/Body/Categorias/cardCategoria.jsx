import './cardCategoria.css';
import imagen from '../../../Imagenes/categoria.jpg';
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../../../contextTienda';

export default function CardCategoria(args) {
    const navigate = useNavigate();
    const tienda = useTienda();

    const navegarACategoria = () => {
        navigate('/tienda');
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        switch (args.cat) {
            case "PERFILES":
                tienda.setTiposActivos(["PERFIL"]);
                break;
            case "ACCESORIOS":
                tienda.setTiposActivos(["ACCESORIO"]);
                break;
            case "COMPLEMENTOS":
                tienda.setTiposActivos([""]);
                break;
            case "MÁQUINAS Y HERRAMIENTAS":
                tienda.setTiposActivos(["MAQUINAS", "HERRAMIENTAS"]);
                break;
            case "CORTNAS":
                tienda.setTiposActivos([""]);
                break;
            case "SOFTWARE":
                tienda.setTiposActivos([""]);
                break;
        }
    };


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