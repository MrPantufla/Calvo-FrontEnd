import Body from './Body/body.jsx';
import Footer from './Footer/footer.jsx';
import DesplegablePerfil from './Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from './Header/renderHeader.jsx';
import CartelLogout from '../Login y registro/Logout/cartelLogout.jsx';
import { useAuth } from '../contextLogin.jsx';
import { useTienda } from '../contextTienda.jsx';
import { useEffect } from 'react';
import CartelCliente from '../Login y registro/Cartel cliente/cartelCliente.jsx';
import { useVariables } from '../contextVariables.jsx';

export default function HomePage() {
    const { salirDeTienda } = useTienda();

    useEffect(() => {
        salirDeTienda();
    }, [])

    const { mostrarCartelCliente } = useVariables();

    return (
        <>
            <RenderHeader />
            <DesplegablePerfil />
            <Body />
            <Footer />
            <CartelLogout />
            {mostrarCartelCliente && <CartelCliente/>}
        </>
    );
}