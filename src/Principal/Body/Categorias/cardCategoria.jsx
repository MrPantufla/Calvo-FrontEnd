import './cardCategoria.css';
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../../../contextTienda';

export default function CardCategoria(args) {
    const navigate = useNavigate();
    
    const {
        rubros,
        setRubroActivo,
        seleccionarCortinas,
        seleccionarProcesos
    } = useTienda();

    const navegarACategoria = () => {
        navigate('/tienda');
        setTimeout(() => {
            window.scrollTo(0, 0);

            let nav = args.referencia;

            nav == 'PolicarbonatosYPoliestirenos' && (nav = 'Policarbonatos');
            nav == 'MáquinasYHerramientas' && (nav = 'Maquinas');

            if(nav == 'Cortinas'){
                seleccionarCortinas(); 
            }
            if(nav == 'Procesos'){
                seleccionarProcesos();
            }
            else{
                setRubroActivo(rubros.find(rubroObjeto => rubroObjeto.id === nav));
            }
        }, 100);
    };

    return (
        <div className="contenedorPrincipalCardCategoria" onClick={navegarACategoria}>
            <p className="nombreCategoria">{args.cat}</p>
            <div className="imagenContainerCategoria">
                <div className="sombraInterna"></div>
                <img className="imagenCategoria" src={`/Categorias/${args.imagen}.webp`} alt="Imagen de la categoría" />
            </div>
        </div>
    );
}