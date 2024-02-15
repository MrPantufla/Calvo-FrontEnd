import './cardFavoritos.css';
import perfil from '../../Imagenes/perfil2.png';
import { useFavoritos } from '../../contextFavoritos';
import { useState } from 'react';
import { useCarrito } from '../../contextCarrito';
import { useTienda } from '../../contextTienda';

export default function CardFavoritos(args) {
    const {toggleFavorito} = useFavoritos();

    const {añadirElemento} = useCarrito();

    const [isHovered, setIsHovered] = useState(false);
    const colorCorregido = (args.producto.color).replace(/\s+/g, '-');

    const usarBlanco = (args.producto.color == 'Negro' ||
        args.producto.color == 'Azul' ||
        args.producto.color == 'Marron oscuro' ||
        args.producto.color == 'Bronce oscuro' ||
        args.producto.color == 'Simil madera' ||
        args.producto.color == 'Platil' ||
        args.producto.color == 'Peltre' ||
        args.producto.color == 'Fume' ||
        args.producto.color == 'Verde'
    );

    const añadirAlCarrito = () => {
        añadirElemento(args.producto.id, 1);
    }

    return (
        <div className="contenedorPrincipalCardFavoritos">
            <div className="imagenYCodigoCardFavoritos">
                <div className="imagenCardFavoritosContainer">
                <img
                        className="imagenCardFavoritos"
                        src={`/ImagenesProductos/${args.producto.cod_int.toLowerCase()}.png`}
                        onError={(e) => {
                            e.target.src = `/ImagenesProductos/${args.producto.cod_int.toLowerCase()}.jpg`;

                            e.target.onerror = () => {
                                e.target.src = `/ImagenesProductos/xd.png`;
                            };
                        }}
                        alt="Imagen del producto"
                        loading="lazy"
                    />
                </div>
                <div className="codigoYDetalleCardFavoritosContainer">
                    <p className="codigoYDetalleCardFavoritos"><span>{args.producto.cod_orig}</span> - {args.producto.detalle}</p>
                </div>
            </div>
            <div className="restoCardFavoritos">
                <div className="botonQuitarFavoritoContainer">
                    <button className="botonQuitarFavorito" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => toggleFavorito(args.producto.id)}>
                        {isHovered ?
                            (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>)
                            :
                            (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg>)}
                    </button>
                </div>
                <div className="colorCardFavoritosContainer">
                    <>
                        <p className="textoColorCardFavoritos">COLOR</p>
                        <div className="muestraColorCardFavoritos" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                            <p className="colorCardFavoritos" style={usarBlanco ? { color: 'white' } : {}}>
                                {args.producto.color == 'Ind' ? ('-') : (args.producto.color.toUpperCase())}
                            </p>
                        </div>
                    </>
                </div>
                <div className="botonAñadirACarritoContainer">
                    <button className="botonAñadirACarrito" onClick={añadirAlCarrito}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}