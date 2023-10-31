import React, { useState } from 'react';

export default function CardCarrito(args) {
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    if (!isNaN(args.cantidadEditable) && parseInt(args.cantidadEditable) >= 0) {
      args.actualizarCantidadEnCarrito(args.codigo, parseInt(args.cantidadEditable));
      setEditMode(false);
    }
  };

  return (
    <div className="cardCarrito">
      <p className="nombre">{args.nombre}</p>
      {editMode ? (
        <div>
          <input
            type="number"
            value={args.cantidadEditable}
            onChange={(e) => args.setCantidadEditable(e.target.value)}
          />
          <button onClick={handleSave}>Guardar</button>
        </div>
      ) : (
        <p className="cantidad" onClick={() => setEditMode(true)}>
          Cantidad: {args.cantidad}
        </p>
      )}
      <p className="precio">Precio: {args.precio}</p>
    </div>
  );
}