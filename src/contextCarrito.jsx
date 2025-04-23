import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProductos } from './contextProductos';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';
import { marcasUnicasPerfiles } from './rubros';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useFinalizarCompra } from './contextFinalizarCompra';

const CarritoContext = createContext();

function useCarrito() {
  return useContext(CarritoContext);
}

function CarritoProvider({ children }) {
  const { productosIndexado } = useProductos();

  const {
    state,
    setMostrarLogin,
    domicilio,
    cp,
    localidad,
    provincia
  } = useAuth();

  const { productosSueltos } = useProductos();

  const {
    backend,
    obtenerFechaFormateada,
    obtenerHoraFormateada,
    obtenerToken
  } = useVariables();

  const {
    numeroTarjeta1,
    numeroTarjeta2,
    numeroTarjeta3,
    numeroTarjeta4,
    mesCaducidad,
    anioCaducidad,
    codigoSeguridad,
    diaNacimiento,
    mesNacimiento,
    anioNacimiento,
    dni,
    nombreYApellido,
    metodoPago,
    tipoTarjeta
  } = useFinalizarCompra();

  const [elementos, setElementos] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carritoConfirmado, setCarritoConfirmado] = useState(false);
  const [mostrarCartelError, setMostrarCartelError] = useState(false);
  const [primeraAccion, setPrimeraAccion] = useState(true);
  const [compraRealizadaAbierto, setCompraRealizadaAbierto] = useState(false);
  const [respuestaCompra, setRespuestaCompra] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(null);
  const [datosCorroborados, setDatosCorroborados] = useState(false);
  const [instanciaPedido, setInstanciaPedido] = useState('');
  const [paqueteAñadir, setPaqueteAñadir] = useState(null);
  const [elementoEliminar, setElementoEliminar] = useState(null);
  const [respuestaRecibida, setRespuestaRecibida] = useState(true);
  const [pdfRef, setPdfRef] = useState(null);
  const [elementosPdf, setElementosPdf] = useState([]);
  const [totalPdf, setTotalPdf] = useState(0);

  const extraerProducto = (cadena) => {
    const cadenaConvertida = cadena.toString();
    // Captura el primer código antes del guion o paréntesis
    const match = cadenaConvertida.match(/^([^()-]+)/);
    if (match) {
      return parseInt(match[1]);
    }
    return null; // Devuelve null si no se encuentra un código
  };

  const extraerTroquelado = (cadena) => {
    const cadenaConvertida = cadena.toString();
    // Captura el código después del guion
    const match = cadenaConvertida.match(/-(\d+)/);
    if (match) {
      return parseInt(match[1]);
    }
    return null; // Devuelve null si no se encuentra un código de troquelado
  };

  const extraerProceso = (cadena) => {
    const cadenaConvertida = cadena.toString();
    const match = cadenaConvertida.match(/^[^()]*\(([^()]*)(\(|$)/);
    if (match) {
      return parseInt(match[1]);
    }
    return null; // Devuelve null si no se encuentra un proceso
  }

  const extraerAcabado = (cadena) => {
    const cadenaConvertida = cadena.toString();
    const match = cadenaConvertida.match(/\(([^()]*)\(([^()]*)\)\)/);
    if (match) {
      return match[2];
    }
    return null;
  }

  function añadirElemento(id, cantidadCarrito) {
    let idProducto;

    if (!(id.toString().includes("(")) && !(id.toString().includes("-"))) {
      id = parseInt(id);
      idProducto = id;
    }
    else {
      idProducto = parseInt(id.split("(")[0].trim());
    }

    setPaqueteAñadir(null);
    if (state.userInfo && productosIndexado && productosIndexado[idProducto] && state.userInfo.categoria != 'MAYORISTA' && marcasUnicasPerfiles.find(marcaPerfil => marcaPerfil == productosIndexado[idProducto].marca)) {
      setMostrarCartelError(true);
    }
    else {
      if (Object.keys(productosIndexado).length !== 0) {
        setElementos(prevElementos => {
          if (productosIndexado && productosSueltos) {
            let productoReal;

            const idSinProceso = extraerProducto(id.toString());

            productoReal = productosIndexado[idSinProceso];

            if (!productoReal) {
              productoReal = productosSueltos[idSinProceso];
            }

            //const id = productoReal.id;
            const cod_origProducto = productoReal.cod_orig;
            const detalleProducto = productoReal.detalle;
            const precioProducto = productoReal.precio;
            const kg = productoReal.kg;
            const referenciaPaquete = productoReal.referenciaPaquete;
            const cantidad = productoReal.cantidad;
            const tipo_prod = productoReal.tipo_prod;

            let cantidadPaquete = -1;
            if (referenciaPaquete) {
              cantidadPaquete = referenciaPaquete.cantidad;
            }

            const elementoExistente = prevElementos.find((elemento) => (elemento.id === id));

            if (elementoExistente) {
              elementoExistente.cantidadCarrito += cantidadCarrito;

              if (referenciaPaquete) {
                if (cantidadPaquete != -1) {
                  if (elementoExistente.cantidadCarrito * elementoExistente.cantidad >= cantidadPaquete) {
                    const paquetesResultantes = Math.floor(elementoExistente.cantidadCarrito * elementoExistente.cantidad / cantidadPaquete);

                    if (elementoExistente.cantidadCarrito * elementoExistente.cantidad == cantidadPaquete * paquetesResultantes) {
                      setElementoEliminar(elementoExistente.id);
                    }

                    for (let i = 0; i < cantidadPaquete * paquetesResultantes; i++) {
                      restarElemento(elementoExistente.id);
                    }
                    const idPaquete = referenciaPaquete.id;

                    setPaqueteAñadir({ id: idPaquete, cant: paquetesResultantes });
                  }
                }
              }
              // Si ya existe, solo actualiza la cantidad y deja que el useEffect maneje la actualización del carrito
              return [...prevElementos];
            } else {
              if (referenciaPaquete) {
                if (cantidadPaquete != -1) {
                  if (cantidadCarrito >= cantidadPaquete) {
                    const paquetesResultantes = Math.floor(cantidadCarrito * productoReal.cantidad / cantidadPaquete);

                    for (let i = 0; i < cantidadPaquete * paquetesResultantes; i++) {
                      cantidadCarrito--;
                    }

                    const idPaquete = referenciaPaquete.id;

                    setPaqueteAñadir({ id: idPaquete, cant: paquetesResultantes });

                    if (cantidadCarrito == 0) {
                      return prevElementos;
                    }
                  }
                }
              }
              // Si es un nuevo elemento, agrega y deja que el useEffect maneje la actualización del carrito
              return [...prevElementos, { id, cod_origProducto, cantidadCarrito, detalleProducto, precioProducto, kg, cantidad, tipo_prod }];
            }
          }
        });
      }
    }
  }

  useEffect(() => {
    if (paqueteAñadir) {
      añadirElemento(paqueteAñadir.id, paqueteAñadir.cant)
      setCarritoAbierto(true);
    }

    if (elementoEliminar) {
      eliminarElemento(elementoEliminar);
      setElementoEliminar(null);
    }
  }, [añadirElemento])

  function restarElemento(id) {
    const elementoExistente = elementos.find((elemento) => elemento.id === id);
    if (elementoExistente && elementoExistente.cantidadCarrito > 1) {
      elementoExistente.cantidadCarrito -= 1;
      setElementos([...elementos]);
    } else {
      setElementoEliminar(id);
      eliminarElemento(id);
    }
  }

  function eliminarElemento(id) {
    setElementos((prevElementos) => {
      return prevElementos.filter((elemento) => elemento.id !== id);
    });
  }

  function toggleCarrito() {
    if (state.logueado) {
      if (state.userInfo.email_confirmado) {
        setCarritoAbierto(!carritoAbierto);
      } else {
        setMostrarLogin(true);
      }
    } else {
      setMostrarLogin(true);
    }
  }

  function limpiarCarrito() {
    setElementos([]);
  }

  const actualizarCarrito = () => {
    const listaCarrito = [...elementos];
    const productos = listaCarrito.map(item => item.id).join(' ');
    const cantidades = listaCarrito.map(item => item.cantidadCarrito).join(' ');
    const ActualizacionCarrito = {
      productos: productos,
      cantidades: cantidades
    }

    fetch(`${backend}/carrito/postActualizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': obtenerToken(),
      },
      body: JSON.stringify(ActualizacionCarrito),
    })
      .then(response => {
        if (response.ok) {
          // Procesar la respuesta exitosa
        } else {
          // Procesar la respuesta de error
          console.error('Error en el envío de carrito:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error al enviar la lista del carrito al servidor:', error);
      });
  }

  useEffect(() => {
    if (!primeraAccion) {
      actualizarCarrito();
    }
    else {
      setPrimeraAccion(false);
    }
  }, [elementos]);

  const confirmarCompra = (datosPedido) => {
    if(elementos.length <= 0){
      return false;
    }

    setRespuestaRecibida(false);
    setCompraRealizadaAbierto(true);

    const nuevosElementos = elementos.map(({ id, cantidadCarrito }) => ({ id, cantidadCarrito }));

    const direccion = {
      domicilio: domicilio,
      cp: cp,
      localidad: localidad,
      provincia: provincia
    };

    let pagoCompleto = null;

    if (metodoPago == 'tarjeta') {
      pagoCompleto = {
        datosTarjeta: {
          AñoVencimiento: anioCaducidad.toString(),
          MesVencimiento: mesCaducidad.toString(),
          CodigoTarjeta: codigoSeguridad.toString(),
          DocumentoTitular: dni.toString(),
          Email: state.userInfo.email,
          FechaNacimientoTitular: diaNacimiento.toString() + mesNacimiento.toString() + anioNacimiento.toString(),
          NumeroPuertaResumen: "0",
          NumeroTarjeta: numeroTarjeta1.toString() + numeroTarjeta2.toString() + numeroTarjeta3.toString() + numeroTarjeta4.toString(),
          TipoDocumento: "DNI",
          TitularTarjeta: nombreYApellido,
        },
        AceptaHabeasData: false,
        AceptTerminosyCondiciones: true,
        CantidadCuotas: 1,
        IPCliente: "",
        MedioPagoId: tipoTarjeta == 'credito' ? 8 : 9
      }
    }

    const carritoRequest = {
      carritoJson: JSON.stringify(nuevosElementos),
      direccion: direccion,
      facturacion: datosPedido,
      pagoCompleto: pagoCompleto,
      metodoPago: metodoPago
    };

    setRespuestaCompra("Almacenando pedido...");

    fetch(`${backend}/carrito/postPedido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': obtenerToken(),
      },
      body: JSON.stringify(carritoRequest),
    })
      .then(response => {
        setRespuestaRecibida(true);

        if (response.ok) {
          limpiarCarrito();
        }

        return response.text();
      })
      .then(text => {
        if (text) {
          setRespuestaCompra(text);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const suscribirRespuestas = () => {
    const token = encodeURIComponent(obtenerToken());
    console.log("Iniciando suscripción SSE con token:", token);

    const eventSource = new EventSource(`${backend}/mensajes/subscribe?token=${token}`);

    eventSource.onopen = () => {
      console.log("Conexión SSE establecida correctamente.");
    };

    eventSource.onmessage = (event) => {
      console.log("Mensaje recibido:", event.data);
      setRespuestaCompra(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("Error en SSE:", error);
      eventSource.close();
      console.log("Conexión SSE cerrada por error.");
    };

    // Limpieza: cierra la conexión al desmontar el componente
    return () => {
      console.log("Cerrando conexión SSE.");
      eventSource.close();
      setRespuestaCompra('');
    };
  };

  useEffect(() => {
    if (state.logueado && state.userInfo.cantidades_carrito) {
      const productosArray = state.userInfo.productos_carrito.split(' ').map(String);
      const cantidadesArray = state.userInfo.cantidades_carrito.split(' ').map(Number);

      for (let i = 0; i < productosArray.length; i++) {
        añadirElemento(productosArray[i], cantidadesArray[i])
      }
    }
  }, [productosIndexado]);

  const generarPdf = async () => {
    const element = pdfRef.current;

    // Renderiza el elemento como una imagen de canvas
    const canvas = await html2canvas(element, {
      scale: 1.2, // Asegura una buena calidad de imagen
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // Ancho de A4 en mm
    const pageHeight = 297; // Altura de A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura de la imagen
    let position = 0;
    let heightLeft = imgHeight;

    // Añade la primera página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Añade páginas adicionales si es necesario
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Guardar el PDF
    pdf.save(`Presupuesto Calvo ${obtenerFechaFormateada()} ${obtenerHoraFormateada()}.pdf`);
  };

  return (
    <CarritoContext.Provider value={{
      datosCorroborados,
      setDatosCorroborados,
      precioTotal,
      setPrecioTotal,
      compraRealizadaAbierto,
      setCompraRealizadaAbierto,
      mostrarCartelError,
      actualizarCarrito,
      //confirmarCompraAbierto,
      //setConfirmarCompraAbierto,
      carritoConfirmado,
      setCarritoConfirmado,
      confirmarCompra,
      toggleCarrito,
      setCarritoAbierto,
      carritoAbierto,
      elementos,
      limpiarCarrito,
      añadirElemento,
      restarElemento,
      instanciaPedido,
      setInstanciaPedido,
      eliminarElemento,
      respuestaCompra,
      setRespuestaCompra,
      respuestaRecibida,
      extraerProducto,
      extraerTroquelado,
      extraerProceso,
      extraerAcabado,
      mostrarCartelError,
      setMostrarCartelError,
      generarPdf,
      setPdfRef,
      elementosPdf,
      setElementosPdf,
      totalPdf,
      setTotalPdf
    }}>
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, useCarrito, CarritoProvider };

