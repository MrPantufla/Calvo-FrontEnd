import './misCompras.css';
import { useAuth } from '../contextLogin';
import { useEffect, useState } from 'react';
import CardMisCompras from './Card mis Compras/cardMisCompras';
import { useNavigate } from 'react-router-dom';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil';
import Footer from '../Principal/Footer/footer.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';
import { useTienda } from '../contextTienda.jsx';
import BotonPagos from '../Ventas/Confirmar compra/Pagos/botonPagos.jsx';
import Pagos from '../Ventas/Confirmar compra/Pagos/pagos.jsx';
import { useVariables } from '../contextVariables.jsx';

export default function MisCompras() {
    const { backend } = useVariables();

    const {
        isFold,
        isMobile,
        mostrarPagos
    } = useTienda();

    const {state} = useAuth();
    
    const [historial, setHistorial] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 8;
    const indexUltimoItem = paginaActual * itemsPorPagina;
    const indexPrimerItem = indexUltimoItem - itemsPorPagina;

    const paginar = (numeroDePagina) => {
        setPaginaActual(numeroDePagina);
    }

    const totalPaginas = Math.ceil(historial.length / itemsPorPagina);
    const numerosDePagina = Array.from({ length: totalPaginas }, (_, index) => index + 1);
    const itemsActuales = historial.slice(indexPrimerItem, indexUltimoItem);

    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!state.logueado || !state.userInfo.email_confirmado) {
                navigate("/");
            }
        }, 200);

        return () => clearTimeout(timeoutId);
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.logueado) {
                    const response = await fetch(`${backend}/api/misCompras`, {
                        method: 'POST',
                        headers: {
                        },
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    setHistorial(data.reverse());

                } else {
                    console.log('El usuario no está logueado');
                }
            } catch (error) {
                console.error("Ocurrió un error al enviar los datos: ", error);
            }
        };

        if (state.logueado) {
            fetchData();
        }

    }, [state.logueado]);

    return (
        <div className="contenedorPaginaMisCompras">
            <div className="contenedorPrincipalMisCompras">
                <DesplegablePerfil />
                <RenderHeader />
                <div className="decoracionBody decoracionMisCompras" />
                <div className="decoracionDosBody decoracionDosMisCompras" />
                <div className={`misComprasContainer ${isMobile ? 'mobile' : ''} ${isFold ? 'fold' : ''}`}>
                    <div className="columnaPar">
                        {itemsActuales.map((item, index) => (
                            index % 2 === 0 ? <CardMisCompras key={index} data={item} /> : null
                        ))}
                    </div>
                    <div className="columnaImpar">
                        {itemsActuales.map((item, index) => (
                            index % 2 !== 0 ? <CardMisCompras key={index} data={item} /> : null
                        ))}
                    </div>
                </div>
            </div>
            <div className="paginacion">
                <button
                    className="buttonPag paginaExtremo primeraPagina"
                    onClick={() => paginar(1)}
                    disabled={paginaActual === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
                    </svg>
                </button>
                <button
                    className="botonAntSig buttonPag"
                    onClick={() => paginar(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.6rem"
                        height="1.6rem"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                        style={{ transform: 'rotate(180deg)' }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                    </svg>
                </button>
                {numerosDePagina.map((numero) => {
                    const diff = Math.abs(numero - paginaActual);

                    const mostrarPagina = totalPaginas <= 5 || (paginaActual <= 3 && numero <= 5) || (paginaActual >= totalPaginas - 2 && numero >= totalPaginas - 4) || (diff <= 2 && totalPaginas >= 5);
                    return (
                        mostrarPagina && (
                            <button
                                key={numero}
                                onClick={() => paginar(numero)}
                                className={paginaActual === numero ? 'pagina-actual botonPaginacion buttonPag' : 'buttonPag botonPaginacion'}
                            >
                                {numero}
                            </button>
                        )
                    );
                })}

                <button
                    className="botonAntSig buttonPag"
                    onClick={() => paginar(paginaActual + 1)}
                    disabled={indexUltimoItem >= historial.length}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.6rem"
                        height="1.6rem"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                    </svg>
                </button>

                <button
                    className="buttonPag paginaExtremo ultimaPagina"
                    onClick={() => paginar(totalPaginas)}
                    disabled={paginaActual === totalPaginas}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
                    </svg>
                </button>
            </div>
            <BotonPagos/>
            {mostrarPagos ? (<Pagos/>) : (<></>)}
            <Footer />
        </div>
    );
}
