import { useTienda } from "../../../../contextTienda";
import Srubros from "../Srubros/srubros";

export default function Marcas(args) {

    const marca = args.marca;

    const { 
        togglearMarca,
        setColoresActivos,
        marcaActiva,
    } = useTienda();

    return (
        <label className={`labelMarcas ${marcaActiva == marca ? 'checked' : ''} label${marca.nombre} desplegable`} key={marca.nombre}>
            <div>
                <input
                    className="check"
                    type="checkbox"
                    checked={marcaActiva == marca}
                    onChange={() => {
                        togglearMarca(marca);
                    }}
                    onClick={() => {
                        args.handleScrollClick();
                        args.setPaginaActual(1);
                        setColoresActivos([]);
                    }}
                    id={marca.nombre + "id"}
                />
                <div className="textoMarca">
                    <p className="nombreMarca">{marca.nombre}</p>
                    <p className="flechaMarca">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </p>
                </div>
            </div>
            {marcaActiva == marca &&
                (<Srubros
                    rubro={args.rubro}
                    marca={marca}
                    setPaginaActual={args.setPaginaActual}
                    srubros={marca.srubros}
                />)
            }
        </label>
    );
}