import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProductos } from './contextProductos';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';
import { useDireccion } from './contextDireccion';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const {productosIndexado} = useProductos();

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

  const { backend } = useVariables();

  const [elementos, setElementos] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carritoConfirmado, setCarritoConfirmado] = useState(false);
  const [confirmarCompraAbierto, setConfirmarCompraAbierto] = useState(false);
  const [mostrarCartelError, setMostrarCartelError] = useState(false);
  const [primeraAccion, setPrimeraAccion] = useState(true);
  const [compraRealizadaAbierto, setCompraRealizadaAbierto] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(null);
  const [datosCorroborados, setDatosCorroborados] = useState(false);
  const [instanciaPedido, setInstanciaPedido] = useState('');

  function añadirElemento(id, cantidad) {
    if(!state.userInfo.cliente && productosIndexado[id].tipo_prod=='PERFIL'){
      mostrarCartel();
    }
    else{
      if (Object.keys(productosIndexado).length !== 0) {
        setElementos(prevElementos => {
          if (productosIndexado) {
            const producto = productosIndexado[id];
            const cod_origProducto = producto.cod_orig;
            const detalleProducto = producto.detalle;
            const precioProducto = producto.precio;
            const kg = producto.kg;
            const elementoExistente = prevElementos.find((elemento) => elemento.id === id);
  
            if (elementoExistente) {
              elementoExistente.cantidad += cantidad;
              // Si ya existe, solo actualiza la cantidad y deja que el useEffect maneje la actualización del carrito
              return [...prevElementos];
            } else {
              // Si es un nuevo elemento, agrega y deja que el useEffect maneje la actualización del carrito
              return [...prevElementos, { id, cod_origProducto, cantidad, detalleProducto, precioProducto, kg }];
            }
          }
        });
      }
    }
  }

  const mostrarCartel = () => {
    setMostrarCartelError(true);
  }

  const ocultarCartel = () => {
    setMostrarCartelError(false);
  }

  function restarElemento(id) {
    const elementoExistente = elementos.find((elemento) => elemento.id === id);

    if (elementoExistente.cantidad > 1) {
      elementoExistente.cantidad -= 1;
      setElementos([...elementos]);
    } else {
      eliminarElemento(id);
    }
  }

  function eliminarElemento(id) {
    setElementos((prevElementos) => prevElementos.filter((elemento) => elemento.id !== id));
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

  function actualizarCantidadElemento(id, nuevaCantidad) {
    const elementoExistente = elementos.find((elemento) => elemento.id === id);
    if (elementoExistente) {
      elementoExistente.cantidad = nuevaCantidad;
      setElementos([...elementos]);
    }
  }

  function limpiarCarrito() {
    setElementos([]);
  }

  const actualizarCarrito = () => {
    const listaCarrito = [...elementos];
    const productos = listaCarrito.map(item => item.id).join(' ');
    const cantidades = listaCarrito.map(item => item.cantidad).join(' ');
    const ActualizacionCarrito = {
      productos: productos,
      cantidades: cantidades
    }

    fetch(`${backend}/api/actualizarCarrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(ActualizacionCarrito),
    })
      .then(response => {
        if (response.ok) {
          // Procesar la respuesta exitosa
          console.log('Envío de carrito exitoso');
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
    if(!primeraAccion){
      actualizarCarrito();
    }
    else{
      setPrimeraAccion(false);
    }
  }, [elementos]);

  const confirmarCompra = () => {
    const nuevosElementos = elementos.map(({ id, cantidad, precioProducto }) => ({ id, cantidad, precioProducto }));
    const direccion = {calle: calle, numero: numero, cp: cp, localidad: localidad, provincia: provincia};
    const carritoRequest = {carritoJson: JSON.stringify(nuevosElementos), direccion: direccion}

    fetch(`${backend}/api/recibirCarrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carritoRequest),
      credentials: 'include',
    })
      .then(response => response.text())
      .then(data => {
        console.log('Respuesta: ', data)
      })
      .catch(error => {
        console.log("Ocurrió un error al enviar los datos: ", error)
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
      actualizarCantidadElemento,
      instanciaPedido,
      setInstanciaPedido,
      eliminarElemento }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };
