import './domicilio.css';
import { useAuth } from '../../../../contextLogin';
import { useNavigate } from 'react-router-dom';
import { useVariables } from '../../../../contextVariables';
import { useConfiguracion } from '../../../../contextConfiguracion';
import { useFinalizarCompra } from '../../../../contextFinalizarCompra';
import { useRef, useState, useEffect } from 'react';

export default function Domicilio() {

    const navigate = useNavigate();

    const {
        setMostrarEnvios,
        setMostrarPagos,
        setMostrarFacturacion,
        backend,
        obtenerToken
    } = useVariables();

    const {
        abrirDireccion
    } = useConfiguracion();

    const {
        state,
        domicilio,
        cp,
        localidad,
        provincia,
        setDomicilio,
        setCp,
        setLocalidad,
        setProvincia
    } = useAuth();

    const {
        tipoEnvio,
        setTipoEnvio,
        setKeyDownEnter
    } = useFinalizarCompra();

    const [correosDesplegado, setCorreosDesplegado] = useState(false);
    const [correoSeleccionado, setCorreoSeleccionado] = useState('');
    const [correoSeleccionadoOtro, setCorreoSeleccionadoOtro] = useState('');
    const [correoAñadir, setCorreoAñadir] = useState('');
    const desplegableRef = useRef();
    const [listaCorreos, setListaCorreos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const direccionVacia = !domicilio || !cp || !localidad || !provincia;

    const confirmar = () => {
        if (!direccionVacia &&
            tipoEnvio &&
            tipoEnvio == 'correo' ?
            (correoSeleccionado.toUpperCase().startsWith('OTRO') ? correoSeleccionadoOtro.length > 0 : correoSeleccionado)
            :
            (tipoEnvio == 'transportePropio')
        ) {
            setMostrarEnvios(false);

            if (state.userInfo.cliente && !state.userInfo.tipo_usuario == 'admin') {
                setMostrarFacturacion(true);
            }
            else {
                setMostrarPagos(true);
            }
        }
        else {
            setErrorMessage('Por favor, completa todos los campos')
        }
    }

    const handleBlurDesplegable = (e) => {
        setTimeout(() => {
            if (desplegableRef?.current && !desplegableRef.current.contains(e.relatedTarget) && state.userInfo.tipo_usuario != 'admin') {
                setCorreosDesplegado(false);
            }
        }, 100)
    };

    useEffect(() => {
        obtenerListaServiciosCorreo();
    }, []);

    const obtenerListaServiciosCorreo = async () => {
        try {
            const response = await fetch(`${backend}/servicioCorreo/get`);

            if (response.ok) {
                const data = await response.json();

                setListaCorreos(data.reverse());
            }
            else {
                throw new Error('Error al obtener la lista de servicios de correo');
            }

        } catch (error) {
            console.error(error);
        }
    }

    const guardarNuevoServicioCorreo = async (servicio) => {

        const entidad = {
            nombre: servicio
        }

        try {
            const response = await fetch(`${backend}/servicioCorreo/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': obtenerToken(),
                },
                credentials: 'include',
                body: JSON.stringify(entidad),
            });

            if (response.ok) {
                obtenerListaServiciosCorreo();
            }
            else {
                throw new Error('Error al obtener la lista de servicios de correo');
            }

        } catch (error) {
            console.error(error);
        }
    }

    const deleteServicioCorreo = async (servicio) => {

        try {
            const response = await fetch(`${backend}/servicioCorreo/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': obtenerToken(),
                },
                credentials: 'include',
                body: JSON.stringify(servicio),
            });

            if (response.ok) {
                obtenerListaServiciosCorreo();
            }
            else {
                throw new Error('Error al eliminar servicio');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="contenedorPrincipalDomicilio">
            <div className="botonesOpcionesConfirmarCompra">
                <button disabled={!(state.userInfo && state.userInfo.cliente)} className={`${tipoEnvio == "transportePropio" && 'active'}`} onClick={() => setTipoEnvio("transportePropio")}>Transporte Calvo (sin costo)</button>
                <button className={`${tipoEnvio == "correo" && 'active'}`} onClick={() => setTipoEnvio("correo")}>Servicio de correo</button>
            </div>
            <div className="datosContenedor">
                <div className="contenedorFormConfirmarCompra contenedorDireccion">
                    <div className="contenedorEntradaConfirmarCompra">
                        <label htmlFor="domicilio">DOMICILIO</label>
                        <input id="domicilio"
                            value={domicilio || ""}
                            onChange={(e) => setDomicilio(e.target.value)}
                            onFocus={() => setErrorMessage('')}
                        />
                    </div>

                    <div className="contenedorEntradaConfirmarCompra">
                        <label htmlFor="cp">CP</label>
                        <input id="cp"
                            value={cp || ""}
                            onChange={(e) => (setCp(e.target.value))}
                            onFocus={() => setErrorMessage('')}
                        />
                    </div>

                    <div className="contenedorEntradaConfirmarCompra">
                        <label htmlFor="localidad">LOCALIDAD</label>
                        <input id="localidad"
                            value={localidad || ""}
                            onChange={(e) => (setLocalidad(e.target.value))}
                            onFocus={() => setErrorMessage('')}
                        />
                    </div>

                    <div className="contenedorEntradaConfirmarCompra">
                        <label htmlFor="provincia">PROVINCIA</label>
                        <input id="provincia"
                            value={provincia || ""}
                            onChange={(e) => (setProvincia(e.target.value))}
                            onFocus={() => setErrorMessage('')}
                        />
                    </div>
                </div>

                {tipoEnvio == 'correo' && <div className="serviciosCorreo">
                    <div
                        className={`desplegarCorreos ${!correoSeleccionado == '' && 'disabled'} ${correosDesplegado && 'desplegado'}`}
                        onClick={() => {
                            correosDesplegado ? setCorreosDesplegado(false) : setCorreosDesplegado(true)
                        }}
                        onBlur={handleBlurDesplegable}
                        ref={desplegableRef}
                        tabIndex={0}
                    >
                        <p className={`correoSeleccionado ${correoSeleccionado && 'active'} ${correosDesplegado && 'desplegado'}`}>
                            {correoSeleccionado ? correoSeleccionado : 'Seleccionar servicio'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658c-.566-.683-.1-1.658.753-1.658h9.592c.852 0 1.32.975.753 1.658L8.753 11.14a1 1 0 0 1-1.506 0z" />
                            </svg>
                        </p>
                    </div>

                    <div
                        className={`correosDesplegable ${correosDesplegado && 'abierto'}`}
                    >
                        {(listaCorreos && listaCorreos.length > 0) && listaCorreos.map((correo, index) => (
                            <div key={index} className="opcionYEliminarContainer">
                                <div
                                    className={`opcionCorreo ${correoSeleccionado == correo.nombre && 'selected'} ${state.userInfo.tipo_usuario == 'admin' && 'admin'}`}
                                    onClick={() => { setCorreoSeleccionado(correo.nombre); setCorreosDesplegado(false) }}
                                >
                                    {correo.nombre}
                                </div>

                                {state.userInfo.tipo_usuario == 'admin' &&
                                    <button className="botonEliminarCorreo" onClick={() => deleteServicioCorreo(correo.nombre)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </button>
                                }
                            </div>
                        ))}
                    </div>

                    <input
                        className={`inputOtroCorreo ${correoSeleccionado.startsWith('Otro') && 'renderizado'}`}
                        type='text'
                        onChange={(e) => setCorreoSeleccionadoOtro(e.target.value)}
                        value={correoSeleccionadoOtro}
                        placeholder='Escribir nombre del servicio'
                    />

                    {state.userInfo.tipo_usuario == 'admin' &&
                        <div className="contenedorAgregarServicio">
                            <input
                                className='inputCorreo'
                                type='text'
                                onChange={(e) => setCorreoAñadir(e.target.value)}
                                value={correoAñadir}
                                placeholder='Agregar servicio'
                            />

                            <button onClick={() => guardarNuevoServicioCorreo(correoAñadir)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                            </button>
                        </div>
                    }
                </div>}
            </div>
            <div className="contenedorConfirmarBoton">
                <button
                    className={`confirmarBoton ${(tipoEnvio == 'correo' && correoSeleccionadoOtro.length == 0) && 'disabled'}`}
                    onClick={() => confirmar()}
                    disabled={!(!direccionVacia &&
                        tipoEnvio &&
                        tipoEnvio == 'correo' ?
                        (correoSeleccionado.toUpperCase().startsWith('OTRO') ? correoSeleccionadoOtro.length > 0 : correoSeleccionado)
                        :
                        (tipoEnvio == 'transportePropio')
                    )}
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
}