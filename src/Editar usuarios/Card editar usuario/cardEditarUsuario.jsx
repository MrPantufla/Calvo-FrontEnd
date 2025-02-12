import './cardEditarUsuario.css';
import { useState, useEffect } from 'react';
import { useVariables } from '../../contextVariables';
import { useTienda } from '../../contextTienda';

export default function CardEditarUsuario(args) {

    const { isMobile } = useTienda();

    const [nombre, setNombre] = useState(args.usuario.nombre);
    const [apellido, setApellido] = useState(args.usuario.apellido);
    const [cuit, setCuit] = useState(args.usuario.cuit);
    const [email, setEmail] = useState(args.usuario.email);
    const [telefono, setTelefono] = useState(args.usuario.telefono);
    const [emailConfirmado, setEmailConfirmado] = useState(args.usuario.email_confirmado);
    const [cliente, setCliente] = useState(args.usuario.cliente == true);
    const [localidad, setLocalidad] = useState(args.usuario.localidad);
    const [provincia, setProvincia] = useState(args.usuario.provincia);
    const [zona, setZona] = useState(args.usuario.zona);
    const [eliminar, setEliminar] = useState(false);
    const [respuesta, setRespuesta] = useState('');
    const [emailOriginal, setEmailOriginal] = useState(email);
    const [codigo_confirmacion, setCodigo_confirmacion] = useState(args.usuario.codigo_confirmacion);

    const {
        backend,
        obtenerToken
    } = useVariables();

    const usuario = {
        id: args.usuario.id,
        nombre: nombre,
        apellido: apellido,
        cuit: cuit,
        email: email,
        telefono: telefono,
        emailConfirmado: emailConfirmado,
        cliente: cliente,
        localidad: localidad,
        provincia: provincia,
        zona: zona,
        codigo_confirmacion: codigo_confirmacion
    }

    const toggleEliminar = (e) => {
        e.preventDefault();
        setEliminar(!eliminar);
    }

    const modificarUsuario = async (usuario) => {
        setRespuesta('');

        const body = {
            usuario,
            emailOriginal
        };

        const response = await fetch(`${backend}/modificarUsuario/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': obtenerToken(),
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            setRespuesta('Listo')
            setEmailOriginal(email);
            return true;
        } else {
            setRespuesta('Error')
            return false;
        }
    }

    const eliminarUsuario = (usuario) => {

        const response = fetch(`${backend}/modificarUsuario/postEliminarUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': obtenerToken(),
            },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="contenedorPrincipalCardEditarUsuario">
            <form className="formularioEditarUsuario">
                <div className="contenedorPartesFormulario">
                    <h1>{args.usuario.nombre} {args.usuario.apellido}</h1>
                    <div className="parteArribaFormularioEditarUsuario">
                        <label htmlFor='nombre'>
                            Nombre
                            <input
                                className="inputTextoEditarUsuario"
                                type='text'
                                id='nombre'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            >
                            </input>
                        </label>

                        <label htmlFor='apellido'>
                            Apellido
                            <input
                                className="inputTextoEditarUsuario"
                                type='text'
                                id='apellido'
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            >
                            </input>
                        </label>

                        <label htmlFor='cuit'>
                            CUIT/CUIL
                            <input
                                className="inputTextoEditarUsuario"
                                type='text'
                                id='cuit'
                                value={cuit}
                                onChange={(e) => setCuit(e.target.value)}
                            >
                            </input>
                        </label>
                    </div>

                    <div className="parteMedioFormularioEditarUsuario">
                        <label htmlFor='localidad'>
                            Localidad
                            <input
                                className="inputTextoEditarUsuario"
                                type='text'
                                id='localidad'
                                value={localidad}
                                onChange={(e) => setLocalidad(e.target.value)}
                            >
                            </input>
                        </label>

                        <label htmlFor='provincia'>
                            Provincia
                            <input
                                className="inputTextoEditarUsuario"
                                type='text'
                                id='provincia'
                                value={provincia}
                                onChange={(e) => setProvincia(e.target.value)}
                            >
                            </input>
                        </label>

                        <label htmlFor='zona'>
                            Zona
                            <input
                                className="inputTextoEditarUsuario"
                                type='text'
                                id='zona'
                                value={zona}
                                onChange={(e) => setZona(e.target.value)}
                            >
                            </input>
                        </label>

                        {!isMobile &&
                            <label htmlFor='cliente' className="labelCheckboxEditarUsuario">
                                Cliente
                                <input
                                    type='checkBox'
                                    id='cliente'
                                    checked={cliente}
                                    onChange={() => setCliente(!cliente)}
                                >
                                </input>
                            </label>
                        }
                    </div>

                    <div className="parteAbajoFormularioEditarUsuario">
                        <div className="formulariosAbajo">
                            <label htmlFor='email'>
                                Email
                                <input
                                    className="inputTextoEditarUsuario"
                                    type='text'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                            </label>

                            <label htmlFor='telefono'>
                                Telefono
                                <input
                                    className="inputTextoEditarUsuario"
                                    type='text'
                                    id='telefono'
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                >
                                </input>
                            </label>

                            <label htmlFor='codigo_confirmacion'>
                                Código
                                <input
                                    className="inputTextoEditarUsuario"
                                    type='text'
                                    id='codigo_confirmacion'
                                    value={codigo_confirmacion}
                                    onChange={(e) => setCodigo_confirmacion(e.target.value)}
                                >
                                </input>
                            </label>
                        </div>
                        <div>
                            <label htmlFor='emailConfirmado' className="labelCheckboxEditarUsuario">
                                Email confirmado
                                <input
                                    className="inputCheckboxEditarUsuario"
                                    type='checkBox'
                                    id='emailConfirmado'
                                    checked={emailConfirmado}
                                    onChange={() => setEmailConfirmado(!emailConfirmado)}
                                >
                                </input>
                            </label>

                            {isMobile &&
                                <label htmlFor='cliente' className="labelCheckboxEditarUsuario">
                                    Cliente
                                    <input
                                        type='checkBox'
                                        id='cliente'
                                        checked={cliente}
                                        onChange={() => setCliente(!cliente)}
                                    >
                                    </input>
                                </label>
                            }
                        </div>
                    </div>
                </div>

                <div className="contenedorBotonEnviarUsuario">
                    {eliminar === true ?
                        (<>
                            <button className="enviarFormulario" onClick={() => eliminarUsuario(usuario)} >
                                ELIMINAR
                            </button>
                            <button className="enviarFormulario segundoBoton" onClick={toggleEliminar}>
                                Cancelar
                            </button>
                        </>)
                        :
                        (<>
                            <button type="button" onClick={() => modificarUsuario(usuario)} className={`enviarFormulario ${respuesta == 'Listo' && 'modificado'}`}>
                                {respuesta != '' ? (respuesta) : ('Guardar')}
                            </button>
                            <button type="button" className="enviarFormulario segundoBoton" onClick={toggleEliminar}>
                                Eliminar
                            </button>
                        </>)
                    }
                </div>
            </form>
        </div>
    )
}