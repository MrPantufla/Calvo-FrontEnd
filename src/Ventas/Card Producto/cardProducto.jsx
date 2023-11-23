import './cardProducto.css';
import perfil from '../../Imagenes/perfil.jpg';
import React from 'react';
import { useCarrito } from '../../contextCarrito.jsx';
import { useAuth } from '../../contextLogin.jsx';

export default function CardProducto(args) {
  const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
  const elementoExistente = elementosCarrito.find((elemento) => elemento.cod_orig === args.cod_orig);
  const cantidad = elementoExistente ? elementoExistente.cantidad : 0;
  const auth = useAuth();

  const sumarContador = (event) => {
    event.stopPropagation();
    if(auth.state.logueado){
      if(auth.state.userInfo.email_confirmado){
        añadirElemento(args.cod_orig, args.detalle, 1, 777);
      }
      else{
        auth.setMostrarLogin(true);
      }
    }
    else{
      auth.setMostrarLogin(true);
    }
  }

  const restarContador = (event) => {
    event.stopPropagation();
    if(auth.state.logueado){
      if(auth.state.userInfo.email_confirmado){
        if (cantidad > 0) {
          restarElemento(args.cod_orig);
        }
      }
      else{
        auth.setMostrarLogin(true);
      }
    }
    else{
      auth.setMostrarLogin(true);
    }
  }

  return(
    <div className="card" onClick={args.onClick}>
      <p className="cod_orig">{args.cod_orig}</p>
      <div className="imagenContainer">
        <img className="imagenProducto" src={perfil} alt="Producto"></img>
      </div>
      <div className="detalle">
        <h3>{args.detalle}</h3>
      </div>
      <div className="cantidad">
        <button className="boton" onClick={restarContador}>-</button>
        <span>{cantidad}</span>
        <button className="boton" onClick={sumarContador}>+</button>
      </div>
      <div className="texto">
        <p className="rubro">Tipo: {args.tipo_prod}</p>
        <p className="srubro">Subrubro: {args.srubro}</p>
      </div>
    </div>
  );
}
