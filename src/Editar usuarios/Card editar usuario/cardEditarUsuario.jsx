import './cardEditarUsuario.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useVariables } from '../../contextVariables';

export default function CardEditarUsuario(args) {
    const [nombre, setNombre] = useState(args.usuario.nombre);
    const [apellido, setApellido] = useState(args.usuario.apellido);
    const [cuit, setCuit] = useState(args.usuario.cuit);
    const [email, setEmail] = useState(args.usuario.email);
    const [telefono, setTelefono] = useState(args.usuario.telefono);
    const [emailConfirmado, setEmailConfirmado] = useState(args.usuario.email_confirmado);
    const [cliente, setCliente] = useState(args.usuario.cliente == true);
    const [eliminar, setEliminar] = useState(false);
    const { backend } = useVariables();
    const [respuesta, setRespuesta] = useState('');
    const [emailOriginal, setEmailOriginal] = useState(email);

    const usuario = {
        id: args.usuario.id,
        nombre: nombre,
        apellido: apellido,
        cuit: cuit,
        email: email,
        telefono: telefono,
        emailConfirmado: emailConfirmado,
        cliente: cliente,
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

        let tokenParaEnviar = Cookies.get('jwtToken');

        if (tokenParaEnviar == undefined) {
            tokenParaEnviar = null;
        }

        const response = await fetch(`${backend}/api/modificarUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenParaEnviar,
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
        let tokenParaEnviar = Cookies.get('jwtToken');

        if (tokenParaEnviar == undefined) {
            tokenParaEnviar = null;
        }

        const response = fetch(`${backend}/api/eliminarUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenParaEnviar,
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