import { useAuth } from '../../../contextLogin.jsx';
import { useTienda } from '../../../contextTienda.jsx';
import Rubros from './Rubros/rubros.jsx';
import { useEffect, useState } from 'react';
import './filtros.css';
import { useProductos } from '../../../contextProductos.jsx';
import Marcas from './Marcas/marcas.jsx';

export default function Filtros(args) {
    const { state } = useAuth();

    const {
        isMobile,
        cortinasSelected,
        seleccionarCortinas,
        eliminadosSelected,
        eliminadosDeProcesosSelected,
        seleccionarEliminadosDeProcesos,
        seleccionarEliminados,
        rubroActivo,
        procesosSelected,
        seleccionarProcesos,
        srubroActivo,
        softwareSelected,
        seleccionarSoftware,
        rubros,
        tipoProceso,
        stipoProceso,
        acabado,
        seleccionarOfertas,
        ofertasSelected
    } = useTienda();

    const { 
        guardarDestacados, 
        ofertas 
    } = useProductos();

    const [scrollDownFiltros, setScrollDownFiltros] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            const elemento = document.getElementById('filtros');

            const handleScroll = () => {
                if (elemento) {
                    const atEnd = elemento.scrollTop + elemento.clientHeight >= elemento.scrollHeight;
                    setScrollDownFiltros(!atEnd);
                }
            };

            handleScroll(); // Verifica el estado inicial

            if (elemento) {
                elemento.addEventListener('scroll', handleScroll);
            }

            return () => {
                if (elemento) {
                    elemento.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, [rubroActivo, srubroActivo]);

    const scrollearFiltros = (cant) => {
        const elemento = document.getElementById('filtros');
        elemento.scrollBy({
            top: cant,
            behavior: 'smooth'
        });
    }

    const handleScrollClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const rubroPerfiles = rubros.find(rubro => rubro.id == 'Perfiles');

    return (
        <>
            <div className='filtros' id='filtros'>
                {(ofertas && ofertas.length > 0) && <div className={`labelRubros ${ofertasSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarOfertas()}>OFERTAS</div>}
                <Rubros setPaginaActual={args.setPaginaActual} />
                <div className={`labelRubros ${procesosSelected && 'checked'} textoLabelRubros ${(tipoProceso && stipoProceso && (tipoProceso == 'anodizados' ? acabado : !acabado) && !stipoProceso.detalle.includes('M2')) && 'desplegable'}`} onClick={() => seleccionarProcesos()}>
                    PROCESOS
                    {(tipoProceso && stipoProceso && (tipoProceso == 'anodizados' ? acabado : !acabado) && !stipoProceso.detalle.includes('M2')) && <Marcas setPaginaActual={args.setPaginaActual} handleScrollClick={handleScrollClick} rubro={rubroPerfiles} sinEco={true} sinColores={true} />}
                </div>
                <div className={`labelRubros ${cortinasSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarCortinas()}>CORTINAS</div>
                <div className={`labelRubros ${softwareSelected && 'checked'} textoLabelRubros ${(state.userInfo && state.userInfo.tipo_usuario !== 'admin' && state.userInfo.tipo_usuario != 'colaborador') && 'ultimoLabel'}`} onClick={() => seleccionarSoftware()}>SOFTWARE</div>
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros ${eliminadosSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarEliminados()}>ELIMINADOS</div>))}
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros ${eliminadosDeProcesosSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarEliminadosDeProcesos()}>ELIMINADOS DE PROCESOS</div>))}
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros textoLabelRubros ultimoLabel`} onClick={() => guardarDestacados()}>GUARDAR DESTACADOS</div>))}
            </div>
            {!isMobile &&
                <div className={`scrollerFiltros ${scrollDownFiltros ? 'enabled' : 'disabled'}`} onClick={() => scrollearFiltros(200)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
                    </svg>
                </div>
            }
        </>
    );
}