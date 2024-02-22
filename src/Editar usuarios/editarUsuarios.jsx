import './editarUsuarios.css';
import RenderHeader from '../Principal/Header/renderHeader';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil';
import { useVariables } from '../contextVariables';
import { useEffect, useState } from 'react';
import CardEditarUsuario from './Card editar usuario/cardEditarUsuario';

export default function EditarUsuarios() {
    const { backend } = useVariables();
    const [usuarios, setUsuarios] = useState([]);

    const modificarUsuario = (usuario) => {
        const response = fetch(`${backend}/api/modificarUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
            credentials: 'include',
        });

        if (response.ok) {
            console.log('Envío de datos exitoso');
            return true;
        } else {
            return false;
        }
    }

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch(`${backend}/api/usuarios`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
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
                setUsuarios(data);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="contenedorPrincipalEditarUsuarios">
            <RenderHeader />
            <DesplegablePerfil />

            <div className="bodyEditarUsuarios">
                {usuarios.map(usuario => (
                    <CardEditarUsuario key={usuario.id} usuario={usuario} guardar={modificarUsuario}/>
                ))}
            </div>
        </div>
    );
}