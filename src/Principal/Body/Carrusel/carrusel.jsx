import React from 'react';
import './carrusel.css';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';
import { useEffect, useState } from 'react';

export default function Carrusel() {
  const [listaImagenes, setListaImagenes] = useState([]);
  const [imagenesCargadas, setImagenesCargadas] = useState(false);
  const [datosImagen, setDatosImagen] = useState([]);
  const [primeraCarga, setPrimeraCarga] = useState(true);
  const [respuestas, setRespuestas] = useState([]);

  const { state } = useAuth();

  const {
    backend,
    obtenerToken
  } = useVariables();

  const intervalo = state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? null : 2500) : 2500;

  const enviarImagen = async (archivo) => {
    try {
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('carpeta', "imagenesCarrusel");

      const response = await fetch(`${backend}/carousel/postSubir`, {
        method: 'POST',
        headers: {
          'Authorization': obtenerToken(),
        },
        body: formData,
      });

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error al intentar subir la imagen:', error);
      return false;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    enviarImagen(file);
  };

  const eliminarImagen = async (linkArchivo) => {
    try {
      const startIndex = linkArchivo.lastIndexOf('%2F') + 3;
      const endIndex = linkArchivo.indexOf('?');
      const fileNamePart = linkArchivo.substring(startIndex, endIndex);

      const nombreImagen = decodeURIComponent(fileNamePart).replace(/%20/g, ' ');

      const formData = new FormData();
      formData.append('imageName', nombreImagen);
      formData.append('carpeta', "imagenesCarrusel");

      const response = await fetch(`${backend}/carousel/postEliminar`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': obtenerToken(),
        },
        credentials: 'include'
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al intentar subir la imagen:', error);
      return false;
    }
  };

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const response = await fetch(`${backend}/carousel/getLista?folder=imagenesCarrusel`);

        if (!response.ok) {
          throw new Error('Error al obtener la lista de imágenes');
        }

        const data = await response.json();

        setListaImagenes(data);

        data.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          document.head.appendChild(link);
        });

        setImagenesCargadas(true);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerImagenes();
  }, [backend]);

  const cambiarDatos = async (nombreArchivo, index, dato, tipo) => {

    let itemEnviar;

    if (tipo == 'visibilidad') {
      itemEnviar = {
        index: index,
        visibilidad: dato
      }
    }
    else {
      itemEnviar = {
        index: index,
        urlDestino: dato
      }
    }

    const response = await fetch(`${backend}/datosCarrusel/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': obtenerToken(),
      },
      credentials: 'include',
      body: JSON.stringify(itemEnviar),
    });

    if (response.ok) {
      if (tipo == 'visibilidad') {
        setDatosImagen((prevDatos) => {
          const nuevosDatosArray = [...prevDatos]; // Crear una copia del arreglo actual
          nuevosDatosArray[index][0] = dato; // Asignar el nuevo valor al índice correspondiente
          return nuevosDatosArray; // Retornar el nuevo arreglo
        });
      }
      else {
        setDatosImagen((prevDatos) => {
          const nuevosDatosArray = [...prevDatos]; // Crear una copia del arreglo actual
          nuevosDatosArray[index][1] = dato; // Asignar el nuevo valor al índice correspondiente
          return nuevosDatosArray; // Retornar el nuevo arreglo
        });

        setRespuestas((prevRespuestas) => {
          const nuevasRespuestasArray = [...prevRespuestas];
          nuevasRespuestasArray[index] = true;
          return nuevasRespuestasArray;
        })
      }

      console.log("Dato cambiado con éxito")
    }
    else {
      if (tipo == 'url') {
        setRespuestas((prevRespuestas) => {
          const nuevasRespuestasArray = [...prevRespuestas];
          nuevasRespuestasArray[index] = false;
          return nuevasRespuestasArray;
        })
      }
    }
  }

  useEffect(() => {
    const asignarVisibilidades = async () => {
      if (!primeraCarga) {
        try {
          const permisosDb = await obtenerListaVisilibilidad();

          const arrayPermisos = listaImagenes.map((_, i) => {
            const permiso = permisosDb.find(p => p.index == i);
            return permiso
              ? [permiso.visibilidad || 'clientes', permiso.urlDestino || '']
              : ['clientes', '']; // Valores predeterminados si no se encuentra permiso
          });

          setDatosImagen(arrayPermisos);
        } catch (error) {
          console.error("Error al obtener permisos de visibilidad:", error);
        }
      } else {
        setPrimeraCarga(false);
      }
    };

    asignarVisibilidades();
  }, [listaImagenes]);

  const obtenerListaVisilibilidad = async () => {
    try {
      const response = await fetch(`${backend}/datosCarrusel/get`);

      if (!response.ok) {
        throw new Error('Error al obtener la lista de visibilidades');
      }

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="contenedorPrincipalCarrusel">
      {imagenesCargadas ?
        (<Carousel interval={intervalo}>
          {
            listaImagenes.map((imageName, index) => (

              (index < listaImagenes.length - 1 && datosImagen[index]) &&
              (
                datosImagen[index][0] === 'todos' ||
                (datosImagen[index][0] === 'registrados' && state.logueado) ||
                (datosImagen[index][0] === 'clientes' && state.userInfo && state.userInfo.cliente)
              )
              && (
                <Carousel.Item key={index}>
                  <img
                    className={`d-block w-100 ${datosImagen[index][1] ? 'clickeable' : ''}`}
                    src={imageName}
                    alt={`Slide ${imageName}`}
                    onClick={() => {
                      const url = datosImagen[index]?.[1];
                      if (url && url.length > 0) {
                        window.location.href = url;
                      }
                    }}
                  />

                  {(state.userInfo && (state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador')) &&
                    (
                      <>
                        <div className="divSubirArchivoCarrusel storageCarrusel">
                          <label htmlFor="subirImagen" className="boton-personalizado">+</label>
                          <input id="subirImagen" type="file" onChange={handleFileUpload} style={{ display: "none" }} accept=".png, .jpg, .jpeg, .svg, .webp" />
                        </div>

                        <div className="divPermisosCarrusel">
                          <button className={datosImagen[index][0] == 'todos' ? 'active' : ''} onClick={() => cambiarDatos(imageName, index, 'todos', 'visibilidad')}>{ }Todos</button>
                          <button className={datosImagen[index][0] == 'registrados' ? 'active' : ''} onClick={() => cambiarDatos(imageName, index, 'registrados', 'visibilidad')}>Registrados</button>
                          <button className={datosImagen[index][0] == 'clientes' ? 'active' : ''} onClick={() => cambiarDatos(imageName, index, 'clientes', 'visibilidad')}>Clientes</button>
                        </div>

                        {listaImagenes.length > 2 &&
                          (
                            <>
                              <div className="divEliminarArchivoCarrusel storageCarrusel">
                                <label htmlFor={`eliminarImagen_${index}`} className="boton-personalizado">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="4.5rem" height="4.5rem" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                  </svg>
                                </label>
                                <input id={`eliminarImagen_${index}`} onClick={() => eliminarImagen(imageName)} style={{ display: "none" }} />
                              </div>

                              <div className="urlDestinoContainer">
                                <input
                                  type="text"
                                  value={(datosImagen[index][0] && datosImagen[index][1]) || ''}
                                  onChange={(e) => {
                                    if (datosImagen[index]) {
                                      const newDatosImagen = [...datosImagen];
                                      newDatosImagen[index][1] = e.target.value;
                                      setDatosImagen(newDatosImagen);
                                    }
                                  }}
                                  onKeyDown={(e) => e.key === 'Enter' && cambiarDatos(imageName, index, datosImagen[index][1], 'url')}
                                />
                                <button
                                  className={(respuestas[index] && respuestas[index] === true) ? 'true' : respuestas[index] === false ? 'false' : ''}
                                  onClick={() => cambiarDatos(index, datosImagen[index][1], 'url')}
                                >
                                  {respuestas[index] && respuestas[index] === true ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-lg" viewBox="0 0 16 16">
                                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                    </svg>)
                                    :
                                    (respuestas[index] && respuestas[index] === false ?
                                      (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-exclamation" viewBox="0 0 16 16">
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                                      </svg>)
                                      :
                                      (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--colorSecundario)" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                      </svg>)
                                    )
                                  }
                                </button>
                              </div>
                            </>
                          )}
                      </>
                    )}

                </Carousel.Item>
              )
            ))
          }
        </Carousel>)
        :
        (<div className="cargandoCarouselContainer">
          <div className="spinner-border cargandoCarousel" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>)
      }
    </div>
  );
}