import React, { useState } from 'react';
import './carrito.css';
import CardCarrito from './cardCarrito';
import { useCarrito } from '../../context.jsx';
import { Collapse, Button, Form, InputGroup } from 'react-bootstrap';
import { productos } from '../../productos.js';

export default function Carrito() {
  const { elementos, añadirElemento } = useCarrito();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [codigoProducto, setCodigoProducto] = useState('');
  const [codigoErroneo, setCodigoErroneo] = useState(false);

  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  }

  const agregarProductoConTexto = (codigo) => {
    const productoExistente = productos.find((producto) => producto.cod_int == codigo);

    if (productoExistente) {
      añadirElemento(productoExistente.cod_int, productoExistente.detalle, 1, 777);
      setCodigoErroneo(false);
    }
    else{
      setCodigoErroneo(true);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      agregarProductoConTexto(codigoProducto);
      setCodigoProducto('');
    }
  }

  return (
    <div className="contenedorPrincipalCarrito">
      <Button onClick={toggleCarrito} variant="primary">
        {carritoAbierto ? "Cerrar carrito" : `Carrito (${elementos.length})`}
      </Button>

      <Collapse in={carritoAbierto}>
        <div className="elementosVisiblesCarrito">
          <InputGroup className={`textoInput ${codigoErroneo ? 'error-text' : ''}`}>
            <Form.Control
              className="textoInput"
              type="text"
              placeholder={codigoErroneo ? 'Código incorrecto' : 'Ingrese el código del producto'}
              value={codigoProducto}
              onChange={(e) => setCodigoProducto(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </InputGroup>

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