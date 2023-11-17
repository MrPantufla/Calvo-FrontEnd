import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({
    logueado: false,
    emailConfirmado: false,
  });

  const login = (userData) => {
    setUser({
        logueado: true,
        emailConfirmado: userData.emailConfirmado,
    });
  };

  const logout = () => {
    setUser({
        logueado: false,
        emailConfirmado: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};