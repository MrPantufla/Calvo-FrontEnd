import { createContext, useContext, useState, useEffect } from 'react';

const EditarDatosContext = createContext();

function useEditarDatos() {
    return useContext(EditarDatosContext);
}

const EditarDatosProvider = ({ children }) => {

  const [editarDatosAbierto, setEditarDatosAbierto] = useState (false);

  const abrirEditarDatos = async (token) => {
    setEditarDatosAbierto(true);
    console.log("abrir")
  };

  const cerrarEditarDatos = async (token) => {
    setEditarDatosAbierto(false);
    console.log("cerrar")
  };

  return (
    <EditarDatosContext.Provider value={{ editarDatosAbierto, setEditarDatosAbierto, abrirEditarDatos, cerrarEditarDatos }}>
      {children}
    </EditarDatosContext.Provider>
  );
};

export { EditarDatosContext, useEditarDatos, EditarDatosProvider };