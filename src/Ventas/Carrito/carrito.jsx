import React, { useState, useEffect, useRef } from 'react';
import './carrito.css';
import CardCarrito from './cardCarrito';
import { useCarrito } from '../../contextCarrito.jsx';
import { useProductos } from '../../contextProductos.jsx';
import { useFavoritos } from '../../contextFavoritos.jsx';
import carritoVacioImg from '../../Imagenes/carritoVacio.png';

export default function Carrito() {
  const { elementos, añadirElemento, setConfirmarCompraAbierto } = useCarrito();
  const [codigoAgregadoRapido, setCodigoAgregadoRapido] = useState('');
  const [colorAgregadoRapido, setColorAgregadoRapido] = useState('');
  const [cantidadAgregadoRapido, setCantidadAgregadoRapido] = useState('');
  const productos = useProductos();
  const carrito = useCarrito();
  const [errorMessage, setErrorMessage] = useState('');
  const [productosEncontrados, setProductosEncontrados] = useState();
  const [productoSeleccionado, setProductoSeleccionado] = useState();
  const [codigoValido, setCodigoValido] = useState();
  const [colorValido, setColorValido] = useState();
  const [cantidadValida, setCantidadValida] = useState();
  const codigoInputRef = useRef(null);
  const colorInputRef = useRef(null);
  const cantidadInputRef = useRef(null);
  const [sugerenciaColor, setSugerenciaColor] = useState('');
  const favoritos = useFavoritos();
  const [inputFocused, setInputFocused] = useState('');
  const [carritoTop, setCarritoTop] = useState(3.2);
  const [carritoHeight, setCarritoHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxCarritoTop = 3.2;
      const minCarritoTop = 2.2;
      const alturaHeader = 150;

      let newTop =
        maxCarritoTop -
        (maxCarritoTop - minCarritoTop) * (scrollPosition / alturaHeader);

      newTop = Math.max(minCarritoTop, newTop);

      setCarritoTop(newTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calcularTotal = (elementos) => {
    return elementos.reduce((total, elemento) => parseInt(total + elemento.precioProducto * elemento.kg * elemento.cantidad), 0);
  };

  const handleEnterCodigo = (e, nextInputRef) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const codigoIngresado = codigoAgregadoRapido.toUpperCase().trim();
      if (codigoIngresado !== '') {
        const productosEncontrados = Object.values(productos.productosIndexado).filter(producto => producto.cod_orig === codigoIngresado);

        if (!productosEncontrados.length > 0) {
          setErrorMessage("El código ingresado no existe");
          setCodigoValido(false);
          setCodigoAgregadoRapido('');
        }
        else {
          setProductosEncontrados(productosEncontrados);
          setCodigoValido(true);
          nextInputRef.current.focus();
        }
      }
    }
  };

  const handleEnterColor = (e, nextInputRef) => {
    let colorIngresado;
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (sugerenciaColor) {
        setColorAgregadoRapido(sugerenciaColor)
        colorIngresado = sugerenciaColor;
      }
      else {
        colorIngresado = colorAgregadoRapido.toUpperCase().trim();
      }

      e.preventDefault();

      if (colorIngresado == '') {
        colorIngresado = 'IND';
      }

      const colorExistente = productos.coloresArray.find(color => color === colorIngresado);
      if (colorExistente) {
        if (codigoValido) {
          const colorProductoExistente = productosEncontrados.find(producto => producto.color.toUpperCase() === colorIngresado);
          if (codigoAgregadoRapido) {
            if (colorProductoExistente) {
              setProductoSeleccionado(colorProductoExistente);
              setColorValido(true);
              nextInputRef.current.focus();
            } else {
              setColorValido(false);
              setColorAgregadoRapido('');
              setErrorMessage("Color inválido para este producto");
            }
          }
        }
        else {
          setColorValido(false);
          setColorAgregadoRapido('');
          setErrorMessage("Ingresa un producto antes");
          codigoInputRef.current.focus();
        }
      } else {
        setColorValido(false);
        setColorAgregadoRapido('');
        setErrorMessage("El color ingresado no existe");
      }

    }
  };

  const handleEnterCantidad = (e, nextInputRef) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (cantidadAgregadoRapido > 0 || cantidadAgregadoRapido == ('')) {
        setCantidadValida(true);
        if (codigoValido && colorValido) {
          setProductosEncontrados();
          setCodigoAgregadoRapido('');
          setProductoSeleccionado();
          setColorAgregadoRapido('');
          setCantidadAgregadoRapido('');
          setCodigoValido();
          setColorValido();
          setCantidadValida();
          if (cantidadAgregadoRapido == ('')) {
            añadirElemento(productoSeleccionado.id, 1);
          }
          else {
            añadirElemento(productoSeleccionado.id, parseInt(cantidadAgregadoRapido));
          }
          nextInputRef.current.focus();
        }
        else {
          setErrorMessage('Corrige los campos inválidos')
        }
      }
      else {
        setCantidadValida(false);
        setCantidadAgregadoRapido('');
      }
    }
  }

  const obtenerSugerenciaColor = () => {
    const palabra = colorAgregadoRapido.toUpperCase().trim();
    const sugerenciasFiltradas = productos.coloresArray.filter(
      (sugerencia) => sugerencia.toUpperCase().startsWith(palabra.toUpperCase())
    );
    return (sugerenciasFiltradas.length > 0 && colorAgregadoRapido.length > 0) ? sugerenciasFiltradas[0] : '';
  };

  useEffect(() => {
    setSugerenciaColor(obtenerSugerenciaColor().toUpperCase());
  }, [colorAgregadoRapido]);

  const leaveFocus = () => {
    setInputFocused('');
    setErrorMessage('');
  }

  const elementosReverse = [...elementos].reverse();

  useEffect(() => {
    if (carrito.carritoAbierto) {
      if (elementos.length > 0) {
        if(isMobile){
          setCarritoHeight(8 + 27 * elementos.length + 5);
        }
        else{
          setCarritoHeight(0.5 + 5 + 20 * elementos.length + 3);
        }
      }
      else {
        if(isMobile){
          setCarritoHeight(4 + 14.1);
        }
        else{
          setCarritoHeight(0.5 + 5 + 10);
        }
      }
    } else {
      setCarritoHeight(0);
    }
  }, [carrito.carritoAbierto, elementos.length]);

  return (
    <div className="contenedorPrincipalCarrito" style={{ top: `${carritoTop}rem` }}>
      <div className="contenedorBotonCarrito">
        <button type="button"
          className={`botonCarrito ${carrito.carritoAbierto ? 'open' : ''}`}
          onClick={() => { carrito.toggleCarrito(); favoritos.setFavoritosAbierto(false); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="white" className="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </button>
        <span className="cantidadEnCarrito" style={{ display: carrito.carritoAbierto ? 'none' : 'block' }}>
          {elementos.length}
        </span>
      </div>

      <div className={`bodyCarrito ${carrito.carritoAbierto ? 'open' : ''}`} style={{ height: `${carritoHeight}rem`, maxHeight: `50rem` }}>
        <div className="periferiaCarrito">
          <div className="tituloYHintCarrito">
            <p className="tituloCarrito">CARRITO - COMPRA RÁPIDA</p>
            <div className="hintCarrito" title="Para utilizar la compra rápida escriba el código del producto que desea agregar, el color y la cantidad. Valide los datos presionando Enter o Tab al terminar de escribirlos">
              <p>?</p>
            </div>
          </div>
          <div className="elementosVisiblesCarrito">
            <form className="agregadoRapido">
              <input
                ref={codigoInputRef}
                className={`codigoAgregadoRapido form-group-agregadoRapido ${codigoValido ? 'valido' : codigoValido === false ? 'invalido' : ''}`}
                type="text"
                placeholder={`${errorMessage != '' && inputFocused == 'codigo' ? errorMessage : 'CÓDIGO'}`}
                value={codigoAgregadoRapido}
                onChange={(e) => {
                  setCodigoAgregadoRapido(e.target.value.toUpperCase());
                  setCodigoValido();
                  setErrorMessage('');
                }}
                onKeyDown={(e) => handleEnterCodigo(e, colorInputRef)}
                onFocus={() => setInputFocused('codigo')}
                onBlur={leaveFocus}
              />
              <div className="colorAgregadoRapido">
                {sugerenciaColor && (
                  <div className="sugerenciaColor sugerencia">
                    <p className="textoSugerencia"> {!colorValido ? (sugerenciaColor) : ('')}</p>
                  </div>
                )}
                <input
                  ref={colorInputRef}
                  className={`form-group-agregadoRapido ${colorValido ? 'valido' : colorValido === false ? 'invalido' : ''}`}
                  type="text"
                  placeholder={`${errorMessage != '' && inputFocused == 'color' ? errorMessage : 'COLOR'}`}
                  value={colorAgregadoRapido}
                  onChange={(e) => {
                    setColorAgregadoRapido(e.target.value.toUpperCase());
                    setColorValido();
                    setErrorMessage('');
                  }}
                  onKeyDown={(e) => handleEnterColor(e, cantidadInputRef)}
                  onFocus={() => setInputFocused('color')}
                  onBlur={leaveFocus}
                />
              </div>
              <input
                ref={cantidadInputRef}
                className={`cantidadAgregadoRapido form-group-agregadoRapido ${cantidadValida ? 'valido' : cantidadValida === false ? 'invalido' : ''}`}
                placeholder={`${errorMessage != '' && inputFocused == 'cantidad' ? errorMessage : 'CANT'}`}
                value={cantidadAgregadoRapido}
                onChange={(e) => {
                  setCantidadAgregadoRapido(e.target.value.toUpperCase());
                  setErrorMessage('');
                  setCantidadValida();
                }}
                onKeyDown={(e) => handleEnterCantidad(e, codigoInputRef)}
                onFocus={() => setInputFocused('cantidad')}
                onBlur={leaveFocus}
              />
            </form>
            {elementos.length === 0 ? (
              <div className="carritoVacioContainer">
                <img src={carritoVacioImg} />
                <p>TU CARRITO ESTÁ VACÍO</p>
              </div>
            ) : (
              <>
                {elementosReverse.map((elemento, index) => (
                  <CardCarrito
                    key={index}
                    id={elemento.id}
                    cantidad={elemento.cantidad}
                  />
                ))}
                <button
                  className="confirmarCarrito"
                  disabled={!elementos.length > 0}
                  onClick={() => { setConfirmarCompraAbierto(true) }}
                >
                  CONFIRMAR PEDIDO (${calcularTotal(elementos)})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}