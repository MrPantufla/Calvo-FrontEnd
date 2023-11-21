import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {

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

  return (
    <AuthContext.Provider value={{ state, login, logout, updateEmailConfirmationStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};