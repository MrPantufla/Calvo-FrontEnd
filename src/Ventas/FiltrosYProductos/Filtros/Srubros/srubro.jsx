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

    const rubro = args.rubro;

    //Si estamos en el rubro de perfiles, los srubros pasan a ser los colores y viceversa. Marca se envía como argumento para saber dentro del Srubro si nos encontramos con el rubro "Perfiles" activo

    return (
        <div className={`bodyFiltro bodyFiltroPerfil ${rubroActivo === rubro ? 'checked' : ''}`} key={`${args.srubro.id}.${args.index}`}>
            <label id="labelSrubro" className={`labelSrubro ${srubroActivo === args.srubro && 'checked'} ${((args.marca ? (args.srubro.srubros && args.srubro.srubros.length > 1) : (args.srubro.colores && args.srubro.colores.length > 1) && !args.sinColores)) && 'conColores'}`} key={`${rubro.id}.${args.srubro.id}`}>
                <div className="nombreSrubro">
                    <input
                        className="srubroCheck"
                        type="checkbox"
                        onClick={() => {
                            setColoresActivos([]);
                            togglearSrubro(args.srubro);
                            handleScrollClick();
                            args.setPaginaActual(1);
                        }}
                    />
                    <div className="textoSrubro">
                        <p className="nombreSrubro">{args.srubro.nombre}</p>
                        <p className="flechaSrubroContainer">
                            {(args.marca ? (args.srubro.srubros && args.srubro.srubros.length > 1) : (args.srubro.colores && args.srubro.colores.length > 1) && !args.sinColores) &&
                                (<svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                </svg>)
                            }
                        </p>
                    </div>
                </div>
                {/*Cuando estamos en el rubro perfiles los srubros se comportan como colores y viceversa, por eso es que se analiza el tipo de dato de color*/}
                <div className="coloresSrubrosContainer">
                    {srubroActivo === args.srubro && (() => {
                        const items = args.marca
                            ? args.srubro.srubros
                            : args.srubro.colores;

                        if (!Array.isArray(items) || items.length <= 1) return null;

                        return items.map((color) => (
                            <label
                                className={`labelColor ${coloresActivos.includes(color) && 'checked'}`}
                                key={typeof color === 'string' ? color : color.nombre}
                            >
                                <input
                                    className="srubroCheck"
                                    type="checkbox"
                                    onClick={() => {
                                        toggleColor(color);
                                        args.setPaginaActual(1);
                                    }}
                                />
                                <p className="textoColorFiltros">
                                    {typeof color === 'string' ? color : color.nombre}
                                </p>
                            </label>
                        ));
                    })()}
                </div>
            </label>
        </div>
    );
}