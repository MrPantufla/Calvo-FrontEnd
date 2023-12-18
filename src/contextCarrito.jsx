import { createContext, useContext, useState } from 'react';
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
  
  function añadirElemento(id, cantidad) {
    setElementos(prevElementos => {
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
    });
  }

  function toggleCarrito(){
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

  function eliminarElemento(id){
    const elementoExistente = elementos.find((elemento) => elemento.id === id);
    while(elementoExistente.cantidad!==1){
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

  function limpiarCarrito(){
    setElementos([]);
  }

  return (
    <CarritoContext.Provider value={{ toggleCarrito, setCarritoAbierto, carritoAbierto, elementos, limpiarCarrito, añadirElemento, restarElemento, actualizarCantidadElemento, eliminarElemento }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };