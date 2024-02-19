import { createContext, useContext, useState } from 'react';

const VariablesContext = createContext();

function useVariables() {
    return useContext(VariablesContext);
}

function VariablesProvider({ children }) {
    //const backend = "http://localhost:8080";
    const backend = "https://guarded-savannah-38698-379ed5e80a12.herokuapp.com";

    return (
        <VariablesContext.Provider value={{
            backend
        }}>
            {children}
        </VariablesContext.Provider>
    );
}

export { VariablesContext, useVariables, VariablesProvider };