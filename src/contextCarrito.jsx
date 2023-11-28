import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const [elementos, setElementos] = useState([]);
  
  function añadirElemento(id, cod_orig, detalle, cantidad, precio) {
    const elementoExistente = elementos.find((elemento) => elemento.cod_orig === cod_orig);

    if (elementoExistente) {
      elementoExistente.cantidad += cantidad;
      setElementos([...elementos]);
    } else {
      const nuevoElemento = {id, cod_orig, detalle, cantidad, precio };
      setElementos([...elementos, nuevoElemento]);
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
    <CarritoContext.Provider value={{ elementos, limpiarCarrito, añadirElemento, restarElemento, actualizarCantidadElemento, eliminarElemento }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };