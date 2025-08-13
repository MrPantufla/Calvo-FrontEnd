import { useAuth } from '../../../contextLogin.jsx';
import { useTienda } from '../../../contextTienda.jsx';
import Rubros from './Rubros/rubros.jsx';
import { useEffect, useState } from 'react';
import './filtros.css';
import { useProductos } from '../../../contextProductos.jsx';
import Marcas from './Marcas/marcas.jsx';
import { useVariables } from '../../../contextVariables.jsx';
import ImageCompressor from 'image-compressor.js';

export default function Filtros(args) {
    const { state } = useAuth();

    const {
        backend,
        obtenerToken
    } = useVariables();

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

    const subirImagenTienda = async (archivo) => {
        try {
            const formData = new FormData();
            formData.append('file', archivo, archivo.name);  // Usa el nombre original del archivo
            formData.append('carpeta', "imagenesProductos");
    
            const response = await fetch(`${backend}/carousel/postSubir`, {
                method: 'POST',
                headers: {
                    'Authorization': obtenerToken(),
                },
                body: formData,
            });
    
            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al intentar subir la imagen:', error);
            return false;
        }
    };
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
    
        if (!file) {
            alert("Por favor selecciona una imagen.");
            return;
        }
    
        const options = {
            maxWidth: 800,   // Ajustar el tamaño máximo de la imagen
            maxHeight: 800,  // Ajustar el tamaño máximo de la imagen
            quality: 0.8,    // Calidad de la imagen (0 a 1)
            mimeType: 'image/webp', // Convertir a WebP
        };
    
        // Usar image-compressor.js para comprimir y convertir la imagen
        new ImageCompressor(file, {
            ...options,
            success(result) {
                // Asegúrate de mantener el nombre original del archivo cuando lo subas
                subirImagenTienda(result);
            },
            error(err) {
                console.error('Error al comprimir la imagen:', err);
            },
        });
    };

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
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros labelAdmin ${eliminadosSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarEliminados()}>ELIMINADOS</div>))}
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros labelAdmin ${eliminadosDeProcesosSelected && 'checked'} textoLabelRubros`} onClick={() => seleccionarEliminadosDeProcesos()}>ELIMINADOS DE PROCESOS</div>))}
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros textoLabelRubros labelAdmin`} onClick={() => subirImagenTienda()}>
                    <label htmlFor="subirImagen" className="labelSubirImagenTienda">SUBIR IMAGEN</label>
                    <input id="subirImagen" type="file" onChange={handleFileUpload} style={{ display: "none" }} accept=".png, .jpg, .jpeg, .svg, .webp" />
                </div>))}
                {state.userInfo && ((state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador') && (<div className={`labelRubros textoLabelRubros ultimoLabel labelAdmin`} onClick={() => guardarDestacados()}>GUARDAR DESTACADOS</div>))}
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