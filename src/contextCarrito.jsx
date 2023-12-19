import { createContext, useContext, useEffect, useState } from 'react';
import { useProductos } from './contextProductos';
import { useAuth } from './contextLogin';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const productos = useProductos();
  const [elementos, setElementos] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const auth = useAuth();
  const [primeraAccion, setPrimeraAccion] = useState(true);
  const [band, setBand] = useState(true);

  function añadirElemento(id, cantidad) {
    if (Object.keys(productos.productosIndexado).length !== 0) {
      setElementos(prevElementos => {
        if (productos.productosIndexado) {
          const producto = productos.productosIndexado[id];
          const cod_origProducto = producto.cod_orig;
          const detalleProducto = producto.detalle;
          const precioProducto = producto.precio;
          const elementoExistente = prevElementos.find((elemento) => elemento.id === id);

          if (elementoExistente) {
            elementoExistente.cantidad += cantidad;
            return [...prevElementos];
          } else {
            const nuevoElemento = { id, cod_origProducto, cantidad, detalleProducto, precioProducto };
            return [...prevElementos, nuevoElemento];
          }
        }
      });
    }
  }

  useEffect(() => {
    if (!primeraAccion) {
      actualizarCarrito();
    }
    else {
      setPrimeraAccion(false);
    }
  }, [elementos]);

  function toggleCarrito() {
    if (auth.state.logueado) {
      if (auth.state.userInfo.email_confirmado) {
        setCarritoAbierto(!carritoAbierto);
      }
      else {
        auth.setMostrarLogin(true);
      }
    }
    else {
      auth.setMostrarLogin(true);
    }
  }

  function restarElemento(id) {
    const elementoExistente = elementos.find((elemento) => elemento.id === id);

    if (elementoExistente.cantidad > 1) {
      elementoExistente.cantidad -= 1;
      setElementos([...elementos]);
    } else {
      setElementos((prevElementos) => prevElementos.filter((elemento) => elemento.id !== id));
    }
  }

  function eliminarElemento(id) {
    const elementoExistente = elementos.find((elemento) => elemento.id === id);
    while (elementoExistente.cantidad !== 1) {
      restarElemento(id);
    }
    restarElemento(id);
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
    if (band == true) {
      const listaCarrito = [...elementos];
      const productos = listaCarrito.map(item => item.id).join(' ');
      const cantidades = listaCarrito.map(item => item.cantidad).join(' ');
      const ActualizacionCarrito = {
        productos: productos,
        cantidades: cantidades
      }

      fetch('http://localhost:8080/api/actualizarCarrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.state.userInfo.token
        },
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
  }

  useEffect(() => {
    setBand(false);

    if (auth.state.logueado && auth.state.userInfo.cantidades_carrito) {
      const productosArray = auth.state.userInfo.productos_carrito.split(' ').map(Number);
      const cantidadesArray = auth.state.userInfo.cantidades_carrito.split(' ').map(Number);

      for (let i = 0; i < productosArray.length; i++) {
        añadirElemento(productosArray[i], cantidadesArray[i])
      }

      
    }
    setBand(true);
  }, [auth.state.logueado, productos.productosIndexado]);

  return (
    <CarritoContext.Provider value={{ toggleCarrito, setCarritoAbierto, carritoAbierto, elementos, limpiarCarrito, añadirElemento, restarElemento, actualizarCantidadElemento, eliminarElemento }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };