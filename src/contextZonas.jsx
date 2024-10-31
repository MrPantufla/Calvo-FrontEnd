import { createContext, useContext } from 'react';
import { useState } from 'react';

const ZonasContext = createContext();

function useZonas() {
    return useContext(ZonasContext);
}

function ZonasProvider({ children }) {

    const [ciudades, setCiudades] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [zonas, setZonas] = useState([]);

    return (
        <ZonasContext.Provider value={{
            ciudades,
            setCiudades,
            provincias,
            setProvincias,
            zonas,
            setZonas
        }}>
            {children}
        </ZonasContext.Provider>
    );
}

export { ZonasContext, useZonas, ZonasProvider };