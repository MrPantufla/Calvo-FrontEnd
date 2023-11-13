import React, { useState } from 'react';
import './carrito.css';
import CardCarrito from './cardCarrito';
import { useCarrito } from '../../context.jsx';
import { Collapse, Button, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Carrito(props) {
  const { elementos, añadirElemento } = useCarrito();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [codigoProducto, setCodigoProducto] = useState('');
  const [codigoErroneo, setCodigoErroneo] = useState(false);

  const message = "Ingrese el código del producto a agregar.\nPara añadir una cantidad personalizada escríbala separada por un espacio.\nEj: 1905 2";

  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  }

  const agregarProductoConTexto = (codigo) => {
    const [codigoSinCantidad, cantidad] = codigo.split(' ');
    const productoExistente = props.json.find((producto) => producto.cod_orig == (codigoSinCantidad));

    const cantidadNumero = (cantidad) => {
      if ((/^[0-9]+$/.test(cantidad)) || cantidad == null) {
        return true
      }
      else {
        return false;
      }
    }

    let band = cantidadNumero(cantidad);

    if (productoExistente && band) {
      const cantidadAAgregar = cantidad ? parseInt(cantidad) : 1;
      añadirElemento(productoExistente.cod_orig, productoExistente.detalle, cantidadAAgregar, 777);
      setCodigoErroneo(false);
    } else {
      setCodigoErroneo(true);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      agregarProductoConTexto(codigoProducto);
      setCodigoProducto('');
    }
  }

  const calcularTotal = (elementos) => {
    return elementos.reduce((total, elemento) => total + elemento.precio * elemento.cantidad, 0);
  };

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
              placeholder={codigoErroneo ? 'Código incorrecto o cantidad errónea' : 'Ingrese el código del producto'}
              value={codigoProducto}
              onChange={(e) => {
                setCodigoProducto(e.target.value);
                setCodigoErroneo(false);
              }}
              onKeyPress={handleKeyPress}
            />
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip className="tooltip" id="tooltip-hint">
                  {message.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </Tooltip>
              }
            >
              <InputGroup.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
              </InputGroup.Text>
            </OverlayTrigger>
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
          <p className="total">Total: ${calcularTotal(elementos)}</p>
        </div>
      </Collapse>
    </div>
  );
}