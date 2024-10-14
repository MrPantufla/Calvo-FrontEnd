import './editarUsuarios.css';
import RenderHeader from '../Principal/Header/renderHeader';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil';
import { useVariables } from '../contextVariables';
import { useEffect, useState } from 'react';
import CardEditarUsuario from './Card editar usuario/cardEditarUsuario';
import Cookies from 'js-cookie';

export default function EditarUsuarios() {
    const { backend } = useVariables();
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const obtenerUsuarios = async () => {
        try {
            let tokenParaEnviar = Cookies.get('jwtToken');

            if (tokenParaEnviar == undefined) {
                tokenParaEnviar = null;
            }

            const response = await fetch(`${backend}/api/usuarios`, {
                headers: {
                    'Authorization': tokenParaEnviar,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Error en la solicitud:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await obtenerUsuarios();
            if (data) {
                setUsuarios(data.reverse());
            }
        };

        fetchData();
    }, []);

    const usuariosFiltrada = Object.values(usuarios).filter((u) => {
        const busquedaCumple =
            (u.nombre.toUpperCase() + " " + u.apellido.toUpperCase()).includes(busqueda.toUpperCase()) ||
            u.email.toUpperCase().includes(busqueda.toUpperCase()) ||
            u.telefono.toString().includes(busqueda) ||
            u.cuit.toString().includes(busqueda);

        return busquedaCumple;
    });

    return (
        <div className="contenedorPrincipalEditarUsuarios">
            <RenderHeader />
            <DesplegablePerfil />

            <div className="contenedorBusquedaEIconoEditarUsuarios">
                <div className="busquedaEIcono">
                    <input
                        className="busqueda"
                        type="text"
                        placeholder="Buscar nombre, email, cuit o teléfono"
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                        }}
                    >
                    </input>
                    <div className="lupaContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bodyEditarUsuarios">
                {usuariosFiltrada.map(usuario => (
                    usuario.id !== 1 && <CardEditarUsuario key={usuario.id} usuario={usuario}/>
                ))}
            </div>
        </div>
    );
}