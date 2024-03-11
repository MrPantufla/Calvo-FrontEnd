import './cardProducto.css';
import logoBlanco from '../../../Imagenes/ca.png'
import React from 'react';
import { useCarrito } from '../../../contextCarrito.jsx';
import { useAuth } from '../../../contextLogin.jsx';
import { useFavoritos } from '../../../contextFavoritos.jsx';
import { useProductos } from '../../../contextProductos.jsx';
import { useVariables } from '../../../contextVariables.jsx';

export default function CardProducto(args) {
  const { backend } = useVariables();

  const {
    eliminarORestaurarProductos,
  } = useProductos();

  const {
    state,
    setMostrarLogin
  } = useAuth();

  const favoritos = useFavoritos();

  const {
    añadirElemento,
    restarElemento,
    elementos: elementosCarrito
  } = useCarrito();

  const mayorista =state.userInfo ? (state.userInfo.categoria=='MAYORISTA') : (false); 

  const elementoExistente = elementosCarrito.find((elemento) => elemento.id === args.id);
  const cantidad = elementoExistente ? elementoExistente.cantidad : 0;
  const colorCorregido = (args.color).replace(/\s+/g, '-');

  const usarBlanco = (args.color == 'Negro' ||
    args.color == 'Azul' ||
    args.color == 'Marron oscuro' ||
    args.color == 'Bronce oscuro' ||
    args.color == 'Simil madera' ||
    args.color == 'Platil' ||
    args.color == 'Peltre' ||
    args.color == 'Fume' ||
    args.color == 'Rojo'
  );

  const sumarContador = () => {
    console.log(state.userInfo)
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        añadirElemento(args.id, 1);
      }
      else {
        setMostrarLogin(true);
      }
    }
    else {
      setMostrarLogin(true);
    }
  }

  const restarContador = () => {
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        if (cantidad > 0) {
          restarElemento(args.id);
        }
      }
      else {
        setMostrarLogin(true);
      }
    }
    else {
      setMostrarLogin(true);
    }
  }

  const toggleFavorito = (id, e) => {
    e.stopPropagation();
    if (state.logueado) {
      favoritos.toggleFavorito(id);
    }
    else {
      setMostrarLogin(true);
    }
  };

  const eliminarProducto = async () => {
    try {
      const response = await fetch(`${backend}/api/eliminarProducto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.id),
        credentials: 'include',
      });

      if (response.ok) {
        eliminarORestaurarProductos(args.id);
        return true;
      } else {
        console.error('Error al verificar el token en el backend');
        return false;
      }
    } catch (error) {
      console.error('Error desconocido:', error);
      return false;
    }
  };

  return (
    <div className="contenedorPrincipalCardProducto" >
      <div className="informacionContainer">
        <div className="decoracionCardProducto">
          <img className="logoDecoracionCardProducto" src={logoBlanco} />
        </div>
        <button className="botonAñadirFavoritos" onClick={(e) => toggleFavorito(args.id, e)}>
          {favoritos.esFavorito(args.id) ?
            (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
            </svg>)
            :
            (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fillRule="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>)}
        </button>
        {state.userInfo &&
          (state.userInfo.tipo_usuario == 'admin' &&
            (<button className="eliminarElemento" onClick={() => eliminarProducto()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </button>)
          )
        }
        <div className="imagenContainerCardProducto">
          <img
            onClick={args.onClick}
            className="imagenProducto"
            src={`/PngsPerfiles/${args.cod_orig.slice(2)}.png`}
            onError={(e) => {
              e.target.src = `/ImagenesProductos/${args.cod_int.toLowerCase()}.png`;

              e.target.onerror = () => {
                e.target.src = `/ImagenesProductos/${args.cod_int.toLowerCase()}.jpg`;
                // Si falla la carga en formato JPG, intenta con BMP
                e.target.onerror = () => {
                  e.target.src = `/ImagenesProductos/${args.cod_int.toLowerCase()}.bmp`;

                  // Si falla la carga en formato BMP, intenta con JPEG
                  e.target.onerror = () => {
                    e.target.src = `/ImagenesProductos/${args.cod_int.toLowerCase()}.peg`;

                    // Si falla la carga en formato JPEG, carga una imagen por defecto
                    e.target.onerror = () => {
                      e.target.src = `/ImagenesProductos/xd.png`;
                    };
                  };
                };
              };
            }}
            alt="Imagen del producto"
            loading="lazy"
          />
        </div>
        <div className="detalleYCod_orig">
          <h3><span className="codOrig">{args.cod_orig}</span> - {args.detalle}</h3>
        </div>
        <div className="kgCantidadYColorContainer">
          <div className="kgProducto">
            {args.kg > 0 ? (
              <>
                <p>PESO PROMEDIO</p>
                <p><span className="pesoYColorTextoCardProducto">{args.kg}kg</span></p>
              </>
            ) : (<></>)}
          </div>
          <div className="conjuntoCantidadCardProducto">
            <button className="boton" onClick={restarContador}>-</button>
            <span className="cantidadProducto">{cantidad}</span>
            <button className="boton" onClick={sumarContador}>+</button>
          </div>
          <div className="colorCardProducto">
            {args.color == "Ind" ? (<></>) : (
              <>
                <p>COLOR</p>
                <div className="muestraColorCardProducto" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                  <p className="pesoYColorTextoCardProducto" style={usarBlanco ? { color: 'white' } : {}}>
                    {args.color.toUpperCase()}
                  </p>
                </div>
              </>)}

          </div>
        </div>
      </div>
      <div className="precioContainerCardProducto">
        <p className="precioCardProducto">{args.tipo_prod == 'PERFIL' ? (`PRECIO ${!mayorista ? 'MINORISTA ' : ''}APROXIMADO: $`) : (`PRECIO ${!mayorista ? 'MINORISTA' : ''}: $`)}{parseInt(args.kg > 0 ? (args.precio * args.kg) : (args.precio))}</p>
      </div>
    </div>
  );
}
