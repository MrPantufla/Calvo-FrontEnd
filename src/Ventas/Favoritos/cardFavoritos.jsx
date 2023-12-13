import './cardFavoritos.css';
import perfil from '../../Imagenes/perfil.jpg';
import { useFavoritos } from '../../favoritosContext';

export default function CardFavoritos(args) {
    const favoritos = useFavoritos();
    return (
        <div className="contenedorPrincipalCardFavoritos">
            <div className="imagenYCodigoCardFavoritos">
                <img className="imagenCardCarrito" src={perfil} />
                <p className="codigo">{args.cod_orig}</p>
            </div>
            <div className="textoCardFavoritos">
                <p>{args.detalle}</p>
                <p>${args.precio}</p>
            </div>
            <div className="botonQuitarFavoritoContainer">
                <button className="botonQuitarFavorito" onClick={() => favoritos.toggleFavorito(args.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                </button>
            </div>
        </div>
    );
}