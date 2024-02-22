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
    const [admin, setAdmin] = useState(args.usuario.tipo_usuario == 'admin');

    const usuario = {
        id: args.usuario.id,
        nombre: nombre,
        apellido: apellido,
        cuit: cuit,
        email: email,
        telefono: telefono,
        emailConfirmado: emailConfirmado,
        cliente: cliente,
        admin: (admin == 'admin' ? 'admin' : 'usuario')
    }

    return (
        <form>
            <label htmlFor='nombre'>
                Nombre
                <input
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
                    type='text'
                    id='cuit'
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                >
                </input>
            </label>

            <label htmlFor='email'>
                Email
                <input
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
                    type='text'
                    id='telefono'
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                >
                </input>
            </label>

            <label htmlFor='emailConfirmado'>
                Email confirmado
                <input
                    type='checkBox'
                    id='emailConfirmado'
                    checked={emailConfirmado}
                    onChange={() => setEmailConfirmado(!emailConfirmado)}
                >
                </input>
            </label>

            <label htmlFor='cliente'>
                Cliente
                <input
                    type='checkBox'
                    id='cliente'
                    checked={cliente}
                    onChange={() => setCliente(!cliente)}
                >
                </input>
            </label>

            <label htmlFor='tipoUsuario'>
                Administrador
                <input
                    type='checkBox'
                    id='admin'
                    checked={admin}
                    disabled={args.usuario.id == 1}
                    onChange={() => setAdmin(!admin)}
                >
                </input>
            </label>

            <button onClick={() => args.guardar(usuario)}>
                Guardar
            </button>
        </form>
    )
}