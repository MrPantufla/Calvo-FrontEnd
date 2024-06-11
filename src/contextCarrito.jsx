import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProductos } from './contextProductos';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';
import { useDireccion } from './contextDireccion';
import Cookies from 'js-cookie';
import { marcasUnicasPerfiles } from './rubros';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const { productosIndexado } = useProductos();

  const {
    state,
    setMostrarLogin
  } = useAuth();

  const {
    calle,
    numero,
    cp,
    localidad,
    provincia
  } = useDireccion();

  const { productosSueltos } = useProductos();

  const { backend } = useVariables();

  const [elementos, setElementos] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carritoConfirmado, setCarritoConfirmado] = useState(false);
  const [confirmarCompraAbierto, setConfirmarCompraAbierto] = useState(false);
  const [mostrarCartelError, setMostrarCartelError] = useState(false);
  const [primeraAccion, setPrimeraAccion] = useState(true);
  const [compraRealizadaAbierto, setCompraRealizadaAbierto] = useState(false);
  const [errorProductoEliminado, setErrorProductoEliminado] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(null);
  const [datosCorroborados, setDatosCorroborados] = useState(false);
  const [instanciaPedido, setInstanciaPedido] = useState('');
  const [paqueteAñadir, setPaqueteAñadir] = useState(null);
  const [elementoEliminar, setElementoEliminar] = useState(null);
  const [respuestaRecibida, setRespuestaRecibida] = useState(true);

  const extraerAntesDeParentesis = (cadena) => {
    const match = cadena.match(/^([^()]*)\(/);
    if (match) {
        return parseInt(match[1]);
    }
    return parseInt(cadena);
  }

  function añadirElemento(id, cantidadCarrito) {
    setPaqueteAñadir(null);
    if (!state.userInfo.cliente && marcasUnicasPerfiles.find(marcaPerfil => marcaPerfil == productosIndexado[id].marca)) {
      mostrarCartel();
    }
    else {
      if (Object.keys(productosIndexado).length !== 0) {
        setElementos(prevElementos => {
          if (productosIndexado && productosSueltos) {
            let producto;
            
            const idSinProceso = extraerAntesDeParentesis(id.toString());

            producto = productosIndexado[idSinProceso];

            if (!producto) {
              producto = productosSueltos[idSinProceso];
            }
            //LA LINEA DE ABAJO ES NUEVA, HAY QUE VER COMO AGREGAR EL PRODUCTO CON EL ID CON PROCESO AL CARRITO
            const idProducto = id;
            const cod_origProducto = producto.cod_orig;
            const detalleProducto = producto.detalle;
            const precioProducto = producto.precio;
            const kg = producto.kg;
            const referenciaPaquete = producto.referenciaPaquete;
            const cantidad = producto.cantidad;

            let cantidadPaquete = -1;
            if (referenciaPaquete) {
              cantidadPaquete = referenciaPaquete.cantidad;
            }

            const elementoExistente = prevElementos.find((elemento) => elemento.id === id);
            if (elementoExistente) {
              elementoExistente.cantidadCarrito += cantidadCarrito;

              if (referenciaPaquete) {
                if (cantidadPaquete != -1) {
                  if (elementoExistente.cantidadCarrito * elementoExistente.cantidad >= cantidadPaquete) {
                    const paquetesResultantes = Math.floor(elementoExistente.cantidadCarrito * elementoExistente.cantidad / cantidadPaquete);

                    if(elementoExistente.cantidadCarrito * elementoExistente.cantidad == cantidadPaquete * paquetesResultantes){
                      setElementoEliminar(elementoExistente.id);
                    }

                    for (let i = 0; i < cantidadPaquete * paquetesResultantes; i++) {
                      restarElemento(elementoExistente.id);
                    }
                    const idPaquete = referenciaPaquete.id;

                    setPaqueteAñadir({ id: idPaquete, cant: paquetesResultantes });
                  }
                }
              }
              // Si ya existe, solo actualiza la cantidad y deja que el useEffect maneje la actualización del carrito
              return [...prevElementos];
            } else {
              if (referenciaPaquete) {
                if (cantidadPaquete != -1) {
                  if (cantidadCarrito >= cantidadPaquete) {
                    const paquetesResultantes = Math.floor( cantidadCarrito * producto.cantidad / cantidadPaquete );

                    for (let i = 0; i < cantidadPaquete * paquetesResultantes; i++) {
                      cantidadCarrito --;
                    }
                    
                    const idPaquete = referenciaPaquete.id;
                    
                    setPaqueteAñadir({id: idPaquete, cant: paquetesResultantes});

                    if(cantidadCarrito == 0){
                      return prevElementos;
                    }
                  }
                }
              }
              // Si es un nuevo elemento, agrega y deja que el useEffect maneje la actualización del carrito
              return [...prevElementos, { id, cod_origProducto, cantidadCarrito, detalleProducto, precioProducto, kg, cantidad }];
            }
          }
        });
      }
    }
  }

  useEffect(() => {
    if (paqueteAñadir) {
      añadirElemento(paqueteAñadir.id, paqueteAñadir.cant)
      setCarritoAbierto(true);
    }

    if(elementoEliminar){
      eliminarElemento(elementoEliminar);
      setElementoEliminar(null);
    }
  }, [añadirElemento])

  const mostrarCartel = () => {
    setMostrarCartelError(true);
  }

  const ocultarCartel = () => {
    setMostrarCartelError(false);
  }

  function restarElemento(id) {
    const elementoExistente = elementos.find((elemento) => elemento.id === id);
    if (elementoExistente.cantidadCarrito > 1) {
      elementoExistente.cantidadCarrito -= 1;
      setElementos([...elementos]);
    } else {
      setElementoEliminar(id);
      eliminarElemento(id);
    }
  }

  function eliminarElemento(id) {
      setElementos((prevElementos) => {
      return prevElementos.filter((elemento) => elemento.id !== id);
    });
  }

  function toggleCarrito() {
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        setCarritoAbierto(!carritoAbierto);
      } else {
        setMostrarLogin(true);
      }
    } else {
      setMostrarLogin(true);
    }
  }

  function limpiarCarrito() {
    setElementos([]);
  }

  const actualizarCarrito = () => {
    const listaCarrito = [...elementos];
    const productos = listaCarrito.map(item => item.id).join(' ');
    const cantidades = listaCarrito.map(item => item.cantidadCarrito).join(' ');
    const ActualizacionCarrito = {
      productos: productos,
      cantidades: cantidades
    }

    let tokenParaEnviar = Cookies.get('jwtToken');

    if (tokenParaEnviar == undefined) {
      tokenParaEnviar = null;
    }

    fetch(`${backend}/api/actualizarCarrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenParaEnviar,
      },
      body: JSON.stringify(ActualizacionCarrito),
    })
      .then(response => {
        if (response.ok) {
          // Procesar la respuesta exitosa
        } else {
          // Procesar la respuesta de error
          console.error('Error en el envío de carrito:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error al enviar la lista del carrito al servidor:', error);
      });
  }

  useEffect(() => {
    if (!primeraAccion) {
      actualizarCarrito();
    }
    else {
      setPrimeraAccion(false);
    }
  }, [elementos]);

  const confirmarCompra = () => {
    setRespuestaRecibida(false);
    setCompraRealizadaAbierto(true);

    const nuevosElementos = elementos.map(({ id, cantidadCarrito, precioProducto }) => ({ id, cantidadCarrito, precioProducto }));
    const direccion = { calle: calle, numero: numero, cp: cp, localidad: localidad, provincia: provincia };
    const carritoRequest = { carritoJson: JSON.stringify(nuevosElementos), direccion: direccion }

    let tokenParaEnviar = Cookies.get('jwtToken');

    if (tokenParaEnviar == undefined) {
      tokenParaEnviar = null;
    }

    fetch(`${backend}/api/recibirCarrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenParaEnviar,
      },
      body: JSON.stringify(carritoRequest),
    })
      .then(response => {
        setRespuestaRecibida(true);
        if (response.status == 500) {
          setErrorProductoEliminado(true);
        }
      })
  }

  useEffect(() => {
    if (state.logueado && state.userInfo.cantidades_carrito) {
      const productosArray = state.userInfo.productos_carrito.split(' ').map(Number);
      const cantidadesArray = state.userInfo.cantidades_carrito.split(' ').map(Number);

      for (let i = 0; i < productosArray.length; i++) {
        añadirElemento(productosArray[i], cantidadesArray[i])
      }
    }
  }, [productosIndexado]);

  return (
    <CarritoContext.Provider value={{
      datosCorroborados,
      setDatosCorroborados,
      precioTotal,
      setPrecioTotal,
      compraRealizadaAbierto,
      setCompraRealizadaAbierto,
      mostrarCartel,
      ocultarCartel,
      mostrarCartelError,
      actualizarCarrito,
      confirmarCompraAbierto,
      setConfirmarCompraAbierto,
      carritoConfirmado,
      setCarritoConfirmado,
      confirmarCompra,
      toggleCarrito,
      setCarritoAbierto,
      carritoAbierto,
      elementos,
      limpiarCarrito,
      añadirElemento,
      restarElemento,
      instanciaPedido,
      setInstanciaPedido,
      eliminarElemento,
      errorProductoEliminado,
      setErrorProductoEliminado,
      respuestaRecibida
    }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };
