import './registro.css';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contextLogin';
import { useVariables } from '../../contextVariables';
import { useTienda } from '../../contextTienda.jsx';
import { useZonas } from '../../contextZonas.jsx';

export default function Registro() {
    const {
        isTablet,
        isMobile
    } = useTienda();

    const {
        backend,
        setMostrarCartelCliente
    } = useVariables();

    const {
        setErrorMessage,
        handleLogin,
        errorMessage
    } = useAuth();

    const {
        ciudades,
        setCiudades,
        provincias,
        setProvincias,
        zonas,
        setZonas
    } = useZonas();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cuit, setCuit] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmContrasenia, setConfirmContrasenia] = useState('');
    const [provinciasDesplegado, setProvinciasDesplegado] = useState(false);
    const [busquedaProvincias, setBusquedaProvincias] = useState('');
    const provinciasRef = useRef(null);
    const [ciudadesDesplegado, setCiudadesDesplegado] = useState(false);
    const [busquedaCiudades, setBusquedaCiudades] = useState('');
    const ciudadesRef = useRef(null);
    const [respuestaCargando, setRespuestaCargando] = useState(true);

    const handleRegistro = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numerosRegex = /^[0-9]+$/;
        const container = document.getElementById("registro-container");

        if (!nombre || !apellido || !email || !contrasenia || !confirmContrasenia || !cuit || !telefono || !provincia || !ciudad) {
            setErrorMessage('Por favor, completa todos los campos.');

            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;

        } else if (!emailRegex.test(email)) {
            setErrorMessage('Ingrese un formato de correo electrónico válido.');

            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;

        } else if (!numerosRegex.test(telefono)) {
            setErrorMessage('El campo de teléfono solo permite números');

            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;

        } else if (contrasenia !== confirmContrasenia) {
            setErrorMessage('Las contraseñas no coinciden.');

            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;

        } else if (cuit.length != 11) {
            setErrorMessage('CUIT debe contener 11 caracteres')

            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;

        } else if (!numerosRegex.test(cuit)) {
            setErrorMessage('El campo de CUIT solo permite números')

            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;

        } else {
            confirmarRegistro();
        }
    };

    const extraerZonas = async () => {
        try {

            const response = await fetch(`${backend}/ciudadesProvinciasYZonas/get`, {
                method: 'GET',
            });

            if (response.ok) {
                const zonas = await response.json();

                setCiudades(zonas.ciudades);
                setProvincias(zonas.provincias);
                setZonas(zonas.zonas);

            } else {
                setErrorMessage("Error obteniendo provincias y ciudades. Por favor, intentalo más tarde")
            }
        } catch (error) {
            console.error('Error al encontrar al usuario:', error);
        }
    }

    useEffect(() => {
        extraerZonas();
    }, [])

    const confirmarRegistro = async () => {
        setRespuestaCargando(false);
        const zonaEncontrada = zonas.find((zona) => zona.items.includes(ciudad.id));

        const usuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            contrasenia: contrasenia,
            cuit: cuit,
            localidad: ciudad.nombre,
            provincia: provincia.nombre,
            telefono: parseInt(telefono, 10),
            zona: (zonaEncontrada && zonaEncontrada.nro ? ("ZONA " + (zonaEncontrada.nro < 10 ? ("0" + zonaEncontrada.nro) : (zonaEncontrada.nro))) : "S/ZONA")
        };


        const response = await fetch(`${backend}/registro/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
            credentials: 'include',
        });

        if (response.ok) {
            handleLogin({ email: usuario.email, password: usuario.contrasenia });
            setRespuestaCargando(true);

            return null;
        } else {
            const data = await response.text();
            if (response.status === 401) {
                if (data.includes('Email')) {
                    setErrorMessage('Email ya registrado');
                } else if (data.includes('Cuit')) {
                    setErrorMessage('Cuit ya registrado');
                } else if (data !== null) {
                    setErrorMessage(data);
                }
            }
            setRespuestaCargando(true);
        }
    };

    const presionarEnter = (e) => {
        if (e.key === 'Enter') {
            handleRegistro();
        }
    };

    const provinciasFiltradas = Object.values(provincias).filter((p) => {
        return busquedaProvincias == '' || p.nombre.toUpperCase().includes(busquedaProvincias.toUpperCase());
    })

    const ciudadesFiltradas = Object.values(ciudades).filter((c) => {
        return (
            c.provincia.nombre == provincia.nombre && (busquedaCiudades == '' || c.nombre.toUpperCase().includes(busquedaCiudades.toUpperCase()))
        );
    }).sort((a, b) => a.nombre.localeCompare(b.nombre));

    useEffect(() => {
        if (provinciasDesplegado && provinciasRef.current) {
            provinciasRef.current.focus();
        }
    }, [provinciasDesplegado]);

    useEffect(() => {
        if (ciudadesDesplegado && ciudadesRef.current) {
            ciudadesRef.current.focus();
        }
    }, [ciudadesDesplegado]);

    const handleBusquedaProvinciasChange = (e) => {
        setBusquedaProvincias(e.target.value);
    };

    const handleBusquedaCiudadesChange = (e) => {
        setBusquedaCiudades(e.target.value);
    };

    const handleProvinciaClick = (ciudad) => {
        setProvincia(ciudad);
        setBusquedaProvincias('');
        setProvinciasDesplegado(false);
    };

    const handleCiudadClick = (ciudad) => {
        setCiudad(ciudad);
        setBusquedaCiudades('');
        setCiudadesDesplegado(false);
    };

    const handleBlurProvincias = (e) => {
        if (!provinciasRef.current.contains(e.relatedTarget)) {
            setProvinciasDesplegado(false);
        }
    };

    const handleBlurCiudades = (e) => {
        if (!ciudadesRef.current.contains(e.relatedTarget)) {
            setCiudadesDesplegado(false);
        }
    };

    const heightProvinciasDesktop = provinciasDesplegado ? (provinciasFiltradas.length >= 5 ? (11) : (provinciasFiltradas.length * 2.4)) : 0;
    const heightCiudadesDesktop = ciudadesDesplegado ? (ciudadesFiltradas.length >= 5 ? (11) : (ciudadesFiltradas.length * 2.4)) : 0;
    const heightProvinciasTablet = provinciasDesplegado ? (provinciasFiltradas.length >= 5 ? (16) : (provinciasFiltradas.length * 3.5)) : 0;
    const heightCiudadesTablet = ciudadesDesplegado ? (ciudadesFiltradas.length >= 5 ? (16) : (ciudadesFiltradas.length * 3.5)) : 0;
    const heightProvinciasMobile = provinciasDesplegado ? (provinciasFiltradas.length >= 5 ? (20) : (provinciasFiltradas.length * 4.2)) : 0;
    const heightCiudadesMobile = ciudadesDesplegado ? (ciudadesFiltradas.length >= 5 ? (20) : (ciudadesFiltradas.length * 4.2)) : 0;

    return (
        <div className="registro-container" id="registro-container">
            {respuestaCargando == false &&
                <div className="cargandoRegistroContainer">
                    <div className="spinner-border cargandoRespuestaRegistro" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <div className="errorRegistro errorFormulario">
                {errorMessage !== '' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                )}
                {errorMessage}
            </div>
            <form className="formRegistro">
                <div className="form-group-registro">
                    <label htmlFor="nombre" required>NOMBRE/S</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="apellido" required>APELLIDO</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="emailRegistro" required>CORREO ELECTRÓNICO</label>
                    <input
                        type="emailRegistro"
                        id="emailRegistro"
                        value={email}
                        onChange={(e) => setEmail((e.target.value).trim())}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                        autoCapitalize='off'
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="telefonoRegistro" required>TELÉFONO (con característica)</label>
                    <input
                        type="tel"
                        id="telefonoRegistro"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value.replace(/[^0-9]/g, ''))}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                        inputMode='numeric'
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="cuit" required> CUIT</label>
                    <input
                        type="text"
                        id="cuit"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value.replace(/[^0-9]/g, ''))}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                        inputMode='numeric'
                        maxLength='11'
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="provinciaRegistro" required>PROVINCIA</label>
                    {provinciasDesplegado ? (
                        <>
                            <input
                                type="text"
                                id="busquedaProvincias"
                                ref={provinciasRef}
                                value={busquedaProvincias}
                                onChange={handleBusquedaProvinciasChange}
                                onFocus={() => setErrorMessage('')}
                                onBlur={handleBlurProvincias}
                                autoComplete="something-unique"
                            />
                        </>
                    ) : (
                        <div
                            className="desplegarProvincias"
                            onClick={() => {
                                setProvinciasDesplegado(true);
                            }}
                        >
                            <p>
                                {provincia ? provincia.nombre.slice(0, 27) : 'Seleccionar provincia'}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658c-.566-.683-.1-1.658.753-1.658h9.592c.852 0 1.32.975.753 1.658L8.753 11.14a1 1 0 0 1-1.506 0z" />
                                </svg>
                            </p>
                        </div>
                    )}
                    <div
                        ref={provinciasRef}
                        className={`provinciasDesplegadas ${provinciasDesplegado && 'abierto'}`}
                        tabIndex="-1"
                        style={{ height: `${isMobile ? (heightProvinciasMobile) : (isTablet ? (heightProvinciasTablet) : (heightProvinciasDesktop))}rem` }}
                    >
                        {provinciasFiltradas.sort().map((provincia) => (
                            <div
                                key={provincia.id}
                                className="opcionProvincia"
                                onMouseDown={() => handleProvinciaClick(provincia)}
                            >
                                {provincia.nombre.slice(0, 27)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-registro">
                    <label htmlFor="ciudadRegistro" required>LOCALIDAD</label>
                    {ciudadesDesplegado ? (
                        <>
                            <input
                                type="text"
                                id="busquedaCiudades"
                                ref={ciudadesRef}
                                value={busquedaCiudades}
                                onChange={handleBusquedaCiudadesChange}
                                onFocus={() => setErrorMessage('')}
                                onBlur={handleBlurCiudades}
                                autoComplete="something-unique"
                            />
                        </>
                    ) : (
                        <div
                            className={`desplegarCiudades ${provincia == '' && 'disabled'}`}
                            onClick={() => {
                                { provincia != '' && setCiudadesDesplegado(true); }
                            }}
                        >
                            <p>
                                {ciudad ? ciudad.nombre.slice(0, 27) : 'Seleccionar localidad'}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658c-.566-.683-.1-1.658.753-1.658h9.592c.852 0 1.32.975.753 1.658L8.753 11.14a1 1 0 0 1-1.506 0z" />
                                </svg>
                            </p>
                        </div>
                    )}
                    <div
                        ref={ciudadesRef}
                        className={`ciudadesDesplegadas ${ciudadesDesplegado && 'abierto'}`}
                        tabIndex="-1"
                        style={{ height: `${isMobile ? (heightCiudadesMobile) : (isTablet ? (heightCiudadesTablet) : (heightCiudadesDesktop))}rem` }}
                    >
                        {ciudadesFiltradas.map((ciudad) => (
                            <div
                                key={ciudad.id}
                                className="opcionCiudad"
                                onMouseDown={() => handleCiudadClick(ciudad)}
                            >
                                {ciudad.nombre.slice(0, 27)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group-registro">
                    <label htmlFor="contrasenia" required>CONTRASEÑA</label>
                    <input
                        type="password"
                        id="contrasenia"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                        autoCapitalize='off'
                    />
                </div>
                <div className="form-group-registro">
                    <label htmlFor="confirmContrasenia" required>CONFIRMAR CONTRASEÑA</label>
                    <input
                        type="password"
                        id="confirmContrasenia"
                        value={confirmContrasenia}
                        onChange={(e) => setConfirmContrasenia(e.target.value)}
                        onFocus={() => setErrorMessage('')}
                        onKeyDown={presionarEnter}
                        autoCapitalize='off'
                    />
                </div>
                <p className="terminosYCondicionesRegistro">Al registrarse en este sitio web, usted está aceptando nuestros <a href="/terminosYCondiciones" target='blank'>términos y condiciones</a></p>
                <div className="botonRegistroContainer">
                    <button className="botonEnviarRegistro" type="button" onClick={handleRegistro}>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}
