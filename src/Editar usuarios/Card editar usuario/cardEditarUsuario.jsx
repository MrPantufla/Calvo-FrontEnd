import './cardEditarUsuario.css';
import { useState } from 'react';

export default function CardEditarUsuario(args) {
    const [nombre, setNombre] = useState(args.usuario.nombre);
    const [apellido, setApellido] = useState(args.usuario.apellido);
    const [cuit, setCuit] = useState(args.usuario.cuit);
    const [email, setEmail] = useState(args.usuario.email);
    const [telefono, setTelefono] = useState(args.usuario.telefono);
    const [emailConfirmado, setEmailConfirmado] = useState(args.usuario.email_confirmado);
    const [cliente, setCliente] = useState(args.usuario.cliente == true);

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
                        <div>
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
                    <button onClick={(e) => args.guardar(usuario)} className="enviarFormulario ">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}