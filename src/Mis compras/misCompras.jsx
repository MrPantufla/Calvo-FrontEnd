import './misCompras.css';
import { useAuth } from '../contextLogin';
import { useEffect, useState } from 'react';
import CardMisCompras from './Card mis Compras/cardMisCompras';
import LoginYRegistro from '../Login y registro/loginYRegistro';
import Header from '../Principal/Header/header';

export default function MisCompras() {
    const auth = useAuth();
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Verifica si ya está logueado antes de intentar la solicitud
                if (auth.state.logueado) {
                    const response = await fetch('http://localhost:8080/api/misCompras', {
                        method: 'POST',
                        headers: {
                        },
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }
                    const data = await response.json();
                    console.log('Respuesta: ', data);
                    setHistorial(data);

                } else {
                    // Si no está logueado, puedes manejarlo de acuerdo a tus necesidades
                    console.log('El usuario no está logueado');
                }
            } catch (error) {
                console.error("Ocurrió un error al enviar los datos: ", error);
            }
        };

        // Solo ejecuta fetchData si está logueado
        if (auth.state.logueado) {
            fetchData();
        }

    }, [auth.state.logueado]);

    return (
        <div className="contenedorPrincipalMisCompras">
            <Header/>
            <LoginYRegistro/>
            <div className="misComprasContainer">
                {historial.map((item) => (
                    <CardMisCompras key={item.id} data={item}/>
                ))}
            </div>
        </div>
    );
}
