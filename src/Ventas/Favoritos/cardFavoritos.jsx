import './cardFavoritos.css';
import { useFavoritos } from '../../contextFavoritos';
import { useState } from 'react';
import { useCarrito } from '../../contextCarrito';
import { marcasUnicasPerfiles } from '../../rubros';

export default function CardFavoritos(args) {
    const { toggleFavorito } = useFavoritos();

    const { añadirElemento } = useCarrito();

    const [isHovered, setIsHovered] = useState(false);
    const colorCorregido = (args.producto.color).replace(/\s+/g, '-');

    let codigo;
    marcasUnicasPerfiles.find(marcaPerfil => args.producto.marca == marcaPerfil) ? (codigo = args.producto.cod_orig) : (codigo = args.producto.cod_int);

    const usarBlanco = (args.producto.color == 'Negro' ||
        args.producto.color == 'Azul' ||
        args.producto.color == 'Marron osc' ||
        args.producto.color == 'Bronce osc' ||
        args.producto.color == 'Simil madera' ||
        args.producto.color == 'Platil' ||
        args.producto.color == 'Peltre' ||
        args.producto.color == 'Fume' ||
        args.producto.color == 'Rojo' ||
        args.producto.color == 'Gris azulado' ||
        args.producto.color == 'Bronce medio'
    );

    const añadirAlCarrito = () => {
        añadirElemento(args.producto.id, 1);
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    const timestamp = new Date().getTime();
    const src = marcasUnicasPerfiles.find(marcaPerfil => args.producto.marca === marcaPerfil)
        ? `https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigo.slice(2)}.webp?t=${timestamp}`
        : `https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigo}.webp?t=${timestamp}`;

    return (
        <div className="contenedorPrincipalCardFavoritos">
            <div className="imagenYCodigoCardFavoritos">
                <div className="imagenCardFavoritosContainer">
                    <img
                        className="imagenCardFavoritos"
                        onContextMenu={handleContextMenu}
                        src={marcasUnicasPerfiles.find(marcaPerfil => args.producto.marca == marcaPerfil && codigo) ?
                            (`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigo.slice(2)}.webp`)
                            :
                            (`https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesProductos/${codigo}.webp`)
                        }
                        alt="Imagen del producto"
                        loading="lazy"
                        
                    />
                </div>
                <div className="codigoYDetalleCardFavoritosContainer">
                    <p className="codigoYDetalleCardFavoritos"><span>{codigo}</span> - {args.producto.detalle}</p>
                </div>
            </div>
            <div className="restoCardFavoritos">
                <div className="botonQuitarFavoritoContainer">
                    <button className="botonQuitarFavorito" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => toggleFavorito(args.producto.id)} aria-label='quitarDeFavoritos'>
                        {isHovered ?
                            (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
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
                    {args.producto.tipo_prod != 'MAQUINAS' ?
                        (<button className="botonAñadirACarrito" onClick={añadirAlCarrito}>
                            Añadir al carrito
                        </button>)
                        :
                        ('')}
                </div>
            </div>
        </div>
    );
}