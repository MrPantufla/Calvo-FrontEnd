import './favoritos.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contextLogin';
import { useFavoritos } from '../../contextFavoritos';
import CardFavoritos from './cardFavoritos';
import { useProductos } from '../../contextProductos';
import { useCarrito } from '../../contextCarrito';

export default function Favoritos() {
    const auth = useAuth();
    const favoritos = useFavoritos();
    const productos = useProductos();
    const [favoritosTop, setFavoritosTop] = useState(3.2);
    const carrito = useCarrito();
    const [favoritosHeight, setFavoritosHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const maxFavoritosTop = 3.2; // ajusta el valor máximo de altura según tus necesidades
            const minFavoritosTop = 2.2; // ajusta el valor mínimo de altura según tus necesidades
            const alturaHeader = 150; // ajusta según tus necesidades

            // Calcula la nueva posición top en función del scroll
            let newTop =
                maxFavoritosTop -
                (maxFavoritosTop - minFavoritosTop) * (scrollPosition / alturaHeader);

            // Asegúrate de que newTop no sea menor que el valor mínimo de 7
            newTop = Math.max(minFavoritosTop, newTop);

            // Establece la nueva posición top
            setFavoritosTop(newTop);
        };

        // Agrega el event listener para el scroll
        window.addEventListener('scroll', handleScroll);

        // Limpia el event listener al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleFavoritos = () => {
        if (!auth.state.logueado || !auth.state.userInfo.email_confirmado) {
            auth.setMostrarLogin(true);
        }
        else {
            if (favoritos.favoritos.length > 0) {
                favoritos.setFavoritosAbierto(!favoritos.favoritosAbierto);
                carrito.setCarritoAbierto(false);
            }
        }
    }

    const cerrarFavoritos = () => {
        favoritos.setFavoritosAbierto(false);
    }

    useEffect(() => {
        if (favoritos.favoritos.length == 0) {
            cerrarFavoritos();
        }
    }, [favoritos.favoritos.length])

    useEffect(() => {
        if (favoritos.favoritosAbierto) {
          if (favoritos.favoritos.length > 0) {
            setFavoritosHeight(3 + favoritos.favoritos.length * 20);
          }
          else {
            setFavoritosHeight(0);
          }
        } else {
          setFavoritosHeight(0);
        }
      }, [favoritos.favoritosAbierto, favoritos.favoritos.length]);

    return (
        <div className="contenedorPrincipalFavoritos" style={{ top: `${favoritosTop}rem` }}>
            <div className="contenedorBotonFavoritos">
                <button type="button" className={`botonFavoritos ${favoritos.favoritosAbierto ? 'open' : ''}`} onClick={toggleFavoritos}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="white" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                </button>
                <span className="cantidadFavoritos" style={{ display: favoritos.favoritosAbierto ? 'none' : 'block' }}>
                    {favoritos.favoritos.length}
                </span>
            </div>
            <div className={`bodyFavoritos ${favoritos.favoritosAbierto ? 'open' : ''}`} style={{ height: `${favoritosHeight}rem`, maxHeight: `50rem` }}>
                <div className="tituloFavoritos">
                    <p>FAVORITOS</p>
                </div>
                <div className="elementosFavoritos">
                    {auth.state.logueado && favoritos.favoritos ? (favoritos.favoritos.map((favorito) => {
                        const producto = productos.productosIndexado[favorito];
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