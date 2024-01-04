import { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useProductos } from './contextProductos';
const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('login');
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion] = useState(false);
  const [mostrarCartelLogout, setMostrarCartelLogout] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /*const [state, setState] = useState({
    logueado: true,
    userInfo: {
      apellido: "prueba", 
      cuit: "12364856",
      email: "usuarioPrueba@gmail.com",
      email_confirmado: true,
      favoritos: "2",
      id: 1,
      nombre: "usuario",
      telefono: 34564140162},
  });*/ //Descomentar para version de muestra

  const [state, setState] = useState({
    logueado: false,
    userInfo: {}
  }) //Comentar para version de muestra

  const login = (userData) => {
    return new Promise((resolve, reject) => {
      try {
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

  const borrarCookie = async () => {
    fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
  }

  const logout = async () => {
    await borrarCookie();

    setTimeout(() => {
      setState({
        logueado: false,
        userInfo: null,
      });
      setMostrarCartelLogout(true);
    }, 200); // Ajusta el valor del timeout según sea necesario
  };

  const updateEmailConfirmationStatus = () => {
    setState(prevState => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        email_confirmado: true,
      },
    }));
  };

  const verifyToken = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/verificarToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        // En este punto, sabemos que el token es válido porque la respuesta fue exitosa (código 200)
        return true;
      } else {
        console.error('Error al verificar el token en el backend');
        return false;
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      return false;
    }
  };

  useEffect(() => {
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        setMostrarLogin(false);
      }
    }
  }, [state]);

  const handleLogin = async (args) => {
    try {
      if (!login) {
        console.error('login no está definido');
        return;
      }

      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: args.email, contrasenia: args.password }),
      });

      console.log(args.email)
      console.log(args.password)

      if (response.ok) {
        const userData = await response.json();
        login(userData)
        renovarToken({ email: userData.email })

      } else {
        const data = await response.text();
        if (response.status === 401) {
          if (data.toLowerCase().includes('email')) {
            setErrorMessage("Email incorrecto");
          } else if (data.toLowerCase().includes('contraseña')) {
            setErrorMessage("Contraseña incorrecta");
          } else {
            setErrorMessage("");
          }
        } else if (response.status === 500) {
          setErrorMessage("Error interno del servidor");
        } else {
          // Otros códigos de estado
          setErrorMessage("Error al intentar iniciar sesión");
        }
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  };

  const renovarToken = async (args) => {
    console.log("ENTRA EN RENOVARTOKEN")
    const response = await fetch('http://localhost:8080/api/renovarTokenAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(args.email),
    });

    if (response.ok) {
      const data = response.text();

    } else {
      const data = response.text();
      setErrorMessage("Email y/o contraseña inválidos");
    }
  }

  useEffect(() => {
    const renewTokenInterval = setInterval(() => {
      console.log("TOKEN RENOVADO AUTOMATICAMENTE")
      console.log("LOGUEADO?: " + state.logueado)
      if (state.logueado) {
        console.log("LOGUEADO?: " + state.logueado)
        console.log(state.userInfo)
        renovarToken({ email: state.userInfo.email });
      }
    }, 29 * 60 * 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(renewTokenInterval);
  }, [state.logueado]);

  return (
    <AuthContext.Provider value={{ handleLogin, opcionSeleccionada, setOpcionSeleccionada, state, errorMessage, setErrorMessage, login, logout, updateEmailConfirmationStatus, verifyToken, mostrarLogin, setMostrarLogin, mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion, mostrarCartelLogout, setMostrarCartelLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};