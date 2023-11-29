import { createContext, useContext, useState } from 'react';

const DesplegableContext = createContext();

function useDesplegable() {
  return useContext(DesplegableContext);
}

function DesplegableProvider({children}){
    const [hovered, setHovered] = useState(false);

    const abrirHover = () =>{
        setHovered(true);
    }

    const cerrarHover = () =>{
        setHovered(false);
    }

    return (
        <DesplegableContext.Provider value={{ hovered, abrirHover, cerrarHover }}>
          {children}
        </DesplegableContext.Provider>
      );
}

export { DesplegableContext, useDesplegable, DesplegableProvider };