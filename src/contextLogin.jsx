import { createContext, useContext, useState, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { useProductos } from './contextProductos';
import { useVariables } from './contextVariables';
const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
  
  const {
    backend,
    obtenerToken
  } = useVariables();

  const { obtenerProductosFiltrados } = useProductos();

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('login');
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarErrorCodigoConfirmacion, setMostrarErrorCodigoConfirmacion] = useState(false);
  const [mostrarCartelLogout, setMostrarCartelLogout] = useState(false);
  const [mostrarCartelLogin, setMostrarCartelLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [cp, setCp] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [direccionConfirmada, setDireccionConfirmada] = useState(false);
  const [esperandoRespuesta, setEsperandoRepuesta] = useState(false);

  const [state, setState] = useState({
    logueado: false,
    userInfo: {}
  })

  const login = (userData) => {
    return new Promise((resolve, reject) => {
      try {
        setState({
          logueado: true,
          userInfo: userData,
        });
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  };

  const borrarCookie = async () => {
    const cookieNames = Object.keys(Cookies.get());

    cookieNames.forEach(cookieName => {
      Cookies.remove(cookieName);
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
    }, 200);
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

      const response = await fetch(`${backend}/verificarToken/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': obtenerToken(),
        },
      });

      if (response.ok) {
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

  const obtenerDescuentos = async (cuit) => {
    try {

      const response = await fetch(`${backend}/descuento/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': obtenerToken(),
        },
        body: JSON.stringify(parseInt(cuit)),
      });

      if (response.ok) {
        const descuentos = await response.json();

        const descuentosSinCero = descuentos.filter(element => element.por_a !== 0);

        const descuentosPorRubro = descuentosSinCero.reduce((result, element) => {
          result[element.rubro] = element.por_a;
          return result;
        }, {});

        return descuentosPorRubro;
      } else {
        const data = await response.text();
        if (response.status === 401) {
          setErrorMessage(data);
        } else if (response.status === 500) {
          setErrorMessage("Error interno del servidor");
        } else {
          // Otros códigos de estado
          setErrorMessage("Error al obtener descuentos");
        }
      }
    } catch (error) {
      console.error('Error al encontrar al usuario:', error);
    }
  };

  const handleLogin = async (args) => {

    setEsperandoRepuesta(true);

    try {

      let tokenParaEnviar = Cookies.get('tokenRenovacion');

      if (tokenParaEnviar == undefined) {
        tokenParaEnviar = null;
      }

      const response = await fetch(`${backend}/login/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenParaEnviar,
        },
        credentials: 'include',
        body: JSON.stringify({ email: args.email, contrasenia: args.password }),
      });

      if (response.ok) {
        const dataYToken = await response.json();
        const userData = dataYToken.usuario;
        const stringToken = dataYToken.token;

        if (userData.cliente) {
          userData.descuentos = await obtenerDescuentos(userData.cuit);
        }
        else {
          userData.descuentos = null;
        }

        if (stringToken) {
          Cookies.set(stringToken.name, stringToken.value,
            {
              expires: (30),
              sameSite: 'Strict',
              secure: true
            })
        }

        obtenerProductosFiltrados(userData.categoria, userData.descuentos, userData.zona);
        login(userData);
        renovarToken({ email: userData.email })
        obtenerDirecciones(userData.email);

        if (state.userInfo && state.userInfo.email_confirmado == false) {
          setMostrarErrorCodigoConfirmacion();
        }

        setEsperandoRepuesta(false);

      } else {
        obtenerProductosFiltrados();
        const data = await response.text();

        if (response.status === 401) {
          setErrorMessage(data)
        } else if (response.status === 500) {
          setErrorMessage("Error interno del servidor");
        } else {
          // Otros códigos de estado
          setErrorMessage("Error al intentar iniciar sesión");
        }

        setEsperandoRepuesta(false);

      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  };

  const renovarToken = async (args) => {
    let tokenParaEnviar = Cookies.get('tokenRenovacion');

    if (tokenParaEnviar == undefined) {
      tokenParaEnviar = null;
    }

    const response = await fetch(`${backend}/login/postRenovarToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenParaEnviar,
      },
      body: JSON.stringify(args.email),
    });

    const token = await response.json()

    if (response.ok) {
      Cookies.set(token.name, token.value, {
        expires: (1 / 48),
        sameSite: 'Strict',
        secure: true
      });
    } else {
      const data = response.text();
      setErrorMessage("Email y/o contraseña inválidos");
    }
  }

  useEffect(() => {
    const renewTokenInterval = setInterval(() => {
      if (state.logueado) {
        renovarToken({ email: state.userInfo.email });
      }
    }, 29 * 60 * 1000);

    return () => clearInterval(renewTokenInterval);
  }, [state.logueado]);

  const obtenerDirecciones = (email) => {
    let tokenParaEnviar = obtenerToken();

    // Función para enviar la solicitud API una vez que el token esté disponible
    const enviarSolicitudAPI = (token) => {
      fetch(`${backend}/direccion/get/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then(data => {
          if (typeof data === 'object') {
            // La respuesta es un objeto, probablemente la dirección del usuario
            setDomicilio(data.domicilio);
            setCp(data.cp);
            setLocalidad(data.localidad);
            setProvincia(data.provincia);
            // Aquí puedes actualizar tu interfaz de usuario con los datos obtenidos
          } else {
            setDomicilio('');
            setCp('');
            setLocalidad('');
            setProvincia('');
            // La respuesta es un texto, probablemente un mensaje de error
            setErrorMessage(data);
          }
        })
        .catch(error => {
          setErrorMessage('Ocurrió un error al realizar la solicitud:', error.message);
        });
    };

    // Verificar si el token está definido y no está vacío
    if (tokenParaEnviar) {
      enviarSolicitudAPI(tokenParaEnviar);
    } else {
      enviarSolicitudAPI(obtenerToken())
      // Intentar obtener el token después de un pequeño tiempo de espera
      setTimeout(obtenerToken, 500); // Espera 500 milisegundos antes de intentar obtener el token
    }
  };

  return (
    <AuthContext.Provider value={{
      handleLogin,
      opcionSeleccionada,
      setOpcionSeleccionada,
      state,
      setState,
      errorMessage,
      setErrorMessage,
      login,
      logout,
      updateEmailConfirmationStatus,
      verifyToken,
      mostrarLogin,
      setMostrarLogin,
      mostrarErrorCodigoConfirmacion,
      setMostrarErrorCodigoConfirmacion,
      mostrarCartelLogout,
      setMostrarCartelLogout,
      mostrarCartelLogin,
      setMostrarCartelLogin,
      handleLogin,
      direccionConfirmada,
      setDireccionConfirmada,
      domicilio,
      setDomicilio,
      setCp,
      setLocalidad,
      setProvincia,
      cp,
      localidad,
      provincia,
      borrarCookie,
      esperandoRespuesta
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};