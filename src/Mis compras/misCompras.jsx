import './misCompras.css';
import { useAuth } from '../contextLogin';
import { useEffect, useState } from 'react';
import CardMisCompras from './Card mis Compras/cardMisCompras';
import LoginYRegistro from '../Login y registro/loginYRegistro';
import Header from '../Principal/Header/header';
import { useNavigate } from 'react-router-dom';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil';
import Footer from '../Principal/Footer/footer.jsx';

export default function MisCompras() {
    const auth = useAuth();
    const [historial, setHistorial] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!auth.state.logueado || !auth.state.userInfo.email_confirmado) {
                navigate("/home");
            }
        }, 200);
    
        return () => clearTimeout(timeoutId);
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                    console.log(data);
                    setHistorial(data);

                } else {
                    console.log('El usuario no está logueado');
                }
            } catch (error) {
                console.error("Ocurrió un error al enviar los datos: ", error);
            }
        };

        if (auth.state.logueado) {
            fetchData();
        }

    }, [auth.state.logueado]);

    return (
        <>
            <div className="contenedorPrincipalMisCompras">
                <DesplegablePerfil />
                <Header />
                <div className="decoracionBody decoracionMisCompras" />
                <div className="decoracionDosBody decoracionDosMisCompras" />
                <LoginYRegistro />
                <div className="misComprasContainer row">
                    {historial.map((item, index) => (
                        <div className={`col-6 columnaMisCompras ${index % 2 === 0 ? 'par' : 'impar'}`} key={index} style={{ height: "auto" }}>
                            <CardMisCompras data={item} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
