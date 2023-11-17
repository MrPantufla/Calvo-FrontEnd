import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const [elementos, setElementos] = useState([]);
  
  function añadirElemento(cod_orig, detalle, cantidad, precio) {
    const elementoExistente = elementos.find((elemento) => elemento.cod_orig === cod_orig);

    if (elementoExistente) {
      elementoExistente.cantidad += cantidad;
      setElementos([...elementos]);
    } else {
      const nuevoElemento = { cod_orig, detalle, cantidad, precio };
      setElementos([...elementos, nuevoElemento]);
    }
  }

  function restarElemento(cod_orig) {
    const elementoExistente = elementos.find((elemento) => elemento.cod_orig === cod_orig);

    if (elementoExistente.cantidad > 1) {
      elementoExistente.cantidad -= 1;
      setElementos([...elementos]);
    } else {
      setElementos((prevElementos) => prevElementos.filter((elemento) => elemento.cod_orig !== cod_orig));
    }
  }

  function eliminarElemento(cod_orig){
    const elementoExistente = elementos.find((elemento) => elemento.cod_orig === cod_orig);
    while(elementoExistente.cantidad!==1){
      restarElemento(cod_orig);
    }
    restarElemento(cod_orig);
  }

  function actualizarCantidadElemento(cod_orig, nuevaCantidad) {
    const elementoExistente = elementos.find((elemento) => elemento.cod_orig === cod_orig);

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