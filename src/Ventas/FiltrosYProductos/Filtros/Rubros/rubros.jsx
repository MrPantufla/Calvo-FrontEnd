import './rubros.css';
import { useTienda } from '../../../../contextTienda';
import Srubros from '../Srubros/srubros.jsx';

export default function Rubros(args) {

    const {
        rubroActivo,
        togglearRubro,
        limpiarColoresActivos,
        setCortinasSelected,
        setEliminadosSelected
    } = useTienda();

    const handleScrollClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <label className={`labelRubros ${rubroActivo == args.rubro.id ? 'checked' : ''} label${args.rubro.nombre} desplegable`} key={args.rubro.nombre}>
            <div>
                <input
                    className="check"
                    type="checkbox"
                    checked={rubroActivo == args.rubro.id}
                    onChange={() => {
                        togglearRubro(args.rubro.id);
                    }}
                    onClick={() => {
                        handleScrollClick();
                        args.setPaginaActual(1);
                        limpiarColoresActivos();
                        setCortinasSelected(false);
                        setEliminadosSelected(false);
                    }}
                    id={args.rubro.nombre + "id"}
                />
                <div className="textoRubro">
                    <p className="nombreRubro">{args.rubro.nombre}</p>
                    <p className="flechaRubro">{args.rubro.srubros ? (<svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>) : (<></>)}</p>
                </div>
            </div>
            {rubroActivo == args.rubro.id &&
                <Srubros rubro={args.rubro} coloresUnicos={args.coloresUnicos} setPaginaActual={args.setPaginaActual} />
            }
        </label>
    );
}