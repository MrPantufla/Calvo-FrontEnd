import React from 'react';
import './carrusel.css';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Carrusel() {
  const [listaImagenes, setListaImagenes] = useState([]);
  const [imagenesCargadas, setImagenesCargadas] = useState(false);

  const { state } = useAuth();

  const { backend } = useVariables();

  const intervalo = state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? null : 2500) : 2500;

  const enviarImagen = async (archivo) => {
    try {
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('carpeta', "imagenesCarrusel");

      let tokenParaEnviar = Cookies.get('jwtToken');

      if (tokenParaEnviar == undefined) {
        tokenParaEnviar = null;
      }

      const response = await fetch(`${backend}/api/subirImagen`, {
        method: 'POST',
        headers: {
          'Authorization': tokenParaEnviar,
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

      let tokenParaEnviar = Cookies.get('jwtToken');

      if (tokenParaEnviar == undefined) {
        tokenParaEnviar = null;
      }

      const response = await fetch(`${backend}/api/eliminarImagen`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': tokenParaEnviar,
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
        const response = await fetch(`${backend}/api/obtenerListaImagenes?folder=imagenesCarrusel`);

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

  return (
    <div className="container">
      {imagenesCargadas ?
        (<Carousel interval={intervalo}>
          {
            listaImagenes.map((imageName, index) => (
              index !== 0 && (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={imageName}
                    alt={`Slide ${index}`}
                  />
                  {(state.userInfo && (state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador')) && (
                    <>
                      <div className="divSubirArchivoCarrusel storageCarrusel">
                        <label htmlFor="subirImagen" className="boton-personalizado">+</label>
                        <input id="subirImagen" type="file" onChange={handleFileUpload} style={{ display: "none" }} accept=".png, .jpg, .jpeg, .svg" />
                      </div>

                      {listaImagenes.length > 2 && (
                        <div className="divEliminarArchivoCarrusel storageCarrusel">
                          <label htmlFor={`eliminarImagen_${index}`} className="boton-personalizado">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4.5rem" height="4.5rem" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                          </label>
                          <input id={`eliminarImagen_${index}`} onClick={() => eliminarImagen(imageName)} style={{ display: "none" }} />
                        </div>
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
