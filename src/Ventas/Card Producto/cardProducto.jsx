import './cardProducto.css';
import perfil from '../../Imagenes/perfil.jpg';
import React from 'react';
import { useCarrito } from '../../context.jsx';

export default function CardProducto(args) {
  const { añadirElemento, restarElemento, elementos: elementosCarrito } = useCarrito();
  const elementoExistente = elementosCarrito.find((elemento) => elemento.codigo === args.cod_int);
  const cantidad = elementoExistente ? elementoExistente.cantidad : 0;

  const sumarContador = () => {
    añadirElemento(args.cod_int, args.detalle, 1, 777);
  }

  const restarContador = () => {
    if (cantidad > 0) {
      restarElemento(args.cod_int);
    }
  }

  return (
    <div className="card">
      <p className="cod_int">CA {args.cod_int}</p>
      <div className="imagenContainer">
        <img className="imagenProducto" src={perfil} alt="Producto"></img>
      </div>
      <div className="cantidad">
        <button className="boton" onClick={restarContador}>-</button>
        <span>{cantidad}</span>
        <button className="boton" onClick={sumarContador}>+</button>
      </div>
      <div className="texto">
        <p className="rubro">Rubro: {args.rubro}</p>
        <p className="srubro">Subrubro: {args.srubro}</p>
      </div>
    </div>
  );
}
