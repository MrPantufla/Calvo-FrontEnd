import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const [elementos, setElementos] = useState([]);
  
  function añadirElemento(codigo, detalle, cantidad, precio) {
    const elementoExistente = elementos.find((elemento) => elemento.codigo === codigo);

    if (elementoExistente) {
      elementoExistente.cantidad += 1;
      setElementos([...elementos]);
    } else {
      const nuevoElemento = { codigo, detalle, cantidad, precio };
      setElementos([...elementos, nuevoElemento]);
    }
  }

  function restarElemento(codigo) {
    const elementoExistente = elementos.find((elemento) => elemento.codigo === codigo);

    if (elementoExistente.cantidad > 1) {
      elementoExistente.cantidad -= 1;
      setElementos([...elementos]);
    } else {
      setElementos((prevElementos) => prevElementos.filter((elemento) => elemento.codigo !== codigo));
    }
  }

  function eliminarElemento(codigo){
    const elementoExistente = elementos.find((elemento) => elemento.codigo === codigo);
    while(elementoExistente.cantidad!=1){
      restarElemento(codigo);
    }
    restarElemento(codigo);
  }

  function actualizarCantidadElemento(codigo, nuevaCantidad) {
    const elementoExistente = elementos.find((elemento) => elemento.codigo === codigo);

    if (elementoExistente) {
      elementoExistente.cantidad = nuevaCantidad;
      setElementos([...elementos]);
    }
  }

  return (
    <CarritoContext.Provider value={{ elementos, añadirElemento, restarElemento, actualizarCantidadElemento, eliminarElemento }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };