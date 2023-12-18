import { createContext, useContext, useState } from 'react';
import { useProductos } from './contextProductos';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const productos = useProductos();
  const [elementos, setElementos] = useState([]);
  
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
        console.log(nuevoElemento);
        return [...prevElementos, nuevoElemento];
      }
    });
  
    console.log("ID: " + id + " CANTIDAD: " + cantidad);
    console.log(elementos);
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
    <CarritoContext.Provider value={{ elementos, limpiarCarrito, añadirElemento, restarElemento, actualizarCantidadElemento, eliminarElemento }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };