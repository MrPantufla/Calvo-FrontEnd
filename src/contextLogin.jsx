import { createContext, useContext, useState, useEffect, useReducer } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion] = useState(false);
  const [mostrarCartelLogout, setMostrarCartelLogout] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [state, setState] = useState({
    logueado: false,
    userInfo: {},
  });

  const login = (userData) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem('userData', JSON.stringify(userData));
        setState({
          logueado: true,
          userInfo: userData,
        });
        resolve(userData); // Puedes pasar datos adicionales si es necesario
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = async () => {
    localStorage.removeItem('userData');
    setState({
      logueado: false,
      userInfo: null,
    });
  };

  const updateEmailConfirmationStatus = () => {
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

  useEffect(() => {
    if (state.logueado) {
      console.log(state.userInfo)
      if (state.userInfo.email_confirmado) {
        setMostrarLogin(false);
      }
    }
  }, [state]);

  /*useEffect(() => {
    if(state.logueado){
      const favoritosString = state.userInfo.favoritos;
      const numerosComoArray = favoritosString.split(' ').map(Number);
      //favoritos.setFavoritos(numerosComoArray);
      //console.log(favoritos.favoritos)
    }
  }, [state.logueado])*/

  return (
    <AuthContext.Provider value={{ state, errorMessage, setErrorMessage, login, logout, updateEmailConfirmationStatus, verifyToken, mostrarLogin, setMostrarLogin, mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion, mostrarCartelLogout, setMostrarCartelLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};