import './favoritos.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contextLogin';
import { useFavoritos } from '../../contextFavoritos';
import CardFavoritos from './cardFavoritos';
import { useProductos } from '../../contextProductos';
import { useCarrito } from '../../contextCarrito';
import { useTienda } from '../../contextTienda';

export default function Favoritos() {
    const [favoritosHeight, setFavoritosHeight] = useState(0);

    const {
        setMostrarLogin,
        state
    } = useAuth();

    const {
        setFavoritosAbierto,
        favoritosAbierto,
        favoritos
    } = useFavoritos();

    const { productosIndexado } = useProductos();

    const { setCarritoAbierto } = useCarrito();

    const {
        isMobile,
        isTablet
    } = useTienda();

    const toggleFavoritos = () => {
        if (!state.logueado || !state.userInfo.email_confirmado) {
            setMostrarLogin(true);
        }
        else {
            if (favoritos.length > 0) {
                setFavoritosAbierto(!favoritosAbierto);
                setCarritoAbierto(false);
            }
        }
    }

    const cerrarFavoritos = () => {
        setFavoritosAbierto(false);
    }

    useEffect(() => {
        if (favoritos.length == 0) {
            cerrarFavoritos();
        }
    }, [favoritos.length])

    useEffect(() => {
        if (favoritosAbierto) {
            if (favoritos.length > 0) {
                if (isMobile) {
                    setFavoritosHeight(3 + 25 * favoritos.length + 1)
                }
                else if (isTablet) {
                    setFavoritosHeight(3 + 25 * favoritos.length + 0.5);
                }
                else {
                    setFavoritosHeight(3 + favoritos.length * 20);
                }
            }
            else {
                setFavoritosHeight(0);
            }
        } else {
            setFavoritosHeight(0);
        }
    }, [favoritosAbierto, favoritos.length]);

    return (
        <div className="contenedorPrincipalFavoritos" style={{ pointerEvents: favoritosAbierto ? 'auto' : 'none' }}>
            <div className="contenedorBotonFavoritos">
                <button 
                    type="button"
                    className={`botonFavoritos ${favoritosAbierto ? 'open' : ''} ${!isTablet && 'desktop'}`}
                    onClick={toggleFavoritos}
                    style={{ pointerEvents: 'auto' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="white" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                </button>
                <span className="cantidadFavoritos" style={{ display: favoritosAbierto ? 'none' : 'block' }}>
                    {favoritos.length}
                </span>
            </div>
            <div className={`bodyFavoritos ${favoritosAbierto ? 'open' : ''}`} style={{ height: `${favoritosHeight}rem` }}>
                <div className="tituloFavoritos">
                    <p>FAVORITOS</p>
                </div>
                <div className="elementosFavoritos">
                    {state.logueado && favoritos ? (favoritos.map((favorito) => {
                        const producto = productosIndexado[favorito];
                        if (producto) {
                            return (
                                <div key={producto.id}>
                                    <CardFavoritos key={producto.id} producto={producto} />
                                </div>
                            );
                        }
                        return null;
                    })) : ('')}
                </div>
            </div>
        </div>
    );
}