import { createContext, useContext, useState, useEffect, useReducer } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion] = useState(false);

  const [state, setState] = useState({
    logueado: false,
    userInfo: {},
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setState({
        logueado: false,
        userInfo: userData,
      });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setState({
      logueado: true,
      userInfo: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setState({
      logueado: false,
      userInfo: null,
    });
  };

  const updateEmailConfirmationStatus = () => {
    // Actualizar solo el campo email_confirmado en el estado a true
    setState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        email_confirmado: true,
      },
    }));
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/verificarToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: token,
      });
  
      if (response.ok) {
        // En este punto, sabemos que el token es válido porque la respuesta fue exitosa (código 200)
        return true;
      } else {
        console.error('Error al verificar el token en el backend');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateEmailConfirmationStatus, verifyToken, mostrarLogin, setMostrarLogin, mostrarError, setMostrarError, mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};