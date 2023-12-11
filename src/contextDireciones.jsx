import { createContext, useContext, useState } from 'react';

const DireccionesContext = createContext();

function useDirecciones() {
  return useContext(DireccionesContext);
}

const DireccionesProvider = ({ children }) => {

  const [direccionesAbierto, setDireccionesAbierto] = useState (false);
  const [errorMessage, setErrorMessage] = useState('');

  const abrirDirecciones = async (token) => {
    setDireccionesAbierto(true);
    console.log("abrirDirecciones")
  };

  const cerrarDirecciones = async (token) => {
    setDireccionesAbierto(false);
    console.log("cerrarDirecciones")
  };

  return (
    <DireccionesContext.Provider value={{ direccionesAbierto, setDireccionesAbierto, abrirDirecciones, cerrarDirecciones, errorMessage, setErrorMessage }}>
      {children}
    </DireccionesContext.Provider>
  );
};

export { DireccionesContext, useDirecciones, DireccionesProvider };