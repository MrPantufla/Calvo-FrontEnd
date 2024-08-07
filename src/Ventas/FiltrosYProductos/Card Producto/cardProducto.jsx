import './cardProducto.css';
import logoBlanco from '../../../Imagenes/ca.webp'
import { useEffect, useState } from 'react';
import React from 'react';
import { useCarrito } from '../../../contextCarrito.jsx';
import { useAuth } from '../../../contextLogin.jsx';
import { useFavoritos } from '../../../contextFavoritos.jsx';
import { useProductos } from '../../../contextProductos.jsx';
import { useTienda } from '../../../contextTienda.jsx';
import { marcasUnicasPerfiles } from '../../../rubros.js';

export default function CardProducto(args) {
  const {
    eliminarProducto,
    productosSueltos,
    setProductosDestacados,
    productosDestacados,
    procesos,
    troquelados,
    extraerMetrosCuadrados
  } = useProductos();

  const {
    state,
    setMostrarLogin
  } = useAuth();

  const favoritos = useFavoritos();

  const {
    añadirElemento,
    restarElemento,
    elementos: elementosCarrito,
  } = useCarrito();

  const {
    id = { id },
    cod_orig = { cod_orig },
    tipo_prod = { tipo_prod },
    srubro = { srubro },
    rubro = { rubro },
    marca = { marca },
    detalle = { detalle },
    precio = { precio },
    kg = { kg },
    cod_int = { cod_int },
    referencia = { referencia },
    cantidad = { cantidad },
  } = args.producto;

  const { isMobile } = useTienda();

  const color = args.color ? (args.color) : (args.producto.color);

  const mayorista = state.userInfo ? (state.userInfo.categoria == 'MAYORISTA') : (false);

  const colorCorregido = (color).replace(/\s+/g, '-');
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState();
  const [dropdownDesplegado, setDropdownDesplegado] = useState(false);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(true);

  const toggleDropdown = () => {
    setDropdownDesplegado(!dropdownDesplegado);
  }

  const seleccionarCantidad = (cantidad) => {
    setCantidadSeleccionada(cantidad);
    toggleDropdown();
  }

  let precioParaUsar;
  let idAux;
  let idParaUsar;

  if (paqueteSeleccionado) {
    precioParaUsar = precio;
    idAux = id;
  }
  else {
    precioParaUsar = productosSueltos[referencia].precio;
    idAux = productosSueltos[referencia].id;
  }

  let proceso = procesos[args.proceso];

  if (proceso && kg <= 1.8) {
    const procesoLiviano = Object.values(procesos).find(p => (p.cod_orig.slice(-2) == 'LL' && p.cod_orig.slice(0, -3) == proceso.cod_orig));

    if (procesoLiviano) {
      proceso = procesoLiviano;
    }
  }

  const troqueladoRegex = /^CA\d+T$/;
  if (troqueladoRegex.test(cod_orig)) {
    const codigoPerfil = cod_orig.substring(2, cod_orig.length - 1);
    const troqueladoCorrespondiente = Object.values(troquelados).find(t => t.detalle.includes(codigoPerfil));

    if (troqueladoCorrespondiente) {
      proceso = troqueladoCorrespondiente;
    }
  }

  let acabado = procesos[0];
  if (args.acabado) {
    acabado = procesos[args.acabado];
  }

  idParaUsar = proceso ? (id + '(' + proceso.id + '(' + acabado.id + '))') : (idAux);

  const elementoExistente = elementosCarrito.find((elemento) => elemento.id === idParaUsar);

  const cant = elementoExistente ? elementoExistente.cantidadCarrito : 0;

  let codigo;
  marcasUnicasPerfiles.find(marcaPerfil => marca == marcaPerfil) ? (codigo = cod_orig) : (codigo = cod_int);

  let idParaFavoritos = id;
  if (referencia) {
    idParaFavoritos = productosSueltos[referencia].id;
  }

  const usarBlanco = (color == 'Negro' ||
    color == 'Azul' ||
    color == 'Marron oscuro' ||
    color == 'Bronce oscuro' ||
    color == 'Simil madera' ||
    color == 'Platil' ||
    color == 'Peltre' ||
    color == 'Fume' ||
    color == 'Rojo' ||
    color == 'Gris azulado' ||
    color == 'Bronce medio' ||
    color == 'Bronce oscuro'
  );

  const sumarContador = () => {
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        if (referencia && !cantidadSeleccionada) {
          setDropdownDesplegado(true);
        }
        else {
          if (paqueteSeleccionado) {
            añadirElemento(idParaUsar, 1);
          }
          else {
            añadirElemento(productosSueltos[referencia].id, 1);
          }
        }
      }
      else {
        setMostrarLogin(true);
      }
    }
    else {
      setMostrarLogin(true);
    }
  }

  const restarContador = () => {
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        if (referencia && !cantidadSeleccionada) {
          setDropdownDesplegado(true);
        }
        else {
          if (cant > 0) {
            if (paqueteSeleccionado) {
              restarElemento(idParaUsar);
            }
            else {
              restarElemento(productosSueltos[referencia].idParaUsar);
            }
          }
        }
      }
      else {
        setMostrarLogin(true);
      }
    }
    else {
      setMostrarLogin(true);
    }
  }

  const toggleFavorito = (id, e) => {
    e.stopPropagation();
    if (state.logueado) {
      favoritos.toggleFavorito(id);
    }
    else {
      setMostrarLogin(true);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  }

  const posicionEnDestacados = productosDestacados.findIndex(destacado => destacado === idParaUsar);

  const destacarProducto = (idProducto) => {
    if (productosDestacados.includes(idProducto)) {
      setProductosDestacados(productosDestacados.filter(producto => producto != idProducto));
    }
    else {
      setProductosDestacados([...productosDestacados, idProducto]);
    }
  }

  const cambiarPosicionDestacado = (cambio) => {
    const arrayAux = [...productosDestacados];

    if (productosDestacados.includes(idParaUsar)) {
      if (cambio === 1) {
        if (posicionEnDestacados != productosDestacados.length - 1) {
          const aux = arrayAux[posicionEnDestacados + 1];
          arrayAux[posicionEnDestacados + 1] = arrayAux[posicionEnDestacados];
          arrayAux[posicionEnDestacados] = aux;
          setProductosDestacados(arrayAux);
        }
        else {
          const aux = arrayAux[0];
          arrayAux[0] = arrayAux[arrayAux.length - 1];
          arrayAux[arrayAux.length - 1] = aux;
          setProductosDestacados(arrayAux);
        }
      }
      else {
        if (posicionEnDestacados != 0) {
          const aux = arrayAux[posicionEnDestacados - 1];
          arrayAux[posicionEnDestacados - 1] = arrayAux[posicionEnDestacados];
          arrayAux[posicionEnDestacados] = aux;
          setProductosDestacados(arrayAux);
        }
        else {
          const aux = arrayAux[0];
          arrayAux[0] = arrayAux[arrayAux.length - 1];
          arrayAux[arrayAux.length - 1] = aux;
          setProductosDestacados(arrayAux);
        }
      }
    }
  };

  const precioPerfil = precioParaUsar * kg + (proceso ? proceso.precio * kg : 0) + (acabado ? acabado.precio * kg : 0);
  const precioChapa = precioParaUsar + (proceso ? proceso.precio * extraerMetrosCuadrados(detalle) : 0) + (acabado ? acabado.precio * extraerMetrosCuadrados(detalle) : 0);

  const precioParaMostrarInt = parseInt(
    rubro != 85 ?
      (kg > 0 ?
        (precioPerfil)
        :
        precioParaUsar
      )
      :
      (precioChapa)
  )

  const precioParaMostrarString = precioParaMostrarInt ? precioParaMostrarInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
  const precioParaMostrarStringDescuento = precioParaMostrarInt ? (parseInt(precioParaMostrarInt * 97 / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

  let acabadoArreglado;

  if (args.acabado) {
    acabadoArreglado = acabado.detalle;

    if (acabadoArreglado.slice(-2) == 'M2') {
      acabadoArreglado = acabadoArreglado.slice(0, -3);
    }
  }

  return (
    <div className={`contenedorPrincipalCardProducto ${precio == 0 && 'sinPrecio'}`} >
      <div className="informacionContainer">
        <div className="decoracionCardProducto">
          <img className="logoDecoracionCardProducto" src={logoBlanco} alt="" />
        </div>
        {(tipo_prod != 'MAQUINAS' && !proceso) &&
          <button className="botonAñadirFavoritos" onClick={(e) => toggleFavorito(idParaFavoritos, e)} aria-label='añadirAFavoritos'>
            {favoritos.esFavorito(idParaFavoritos) ?
              (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg>)
              :
              (<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fillRule="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>)
            }
          </button>
        }
        {(referencia !== '' &&  precio != 0) &&
          <div className="dropdownCantidad">
            <button className={`toggleDropdown ${dropdownDesplegado && 'desplegado'}`} type="button" onClick={toggleDropdown}>
              {`CANTIDAD: `}
              <p className="espacioCantidad">{cantidadSeleccionada ? (paqueteSeleccionado ? ('PAQUETE') : ('UNIDAD')) : ('')}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill flechaDropdownCantidades" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
            <ul className={`dropdownMenuCantidad ${dropdownDesplegado && 'desplegado'}`}>
              <li className={`dropdown-item ${cantidadSeleccionada == productosSueltos[referencia].cantidad && 'selected'}`} onClick={() => { seleccionarCantidad(productosSueltos[referencia].cantidad); setPaqueteSeleccionado(false) }}>{`UNIDAD (${productosSueltos[referencia].cantidad}u.)`}</li>
              <li className={`dropdown-item ${cantidadSeleccionada == cantidad && 'selected'}`} onClick={() => { seleccionarCantidad(cantidad); setPaqueteSeleccionado(true) }}>{`PAQUETE (${cantidad}u.)`}</li>
            </ul>
          </div>
        }
        {state.userInfo &&
          ((state.userInfo.tipo_usuario == 'admin') &&
            <>
              <button className="eliminarElemento" onClick={() => eliminarProducto(id)} aria-label='eliminarElemento'>
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </button>
              <div className="destacadosContenedor">
                <button className="flechasDestacados" onClick={() => cambiarPosicionDestacado(1)} aria-label='subirPosicionDestacados'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                <button className={`estrellaDestacados ${productosDestacados.includes(idParaUsar) && 'checked'}`} onClick={() => destacarProducto(idParaUsar)} aria-label='destacarProducto'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>
                </button>
                <button className="flechasDestacados" onClick={() => cambiarPosicionDestacado(-1)} aria-label='bajarPosicionDestacados'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                <p className="posicionEnDestacados">{posicionEnDestacados > -1 && posicionEnDestacados + 1}</p>
              </div>
            </>
          )
        }
        <div className="imagenContainerCardProducto">
          <img
            onClick={args.onClick}
            onContextMenu={handleContextMenu}
            className="imagenProducto"
            src={marcasUnicasPerfiles.find(marcaPerfil => marca == marcaPerfil) ?
              (`/ImagenesPerfiles/${codigo.slice(2).trim()}.webp`)
              :
              (rubro == 10 ?
                (`/ImagenesMosquiteros/${codigo.trim().toUpperCase()}.webp`)
                :
                (rubro == 85 ?
                  (`/ImagenesChapas/${codigo.trim().toUpperCase()}.webp`)
                  :
                  (rubro == 4 ?
                    (`/ImagenesPoliestirenos/${codigo.trim().toUpperCase()}.webp`)
                    :
                    (rubro == 43 ?
                      (`/ImagenesPaneles/${codigo.trim().toUpperCase()}.webp`)
                      :
                      (rubro == 31 ?
                        (`/ImagenesPolicarbonatos/${codigo.trim().toUpperCase()}.webp`)
                        :
                        (tipo_prod == 'ACCESORIO' && rubro == 39 ?
                          (`/ImagenesHerramientas/${codigo.trim().toUpperCase()}.webp`)
                          :
                          (rubro == 12 ?
                            (`/ImagenesAutomatismos/${codigo.trim().toUpperCase()}.webp`)
                            :
                            (rubro == 39 ?
                              (`/ImagenesMaquinas/${codigo.trim().toUpperCase()}.webp`)
                              :
                              (tipo_prod == 'ACCESORIO' ?
                              (`/ImagenesAccesorios/${codigo.trim().toUpperCase()}.webp`) 
                              : 
                              ('')
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            }
            alt="Imagen del producto"
            loading="lazy"
          />
        </div>
        <div className="detalleYCod_orig">
          {referencia ?
            (<h3><span className="codOrig">{codigo}</span> - {`${detalle}`} <span className="codOrig">{`${cantidadSeleccionada ? ('(' + cantidadSeleccionada + 'u.)') : ('')}`}</span></h3>)
            :
            (<h3><span className="codOrig">{codigo}</span> - {`${detalle} ${args.acabado ? (' - ' + (acabadoArreglado)) : (``)}`} <span className="codOrig">{`${cantidad > 1 ? ('(' + cantidad + 'u.)') : ('')}`}</span></h3>)
          }
        </div>
        <div className="kgCantidadYColorContainer">
          <div className="kgProducto">
            {kg > 0 && (
              <>
                <p>PESO PROMEDIO</p>
                <p><span className="pesoYColorTextoCardProducto">{kg}kg</span></p>
              </>
            )}
          </div>
          {precio == 0 ?
            (<a
              className="botonConsultarProducto"
              target="blank"
              href={isMobile ?
                (`https://wa.me/5493456475294?text=Consulta%20sobre%20${codigo}%20-%20${detalle}:%20`)
                :
                (`https://web.whatsapp.com/send?phone=+5493456475294&text=Consulta%20sobre%20${codigo}%20-%20${detalle}:%20`)
              }
            >
              CONSULTAR
            </a>)
            :
            (
              <div className="conjuntoCantidadCardProducto">
                <button className="boton" onClick={restarContador}>-</button>
                <span className="cantidadProducto">
                  {referencia ?
                    (cantidadSeleccionada ? (cant) : ('-'))
                    :
                    (cant)}
                </span>
                <button className="boton" onClick={sumarContador}>+</button>
              </div>
            )}
          <div className="colorCardProducto">
            {color != "Ind" &&
              <>
                <p>{`${(proceso && proceso.detalle.startsWith('ANODIZADO')) ? ('ANODIZADO') : ('COLOR')}`}</p>
                <div className="muestraColorCardProducto" style={{ backgroundColor: `var(--${colorCorregido})` }} >
                  <p className="pesoYColorTextoCardProducto" style={usarBlanco ? { color: 'white' } : {}}>
                    {args.proceso ? proceso.color.toUpperCase() : color.toUpperCase()}
                  </p>
                </div>
              </>
            }

          </div>
        </div>
      </div >
      {precio != 0 &&
        <>
          <div className="precioContainerCardProducto primerContainer">
            <p className="precioCardProducto">
              {tipo_prod == 'PERFIL' ? (
                `PRECIO${referencia ?
                  ' UNITARIO' : ''
                } 
              ${!mayorista ?
                  ' MINORISTA ' : ''
                } 
              APROXIMADO: $`
              ) : (
                `PRECIO${!mayorista ? ' MINORISTA' : ''}: $`
              )}
              {precioParaMostrarString}
            </p>
          </div>
          {(state.userInfo && state.userInfo.categoria == 'MAYORISTA') &&
            <div className="precioContainerCardProducto segundoContainer">
              <p className="precioCardProducto">
                {`CON DESCUENTO POR PAGO AL CONTADO: $${precioParaMostrarStringDescuento}`}
              </p>
            </div>}
        </>
      }
    </div >
  );
}