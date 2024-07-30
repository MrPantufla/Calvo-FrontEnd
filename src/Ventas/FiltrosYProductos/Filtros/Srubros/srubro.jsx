import { useEffect } from "react";
import { useTienda } from "../../../../contextTienda";

export default function Srubro(args) {

    const {
        rubroActivo,
        srubroActivo,
        coloresActivos,
        setColoresActivos,
        togglearSrubro,
    } = useTienda();

    function toggleColor(color) {
        setColoresActivos(prevColoresActivos => {
            if (prevColoresActivos.includes(color)) {
                return prevColoresActivos.filter((r) => r !== color);
            } else {
                return [...prevColoresActivos, color];
            }
        });
    }

    const handleScrollClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className={`bodyFiltro bodyFiltroPerfil ${rubroActivo === args.rubro.id ? 'checked' : ''}`} key={`${args.srubro.id}.${args.index}`}>
            <label id="labelSrubro" className={`labelSrubro ${parseInt(srubroActivo) === args.srubro.id ? 'checked' : ''} ${args.coloresUnicos.length > 0 && 'conColores'}`} key={`${args.rubro.id}.${args.srubro.id}`}>
                <div className="nombreSrubro">
                    <input
                        className="srubroCheck"
                        type="checkbox"
                        onClick={() => {
                            setColoresActivos([]);
                            togglearSrubro(args.srubro.id);
                            handleScrollClick();
                            args.setPaginaActual(1);
                        }}
                    />
                    <div className="textoSrubro">
                        <p className="nombreSrubro">{args.srubro.nombre}</p>
                        <p className="flechaSrubroContainer">
                            {(args.rubro.id !== 39 && args.rubro.id !== 81 && args.rubro.id !== 85 && args.rubro.id !== 12 && args.rubro.id !== 'Maquinas' && args.rubro.id !== 'Herramientas') &&
                                (<svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                </svg>)
                            }
                        </p>
                    </div>
                </div>
                <div className="coloresSrubrosContainer">
                {srubroActivo === args.srubro.id && (
                    args.coloresUnicos.length > 0 && (
                        args.coloresUnicos.map((color) => (
                            <label className={`labelColor ${coloresActivos.includes(color) && 'checked'}`} key={color}>
                                <input
                                    className="srubroCheck"
                                    type="checkbox"
                                    onClick={() => {
                                        toggleColor(color);
                                        args.setPaginaActual(1);
                                    }}
                                />
                                <p className="textoColorFiltros">{color}</p>
                            </label>
                        ))
                    ))}
                    </div>
            </label>
        </div>
    );
}