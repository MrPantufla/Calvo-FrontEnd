import { createContext, useContext, useState, useEffect } from 'react';

const EditarContraseñaContext = createContext();

function useEditarContraseña() {
  return useContext(EditarContraseñaContext);
}

const EditarContraseñaProvider = ({ children }) => {

  const [editarContraseñaAbierto, setEditarContraseñaAbierto] = useState (false);

  const abrirEditarContraseña = async (token) => {
    setEditarContraseñaAbierto(true);
    console.log("abrirEditarContraseña")
  };

  const cerrarEditarContraseña = async (token) => {
    setEditarContraseñaAbierto(false);
    console.log("cerrarEditarContraseña")
  };

  return (
    <EditarContraseñaContext.Provider value={{ editarContraseñaAbierto, setEditarContraseñaAbierto, abrirEditarContraseña, cerrarEditarContraseña }}>
      {children}
    </EditarContraseñaContext.Provider>
  );
};

export { EditarContraseñaContext, useEditarContraseña, EditarContraseñaProvider };