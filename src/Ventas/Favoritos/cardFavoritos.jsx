import './cardFavoritos.css';
import perfil from '../../Imagenes/perfil.jpg';
import { useFavoritos } from '../../contextFavoritos';
import { useState, useEffect } from 'react';

export default function CardFavoritos(args) {
    const favoritos = useFavoritos();
    const [isHovered, setIsHovered] = useState(false);

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
                <button className="botonQuitarFavorito" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => favoritos.toggleFavorito(args.id)}>
                    {isHovered ? 
                    (<svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="var(--colorTerciario)" class="bi bi-heartbreak-fill" viewBox="0 0 16 16">
                    <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"/>
                  </svg>) 
                    : 
                    (<svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>)}
                </button>
            </div>
        </div>
    );
}