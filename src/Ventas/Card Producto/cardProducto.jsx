import './cardProducto.css';
import perfil1 from '../../Imagenes/perfil1.png';
import perfil2 from '../../Imagenes/perfil2.png';
import perfil3 from '../../Imagenes/perfil3.png';
import perfil4 from '../../Imagenes/perfil4.png';
import perfil5 from '../../Imagenes/perfil5.png';
import React from 'react';
import { useCarrito } from '../../contextCarrito.jsx';
import { useAuth } from '../../contextLogin.jsx';
import { useFavoritos } from '../../contextFavoritos.jsx';
import { useProductos } from '../../contextProductos.jsx';

export default function CardProducto(args) {
  const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
  const elementoExistente = elementosCarrito.find((elemento) => elemento.id === args.id);
  const cantidad = elementoExistente ? elementoExistente.cantidad : 0;
  const auth = useAuth();
  const favoritos = useFavoritos();

  const sumarContador = (event) => {
    event.stopPropagation();
    if (auth.state.logueado) {
      if (auth.state.userInfo.email_confirmado) {
        añadirElemento(args.id, args.cod_orig, args.detalle, 1, args.precio);
      }
      else {
        auth.setMostrarLogin(true);
      }
    }
    else {
      auth.setMostrarLogin(true);
    }
  }

  const restarContador = (event) => {
    event.stopPropagation();
    if (auth.state.logueado) {
      if (auth.state.userInfo.email_confirmado) {
        if (cantidad > 0) {
          restarElemento(args.id);
        }
      }
      else {
        auth.setMostrarLogin(true);
      }
    }
    else {
      auth.setMostrarLogin(true);
    }
  }

  const toggleFavorito = (id, e) => {
    e.stopPropagation();
    if (auth.state.logueado) {
      favoritos.toggleFavorito(id);
    }
    else {
      auth.setMostrarLogin(true);
    }
  };

  return (
    <div className="contenedorPrincipalCardProducto" onClick={args.onClick}>
      <div className="cod_origContainer">
        <p className="cod_orig">    {args.cod_orig}    </p>
      </div>
      <button className="botonAñadirFavoritos" onClick={(e) => toggleFavorito(args.id, e)}>
        {favoritos.esFavorito(args.id) ?
          (<svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>)
          :
          (<svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fillRule="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>)}
      </button>
      <div className="contenedorCardProducto">
        <div className="imagenContainerCardProducto">
          <img className="imagenProducto" src={args.id % 5 == 0 ?
            (perfil1)
            :
            (args.id % 5 == 1 ?
              (perfil2)
              :
              (args.id % 5 == 2 ?
                (perfil3)
                :
                (args.id % 5 == 3 ?
                  (perfil4)
                  :
                  (perfil5))))} alt="Producto">
          </img>
        </div>
        <div className="detalle">
          <h3>{args.detalle}</h3>
        </div>
        <div className="cantidadCardProducto">
          <button className="boton" onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button className="boton" onClick={sumarContador}>+</button>

          <div className="colores">
            <div className="color natural" />
            <div className="color blanco" />
            <div className="color negro" />
            <div className="color madera" />
          </div>
        </div>
        <div className="precioContainer">
          <p className="precio">${args.precio}</p>
        </div>
      </div>
    </div>
  );
}
