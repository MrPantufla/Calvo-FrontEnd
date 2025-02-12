import React, { useState, useEffect, useRef } from 'react';
import './carrito.css';
import CardCarrito from './cardCarrito';
import { useCarrito } from '../../contextCarrito.jsx';
import { useProductos } from '../../contextProductos.jsx';
import { useFavoritos } from '../../contextFavoritos.jsx';
import { useTienda } from '../../contextTienda.jsx';
import carritoVacioImg from '../../Imagenes/carritoVacio.webp';
import { useAuth } from '../../contextLogin.jsx';
import { useVariables } from '../../contextVariables.jsx';
import PdfCarrito from './PdfCarrito/pdfCarrito.jsx';

export default function Carrito(args) {
  const {
    elementos,
    añadirElemento,
    //setConfirmarCompraAbierto,
    setMostrarCartelError,
    extraerProducto,
    extraerTroquelado,
    extraerProceso,
    extraerAcabado,
    generarPdf,
    carritoAbierto,
    toggleCarrito,
    setPrecioTotal
  } = useCarrito();

  const {
    productosIndexado,
    coloresArray,
    productosEliminados,
    productosSueltos,
    procesos,
    troquelados,
    extraerMetrosCuadrados,
    preciosOcultos,
    ofertas
  } = useProductos();

  const {
    isMobile,
    isTablet
  } = useTienda();

  const {
    backend,
    setMostrarEnvios,
    setMostrarFacturacion,
    setMostrarConfirmarCompra,
    setMostrarCartelCliente,
    mostrarCartelCliente,
    setMostrarPagos,
    obtenerToken
  } = useVariables();

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
  const [mostrarHint, setMostrarHint] = useState(false);
  const pdfCarritoRef = useRef(null);

  const calcularTotal = (elementos, conDescuento) => {
    return elementos.reduce((total, elemento) => {

      const idProducto = extraerProducto(elemento.id);
      const idTroquelado = extraerTroquelado(elemento.id);
      const idProceso = extraerProceso(elemento.id);
      const idAcabado = extraerAcabado(elemento.id);

      let producto = productosIndexado[idProducto];

      if (producto == null) {
        producto = productosSueltos[idProducto];
      }

      let troquelado = troquelados[idTroquelado];
      let proceso = procesos[idProceso];
      let acabado = procesos[idAcabado];

      const ofertaEncontrada = ofertas.find(o => o.idProducto == producto.id);

      const productoPrecioFinal = producto.precio - (ofertaEncontrada ? (ofertaEncontrada.descuento / 100 * producto.precio) : 0);

      const precioElemento = (producto.rubro == 85 ?
        (productoPrecioFinal + (proceso ? (proceso.precio * extraerMetrosCuadrados(producto.detalle)) : (0)) + (acabado ? (acabado.precio * extraerMetrosCuadrados(producto.detalle)) : (0)))
        :
        (producto && producto.kg > 0)
          ? (productoPrecioFinal * producto.kg + (troquelado ? troquelado.precio : 0) + (proceso ? (proceso.precio * producto.kg) : 0) + (acabado ? (acabado.precio * producto.kg) : (0)))
          : productoPrecioFinal
      )

      if (conDescuento && !(elemento.tipo_prod == 'PERFIL' && (elemento.cod_origProducto.endsWith('E') || elemento.cod_origProducto.endsWith('ES')))) {

        return total + ((precioElemento * elemento.cantidadCarrito * elemento.cantidad) * 97 / 100);
      }
      else {
        return total + (precioElemento * elemento.cantidadCarrito * elemento.cantidad);
      }
    }, 0);
  };

  const handleEnterCodigo = (e, nextInputRef) => {
    if (e.key === 'Enter' || e.key === 'Tab') {

      if (e.key == 'Tab') {
        e.preventDefault();
      }

      let codigoIngresado = codigoAgregadoRapido.toUpperCase().trim();
      if (codigoIngresado !== '') {

        if ((codigoIngresado.slice(0, 2) != 'CA')) {
          codigoIngresado = "CA" + codigoIngresado;
        }

        let productosEncontrados;
        productosEncontrados = Object.values(productosSueltos).filter(producto => producto.cod_orig === codigoIngresado);
        let arrayCompleto = productosSueltos;

        if (productosEncontrados.length == 0) {
          productosEncontrados = Object.values(productosIndexado).filter(producto => producto.cod_orig === codigoIngresado);
          arrayCompleto = productosIndexado;
        }

        const productosEncontradosFiltrados = productosEncontrados.filter(producto => (!productosEliminados.includes(producto.id) && !preciosOcultos.includes(producto.id) && !arrayCompleto[producto.id].precio == 0));

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
          if (state.userInfo.categoria != 'MAYORISTA') {
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
      if (e.key == 'Tab') {
        e.preventDefault();
      }

      if (sugerenciaColor) {
        setColorAgregadoRapido(sugerenciaColor)
        colorIngresado = sugerenciaColor;
      }
      else {
        colorIngresado = colorAgregadoRapido.toUpperCase().trim();
      }

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
      if (e.key == 'Tab') {
        e.preventDefault();
      }

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
          if (!codigoValido) {
            nextInputRef.current.focus();
          }
          else if (codigoValido && !colorValido) {
            colorInputRef.current.focus()
          }
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

  const handleButtonClick = () => {
    if (inputFocused === 'codigo') {
      handleEnterCodigo({ type: 'keydown', key: 'Enter' }, colorInputRef);
    } else if (inputFocused === 'color') {
      handleEnterColor({ type: 'keydown', key: 'Enter' }, cantidadInputRef);
    } else {
      handleEnterCantidad({ type: 'keydown', key: 'Enter' }, codigoInputRef);
    }
  };

  useEffect(() => {
    setSugerenciaColor(obtenerSugerenciaColor().toUpperCase());
  }, [colorAgregadoRapido]);

  const leaveFocus = () => {
    setInputFocused('');
    setErrorMessage('');
  }

  const elementosReverse = [...elementos].reverse();

  const precioParaMostrarString = calcularTotal ? parseInt(calcularTotal(elementos, false)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
  const precioParaMostrarStringDescuento = calcularTotal ? (parseInt(calcularTotal(elementos, true))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

  const enviarPresupuesto = async (e) => {
    e.preventDefault();

    const bodyData = {
      carritoElementosPdf: pdfCarritoRef.current.elementosFinal,
      totalPdf: pdfCarritoRef.current.totalPdf
    };

    try {
      await fetch(`${backend}/presupuesto/post`, {
        method: 'POST',
        headers: {
          'Authorization': obtenerToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
      })
    } catch (error) {
      console.error('Error al enviar presupuesto:', error);
    }
  };

  return (
    <div className={`contenedorPrincipalCarrito`} style={{ pointerEvents: carritoAbierto ? 'auto' : 'none' }}>
      <div className="contenedorBotonCarrito">
        <button
          type="button"
          className={`botonCarrito ${carritoAbierto && 'open'} ${!isTablet && 'desktop'}`}
          onClick={() => { toggleCarrito(); setFavoritosAbierto(false); setMostrarHint(false) }}
          style={{ pointerEvents: 'auto' }}
          aria-label='abrirOCerrarCarrito'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="white" className="bi bi-cart2" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </button>
        <span className="cantidadEnCarrito" style={{ display: carritoAbierto ? 'none' : 'block' }}>
          {elementos.length}
        </span>
      </div>

      <div className={`bodyCarrito ${carritoAbierto && 'open'}`}>
        <div className="periferiaCarrito">
          <div className="tituloYHintCarrito">
            <PdfCarrito ref={pdfCarritoRef} />
            <button disabled={elementos.length < 1} className={`botonDescargarPresupuesto ${elementos.length < 1 && 'disabled'}`} onClick={(e) => { generarPdf(); enviarPresupuesto(e) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
            </button>
            <p className="tituloCarrito">CARRITO - COMPRA RÁPIDA</p>
            <div className="botonHintCarrito" onClick={() => setMostrarHint(!mostrarHint)}>
              {mostrarHint ? (<p>X</p>) : (<p>?</p>)}
            </div>
            {mostrarHint && (<div className="hintCarrito">
              <p>PARA UTILIZAR LA COMPRA RÁPIDA ESCRIBA EL CÓDIGO DEL PERFIL QUE DESEA AGREGAR, EL COLOR Y LA CANTIDAD. VALIDE LOS DATOS PRESIONANDO<span>{!isTablet ? (' ENTER, TAB O') : ('')} EL ÍCONO DE LA FLECHA</span> AL TERMINAR DE ESCRIBIR CADA UNO DE ELLOS</p>
            </div>)}
          </div>
          <div className="elementosVisiblesCarrito">
            {
              <form className="agregadoRapido" onClick={() => setMostrarHint(false)}>
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
                  onFocus={() => { setInputFocused('codigo'); setErrorMessage('') }}
                //onBlur={leaveFocus}
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
                  //onBlur={leaveFocus}
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
                  onFocus={() => { setInputFocused('cantidad'); setErrorMessage('') }}
                //onBlur={leaveFocus}
                />
                <div className="enviarCompraRapida">
                  <div className="divInternoEnviarCompraRapida" onClick={() => handleButtonClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="var(--colorSecundario)" className="bi bi-arrow-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                  </div>
                </div>
              </form>
            }
            {elementos.length === 0 ? (
              <div className="carritoVacioContainer">
                <img src={carritoVacioImg} alt="Carrito vacío" loading='lazy'/>
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
                    setPrecioTotal(calcularTotal(elementos));
                    //setMostrarFacturacion(true);
                    setMostrarConfirmarCompra(true);
                    //setMostrarPagos(true);
                    setMostrarEnvios(true);
                  }}
                >
                  CONFIRMAR PEDIDO: ${precioParaMostrarString}
                  {(state.userInfo && state.userInfo.cliente) &&
                    <>
                      <br />
                      (CON PAGO AL CONTADO Y SIN SALDO: ${precioParaMostrarStringDescuento})
                    </>
                  }
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}