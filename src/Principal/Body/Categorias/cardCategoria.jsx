import './cardCategoria.css';
import imagen from '../../../Imagenes/categoria.jpg';
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../../../contextTienda';

export default function CardCategoria(args) {
    const navigate = useNavigate();
    const {
        setTiposActivos,
        seleccionarCortinas,
        setCortinasSelected,
        setEliminadosSelected
    } = useTienda();

    const navegarACategoria = () => {
        navigate('/tienda');
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        switch (args.cat) {
            case "PERFILES":
                setCortinasSelected(false);
                setEliminadosSelected(false);
                setTiposActivos(["PERFIL"]);
                break;
            case "ACCESORIOS":
                setCortinasSelected(false);
                setEliminadosSelected(false);
                setTiposActivos(["ACCESORIO"]);
                break;
            case "COMPLEMENTOS":
                setCortinasSelected(false);
                setEliminadosSelected(false);
                setTiposActivos([""]);
                break;
            case "MÁQUINAS Y HERRAMIENTAS":
                setCortinasSelected(false);
                setEliminadosSelected(false);
                setTiposActivos(["MAQUINAS", "HERRAMIENTAS"]);
                break;
            case "CORTINAS":
                seleccionarCortinas();
                setEliminadosSelected(false);
                break;
            case "SOFTWARE":
                setCortinasSelected(false);
                setEliminadosSelected(false);
                setTiposActivos([""]);
                break;
        }
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