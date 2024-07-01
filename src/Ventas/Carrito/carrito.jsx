import React, { useState, useEffect, useRef } from 'react';
import './carrito.css';
import CardCarrito from './cardCarrito';
import { useCarrito } from '../../contextCarrito.jsx';
import { useProductos } from '../../contextProductos.jsx';
import { useFavoritos } from '../../contextFavoritos.jsx';
import { useTienda } from '../../contextTienda.jsx';
import carritoVacioImg from '../../Imagenes/carritoVacio.png';
import { useAuth } from '../../contextLogin.jsx';

export default function Carrito() {
  const {
    elementos,
    añadirElemento,
    setConfirmarCompraAbierto,
    setCompraRealizadaAbierto,
    setMostrarCartelError,
    confirmarCompra,
    setInstanciaPedido,
    extraerProducto,
    extraerProceso,
    extraerAcabado
  } = useCarrito();

  const {
    productosIndexado,
    coloresArray,
    productosEliminados,
    productosSueltos,
    procesos,
    troquelados,
    extraerMetrosCuadrados
  } = useProductos();

  const {
    carritoAbierto,
    toggleCarrito,
    setPrecioTotal,
    limpiarCarrito,
    setCarritoAbierto
  } = useCarrito();

  const {
    isMobile,
    isTablet
  } = useTienda();

  const { setFavoritosAbierto } = useFavoritos();

  const { state } = useAuth();

  const [codigoAgregadoRapido, setCodigoAgregadoRapido] = useState('');
  const [colorAgregadoRapido, setColorAgregadoRapido] = useState('');
  const [cantidadAgregadoRapido, setCantidadAgregadoRapido] = useState('');
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
  const [inputFocused, setInputFocused] = useState('');
  const [carritoHeight, setCarritoHeight] = useState(0);
  const [mostrarHint, setMostrarHint] = useState(false);

  const calcularTotal = (elementos) => {
    return elementos.reduce((total, elemento) => {
      // Extraer el producto, proceso y acabado del elemento
      const idProducto = extraerProducto(elemento.id);
      const idProceso = extraerProceso(elemento.id);
      const idAcabado = extraerAcabado(elemento.id);

      const producto = productosIndexado[idProducto];
      let proceso = procesos[idProceso];
      let acabado = procesos[idAcabado];

      if (!proceso) {
        proceso = troquelados[idProceso]
      }

      const precioElemento = parseInt(producto.rubro == 85 ?
        (producto.precio + (proceso ? (proceso.precio * extraerMetrosCuadrados(producto.detalle)) : (0)) + (acabado ? (acabado.precio * extraerMetrosCuadrados(producto.detalle)) : (0)))
        :
        ((elemento.kg > 0 && (productosIndexado[elemento.id] && productosIndexado[elemento.id].rubro != 85))
          ? (producto.precio * producto.kg + (proceso ? (proceso.precio * producto.kg) : 0) + (acabado ? (acabado.precio * producto.kg) : (0)))
          : producto.precio
        )
      )

      return total + (precioElemento * elemento.cantidadCarrito * elemento.cantidad);
    }, 0);
  };

  const handleEnterCodigo = (e, nextInputRef) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const codigoIngresado = codigoAgregadoRapido.toUpperCase().trim();
      if (codigoIngresado !== '') {
        let productosEncontrados;
        productosEncontrados = Object.values(productosSueltos).filter(producto => producto.cod_orig === codigoIngresado);

        if (productosEncontrados.length == 0) {
          productosEncontrados = Object.values(productosIndexado).filter(producto => producto.cod_orig === codigoIngresado);
        }

        const productosEncontradosFiltrados = productosEncontrados.filter(producto => !productosEliminados.includes(producto.id));

        if (!productosEncontradosFiltrados.length > 0) {
          setErrorMessage("Código incorrecto");
          setCodigoValido(false);
          setCodigoAgregadoRapido('');
        }
        else if (productosEncontradosFiltrados[0].tipo_prod != 'PERFIL') {
          setErrorMessage("No es un perfil")
          setCodigoValido(false);
          setCodigoAgregadoRapido('');
        }
        else {
          if (!state.userInfo.categoria != 'MAYORISTA') {
            setMostrarCartelError(true);
          }
          else {
            setProductosEncontrados(productosEncontradosFiltrados);
            setCodigoValido(true);
            nextInputRef.current.focus();
          }
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

      const colorExistente = coloresArray.find(color => color === colorIngresado);
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
    const sugerenciasFiltradas = coloresArray.filter(
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
    if (carritoAbierto) {
      if (elementos.length > 0) {
        if (isMobile) {
          setCarritoHeight(8 + 27 * elementos.length + (state.userInfo.categoria == 'MAYORISTA' ? 10.5 : 7.5));
        }
        else if (isTablet) {
          setCarritoHeight(3 + 4 + 27 * elementos.length + (state.userInfo.categoria == 'MAYORISTA' ? 7 : 5));
        }
        else {
          setCarritoHeight(0.5 + 5 + 20 * elementos.length + (state.userInfo.categoria == 'MAYORISTA' ? 6.1 : 3));
        }
      }
      else {
        if (isMobile) {
          setCarritoHeight(11 + 18.1);
        }
        else if (isTablet) {
          setCarritoHeight(3 + 4 + 10.5);
        }
        else {
          setCarritoHeight(0.5 + 5 + 10);
        }
      }
    } else {
      setCarritoHeight(0);
    }
  }, [carritoAbierto, elementos.length]);

  return (
    <div className={`contenedorPrincipalCarrito`} style={{ pointerEvents: carritoAbierto ? 'auto' : 'none' }}>
      <div className="contenedorBotonCarrito">
        <button
          type="button"
          className={`botonCarrito ${carritoAbierto ? 'open' : ''} ${!isTablet && 'desktop'}`}
          onClick={() => { toggleCarrito(); setFavoritosAbierto(false); setMostrarHint(false) }}
          style={{ pointerEvents: 'auto' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="white" className="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </button>
        <span className="cantidadEnCarrito" style={{ display: carritoAbierto ? 'none' : 'block' }}>
          {elementos.length}
        </span>
      </div>

      <div className={`bodyCarrito ${carritoAbierto ? 'open' : ''}`} style={{ height: `${carritoHeight}rem` }}>
        <div className="periferiaCarrito">
          <div className="tituloYHintCarrito">
            <p className="tituloCarrito">CARRITO - COMPRA RÁPIDA</p>
            <div className="botonHintCarrito" onClick={() => setMostrarHint(!mostrarHint)}>
              {mostrarHint ? (<p>X</p>) : (<p>?</p>)}
            </div>
            {mostrarHint && (<div className="hintCarrito">
              <p>PARA UTILIZAR LA COMPRA RÁPIDA ESCRIBA EL CÓDIGO DEL PERFIL QUE DESEA AGREGAR, EL COLOR Y LA CANTIDAD. VALIDE LOS DATOS PRESIONANDO <span>ENTER</span> O <span>TAB</span> AL TERMINAR DE ESCRIBIR CADA UNO DE ELLOS</p>
            </div>)}
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
                    cantidadCarrito={elemento.cantidadCarrito}
                  />
                ))}
                <button
                  className={`confirmarCarrito ${state.userInfo.categoria == 'MAYORISTA' && 'mayorista'}`}
                  disabled={!elementos.length > 0}
                  onClick={() => {
                    if (!state.userInfo.cliente) {
                      setConfirmarCompraAbierto(true);
                      setPrecioTotal(calcularTotal(elementos));
                      setInstanciaPedido('envio');
                    } else {
                      confirmarCompra();
                      limpiarCarrito();
                      setCarritoAbierto(false);
                    }
                  }}
                >
                  CONFIRMAR PEDIDO: ${calcularTotal(elementos)}
                  <br />
                  (CON DESCUENTO POR PAGO AL CONTADO: ${parseInt(calcularTotal(elementos) * 97 / 100)})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}