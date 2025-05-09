import './rubros.css';
import { useEffect, useRef } from 'react';
import { useTienda } from '../../../../contextTienda';
import Srubros from '../Srubros/srubros.jsx';
import Marcas from '../Marcas/marcas.jsx';

export default function Rubros(args) {
    const {
        rubroActivo,
        togglearRubro,
        setCortinasSelected,
        setEliminadosSelected,
        setColoresActivos,
        srubroActivo,
        marcaActiva,
        rubros
    } = useTienda();

    const rubroRefs = useRef([]);

    const handleScrollClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (rubroActivo && rubroRefs.current[rubroActivo.id]) {
            rubroRefs.current[rubroActivo.id].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [rubroActivo, srubroActivo, marcaActiva]);

    return (
        <>
            {rubros.map((rubro, index) => {
                // Acá podés ejecutar funciones, declarar variables, etc.

                const isChecked = rubroActivo === rubro;

                return (
                    <label
                        className={`labelRubros ${isChecked ? 'checked' : ''} label${rubro.nombre} desplegable`}
                        key={rubro.id}
                        ref={el => {
                            rubroRefs.current[rubro.id] = el;
                        }}
                    >
                        <div>
                            <input
                                className="check"
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                    togglearRubro(rubro);
                                }}
                                onClick={() => {
                                    handleScrollClick();
                                    args.setPaginaActual(1);
                                    setColoresActivos([]);
                                    setCortinasSelected(false);
                                    setEliminadosSelected(false);
                                }}
                                id={rubro.nombre + "id"}
                            />
                            <div className="textoRubro">
                                <p className="nombreRubro">{rubro.nombre}</p>
                                <p className="flechaRubro">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </p>
                            </div>
                        </div>
                        {isChecked &&
                            (rubro.id === 'Perfiles' ?
                                (<Marcas
                                    rubro={rubro}
                                    handleScrollClick={handleScrollClick}
                                    setPaginaActual={args.setPaginaActual}
                                />)
                                :
                                (<Srubros
                                    rubro={rubro}
                                    coloresUnicos={args.coloresUnicos}
                                    setPaginaActual={args.setPaginaActual}
                                    srubros={rubro.srubros}
                                />)
                            )
                        }
                    </label>
                );
            })}
        </>
    );
}
