import { useAuth } from '../../../contextLogin.jsx';
import { useTienda } from '../../../contextTienda.jsx';
import Rubros from './Rubros/rubros.jsx';
import { useEffect, useState } from 'react';
import './filtros.css';
import { useProductos } from '../../../contextProductos.jsx';

export default function Filtros(args) {
    const { state } = useAuth();

    const {
        isMobile,
        cortinasSelected,
        seleccionarCortinas,
        eliminadosSelected,
        seleccionarEliminados,
        rubroActivo,
        procesosSelected,
        seleccionarProcesos,
    } = useTienda();

    const { guardarDestacados } = useProductos();

    const [scrollDownFiltros, setScrollDownFiltros] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            const elemento = document.getElementById('filtros');

            const handleScroll = () => {
                let atEnd;
                if (elemento.scrollTop == 0) {
                    atEnd = elemento.scrollTop + elemento.clientHeight >= elemento.scrollHeight;
                }
                else {
                    atEnd = elemento.scrollTop + elemento.clientHeight >= elemento.scrollHeight;
                }

                setScrollDownFiltros(!atEnd);
            };

            handleScroll(); // Para verificar el estado inicial

            elemento.addEventListener('scroll', handleScroll);

            return () => {
                elemento.removeEventListener('scroll', handleScroll);
            };
        }
    }, [rubroActivo]);

    const scrollearFiltros = () => {
        const elemento = document.getElementById('filtros');
        elemento.scrollBy({
            top: 200,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div className='filtros' id='filtros'>
                <Rubros setPaginaActual={args.setPaginaActual} coloresUnicos={args.coloresUnicos} srubrosUnicos={args.srubrosUnicos} />
                <div className={`labelRubros ${procesosSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarProcesos()}>PROCESOS</div>
                <div className={`labelRubros ${cortinasSelected && 'checked'} textoLabelRubros ${(state.userInfo && state.userInfo.tipo_usuario !== 'admin') && 'ultimoLabel'}`} onClick={() => seleccionarCortinas()}>CORTINAS</div>
                {state.userInfo && (state.userInfo.tipo_usuario == 'admin' && (<div className={`labelRubros ${eliminadosSelected ? 'checked' : ''} textoLabelRubros ultimoLabel`} onClick={() => seleccionarEliminados()}>ELIMINADOS</div>))}
            </div>
            {!isMobile &&
                <div className={`scrollerFiltros ${scrollDownFiltros ? 'enabled' : 'disabled'} ${state.userInfo ? (state.userInfo.tipo_usuario == 'admin' && 'admin') : ('')}`} onClick={state.userInfo && (state.userInfo.tipo_usuario == 'admin' ? (guardarDestacados) : (scrollearFiltros))}>
                    {state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ?
                        (<>
                            Guardar destacados
                            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-box-arrow-down guardarDestacados" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z" />
                                <path fillRule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                            </svg>
                        </>)
                        :
                        (<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
                        </svg>)
                    )
                        :
                        (<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
                        </svg>)}
                </div>
            }
        </>
    );
}