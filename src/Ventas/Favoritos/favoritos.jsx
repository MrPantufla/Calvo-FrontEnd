import './favoritos.css';
import { useState } from 'react';
import { useAuth } from '../../contextLogin';
import { useFavoritos } from '../../favoritosContext';
import { Collapse } from 'react-bootstrap';
import CardFavoritos from './cardFavoritos';
import { useProductos } from '../../contextProductos';

export default function Favoritos() {
    const auth = useAuth();
    const [favoritosAbierto, setFavoritosAbierto] = useState(false);
    const favoritos = useFavoritos();
    const productos = useProductos();

    const toggleFavoritos = () => {
        if (!auth.state.logueado || !auth.state.userInfo.email_confirmado) {
            auth.setMostrarLogin(true);
        }
        else {
            setFavoritosAbierto(!favoritosAbierto);
        }
    }

    return (
        <div className="contenedorPrincipalFavoritos">
            <div className="contenedorBotonFavoritos">
                <button type="button" className="botonFavoritos" onClick={toggleFavoritos}>
                    {favoritosAbierto ?
                        ("Cerrar favoritos")
                        :
                        (<svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>)}
                </button>
                <span className="cantidadFavoritos" style={{ display: favoritosAbierto ? 'none' : 'block' }}>
                    {favoritos.favoritos.length}
                </span>
            </div>
            <Collapse in={favoritosAbierto}>
                <div className="elementosFavoritos">
                    {auth.state.logueado && favoritos.favoritos ? (favoritos.favoritos.map((favorito) => {
                        const producto = productos.productosIndexado[favorito];
                        if (producto) {
                            console.log(producto);
                            return (
                                <div key={producto.id}>
                                    <CardFavoritos key={producto.id} id={producto.id} cod_orig={producto.cod_orig} detalle={producto.detalle} precio={producto.precio} />
                                </div>
                            );
                        }
                        return null;
                    })) : ('')}
                    
                </div>
            </Collapse>
        </div>
    );
}