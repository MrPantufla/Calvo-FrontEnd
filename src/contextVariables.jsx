import { createContext, useContext } from 'react';

const VariablesContext = createContext();

function useVariables() {
    return useContext(VariablesContext);
}

function VariablesProvider({ children }) {
    //const backend = "http://localhost:8080";
    const backend = "https://backend-calvo-415917.rj.r.appspot.com";

    return (
        <VariablesContext.Provider value={{
            backend
        }}>
            {children}
        </VariablesContext.Provider>
    );
}

export { VariablesContext, useVariables, VariablesProvider };