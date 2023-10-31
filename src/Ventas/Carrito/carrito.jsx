import React, { useState } from 'react';
import './carrito.css';
import CardCarrito from './cardCarrito';
import { useCarrito } from '../../context.jsx';
import { Collapse, Button } from 'react-bootstrap';

export default function Carrito() {
  const { elementos } = useCarrito();
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  }

  return (
    <div className="contenedorPrincipalCarrito">
      <Button onClick={toggleCarrito} variant="primary">
  {carritoAbierto ? "Cerrar carrito" : `Carrito (${elementos.length})`}
</Button>

      <Collapse in={carritoAbierto}>
        <div className="elementosVisiblesCarrito">
          {elementos.length === 0 ? (
            <p className="textoCarritoVacio">El carrito está vacío</p>
          ) : (
            elementos.map((elemento, index) => (
              <CardCarrito
                key={elemento.codigo}
                codigo={elemento.codigo}
                cantidad={elemento.cantidad}
                precio={elemento.precio}
                nombre={elemento.detalle}
              />
            ))
          )}
        </div>
      </Collapse>
    </div>
  );
}