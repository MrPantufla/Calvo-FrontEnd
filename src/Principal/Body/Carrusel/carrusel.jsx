import React from 'react';
import './carrusel.css';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';
import { useEffect, useState } from 'react';

export default function Carrusel() {
  const [listaImagenes, setListaImagenes] = useState([]);
  const [imagenesCargadas, setImagenesCargadas] = useState(false);
  const [listaVisibilidad, setListaVisibilidad] = useState([]);
  const [estadoRespuestaCambioUrl, setEstadoRespuestaCambioUrl] = useState(null);
  const [datosEditableCambiados, setDatosEditableCambiados] = useState(null);

  const { state } = useAuth();

  const {
    backend,
    obtenerToken
  } = useVariables();

  const intervalo = state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? null : 2500) : 2500;
  const prefijo = "https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesCarrusel/";

  const obtenerListaVisilibilidad = async () => {
    try {
      const response = await fetch(`${backend}/datosCarrusel/get`);

      if (!response.ok) {
        throw new Error('Error al obtener la lista de visibilidades');
      }

      const data = await response.json();

      const updatedData = data.map((v) => {
        return {
          ...v,
          urlImagen: "https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesCarrusel/" + v.imagen
        };
      });

      setListaVisibilidad(updatedData);

      return data;

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    obtenerListaVisilibilidad();
  }, [])

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
        cambiarDatos(archivo.name, 'admin', 'visibilidad');
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

  const eliminarImagen = async (urlImagen) => {
    try {

      const imagen = urlImagen.replace(prefijo, "");

      const formData = new FormData();
      formData.append('imageName', imagen);
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
        eliminarDatos(imagen);
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

        // Convertir URLs al formato público correcto
        const urlsPublicas = data.map(url => {
          const match = url.match(/\/o\/(.+?)\?/); // Extrae la parte del path después de "/o/" y antes de "?"
          if (match && match[1]) {
            const path = decodeURIComponent(match[1]); // Decodifica los caracteres especiales
            return `https://storage.googleapis.com/backend-calvo-415917.appspot.com/${path}`;
          }
          return url; // Si no se puede procesar, devuelve la URL original
        });

        const indexImagenAviso = urlsPublicas.findIndex((i) => i.endsWith("imagenAviso.webp"));

        if (indexImagenAviso > 0) {
          const [imagenAviso] = urlsPublicas.splice(indexImagenAviso, 1);
          urlsPublicas.unshift(imagenAviso);
        }

        // Preload de imágenes
        urlsPublicas.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          document.head.appendChild(link);
        });

        setListaImagenes(urlsPublicas);
        setImagenesCargadas(true);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerImagenes();
  }, [backend]);

  const cambiarDatos = async (urlImagen, dato, tipo) => {

    let itemEnviar;

    const imagenFinal = urlImagen.replace(prefijo, "");

    if (tipo == 'visibilidad') {
      itemEnviar = {
        visibilidad: dato,
        imagen: imagenFinal
      }
    }
    else {
      itemEnviar = {
        urlDestino: dato,
        imagen: imagenFinal
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
      obtenerListaVisilibilidad();

      console.log("Dato cambiado con éxito")

      if (tipo == 'url') {
        setEstadoRespuestaCambioUrl(true);
      }
    }
    else {
      console.log(response.text)

      if (tipo == 'url') {
        setEstadoRespuestaCambioUrl(false);
      }
    }
  }

  const cambiarDatosImagenEditable = async (e, titulo, subtitulo, texto) => {

    e.preventDefault();

    const datos = listaVisibilidad.find((l) => l.urlImagen == "https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesCarrusel/imagenAviso.webp");

    let itemEnviar = {};

    itemEnviar.imagen = datos.urlImagen?.replace(prefijo, "");
    itemEnviar.titulo = titulo;
    itemEnviar.subtitulo = subtitulo;
    itemEnviar.texto = texto;

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
      obtenerListaVisilibilidad();

      setDatosEditableCambiados(true);
    }
    else {
      setDatosEditableCambiados(false);
    }
  }

  const eliminarDatos = async (imagen) => {
    const response = await fetch(`${backend}/datosCarrusel/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': obtenerToken(),
      },
      credentials: 'include',
      body: imagen,
    });

    if (response.ok) {
      console.log("Datos eliminados con éxito")
    }
    else {
      console.log(response.text)
    }
  }

  return (
    <div className="contenedorPrincipalCarrusel">
      {imagenesCargadas ?
        (<Carousel interval={intervalo} onSelect={() => setEstadoRespuestaCambioUrl(null)}>
          {
            listaImagenes.map((imageName, index) => {

              if (index != (listaImagenes.length - 1)) {
                const visibilidadImagenArray = listaVisibilidad.find((i) => decodeURIComponent(i.urlImagen) === imageName);

                if (visibilidadImagenArray?.imagen == 'imagenAviso.webp') {
                  console.log(visibilidadImagenArray)
                }

                return (
                  !visibilidadImagenArray ||
                  visibilidadImagenArray.visibilidad === 'todos' ||
                  visibilidadImagenArray.visibilidad === 'registrados' && state.logueado ||
                  visibilidadImagenArray.visibilidad === 'clientes' && state.userInfo && state.userInfo.cliente ||
                  visibilidadImagenArray.visibilidad === 'admin' && state.userInfo && state.userInfo.tipo_usuario == 'admin'
                ) &&
                  (
                    <Carousel.Item key={imageName}>
                      <img
                        className={`d-block w-100 ${visibilidadImagenArray?.urlDestino ? 'clickeable' : ''}`}
                        src={imageName}
                        alt={`Slide ${imageName}`}
                        onClick={() => {
                          const url = visibilidadImagenArray.urlDestino || '';
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
                              <button className={visibilidadImagenArray?.visibilidad == 'todos' ? 'active' : ''} onClick={() => cambiarDatos(imageName, 'todos', 'visibilidad')}>Todos</button>
                              <button className={visibilidadImagenArray?.visibilidad == 'registrados' ? 'active' : ''} onClick={() => cambiarDatos(imageName, 'registrados', 'visibilidad')}>Registrados</button>
                              <button className={visibilidadImagenArray?.visibilidad == 'clientes' ? 'active' : ''} onClick={() => cambiarDatos(imageName, 'clientes', 'visibilidad')}>Clientes</button>
                              <button className={visibilidadImagenArray?.visibilidad == 'admin' ? 'active' : ''} onClick={() => cambiarDatos(imageName, 'admin', 'visibilidad')}>Admin</button>
                            </div>

                            {listaImagenes.length > 2 &&
                              (
                                <>
                                  {!imageName.endsWith("imagenAviso.webp") &&
                                    <div className="divEliminarArchivoCarrusel storageCarrusel">
                                      <label htmlFor={`eliminarImagen_${imageName.replace(prefijo, "")}`} className="boton-personalizado">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4.5rem" height="4.5rem" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                      </label>
                                      <input id={`eliminarImagen_${imageName.replace(prefijo, "")}`} onClick={() => eliminarImagen(imageName)} style={{ display: "none" }} />
                                    </div>
                                  }

                                  {!imageName.endsWith("imagenAviso.webp") &&
                                    <div className="urlDestinoContainer">
                                      <input
                                        type="text"
                                        defaultValue={visibilidadImagenArray?.urlDestino}
                                        onChange={(e) => visibilidadImagenArray.urlDestino = e.target.value}
                                        onKeyDown={(e) => e.key === 'Enter' && cambiarDatos(imageName, visibilidadImagenArray.urlDestino, 'url')}
                                      />
                                      <button
                                        className={estadoRespuestaCambioUrl == true ? 'true' : (estadoRespuestaCambioUrl == false ? 'false' : 'null')}
                                        onClick={() => cambiarDatos(imageName, visibilidadImagenArray.urlDestino, 'url')}
                                      >
                                        {estadoRespuestaCambioUrl == null ?
                                          (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--colorSecundario)" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                          </svg>)
                                          :
                                          (estadoRespuestaCambioUrl == true ?
                                            (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-lg" viewBox="0 0 16 16">
                                              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                            </svg>)
                                            :
                                            (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-exclamation" viewBox="0 0 16 16">
                                              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                                            </svg>)
                                          )
                                        }
                                      </button>
                                    </div>}
                                </>
                              )}
                            {imageName.endsWith("imagenAviso.webp") &&
                              (<>
                                <input
                                  className="tituloAviso"
                                  defaultValue={visibilidadImagenArray?.titulo}
                                  onChange={(e) => visibilidadImagenArray.tituloAviso = e.target.value}
                                />
                                <input
                                  className="subtituloAviso"
                                  defaultValue={visibilidadImagenArray?.subtitulo}
                                  onChange={(e) => visibilidadImagenArray.subtituloAviso = e.target.value}
                                />
                                <textarea className="textoAviso"
                                  defaultValue={visibilidadImagenArray?.texto}
                                  onChange={(e) => visibilidadImagenArray.textoAviso = e.target.value}
                                  style={{ width: 'auto' }}
                                />
                                <button className="sendCambios" onClick={(e) => cambiarDatosImagenEditable(e, visibilidadImagenArray.tituloAviso, visibilidadImagenArray.subtituloAviso, visibilidadImagenArray.textoAviso)}>
                                  {datosEditableCambiados == null ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--colorSecundario)" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>)
                                    :
                                    (datosEditableCambiados == true ?
                                      (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                      </svg>)
                                      :
                                      (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-exclamation" viewBox="0 0 16 16">
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                                      </svg>)
                                    )
                                  }
                                </button>
                              </>)
                            }
                          </>
                        )
                      }
                      {
                        (state.userInfo?.tipo_usuario != 'admin' && imageName.endsWith("imagenAviso.webp")) &&
                        (<>
                          <h1 className="tituloAviso">
                            {visibilidadImagenArray?.titulo}
                          </h1>
                          <h2 className="subtituloAviso">
                            {visibilidadImagenArray?.subtitulo}
                          </h2>
                          <p className="textoAviso">

                            {visibilidadImagenArray?.texto?.replace(/\\n/g, '\n').split('\n').map((linea, index) => (
                              <React.Fragment key={index}>
                                {linea}
                                <br />
                              </React.Fragment>
                            ))}
                          </p>
                        </>
                        )
                      }
                    </Carousel.Item>
                  )
              }
            })
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