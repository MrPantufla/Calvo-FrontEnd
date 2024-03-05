import React from 'react';
import './carrusel.css';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../../Imagenes/ImagenesCarrusel/', false, /\.(png|jpe?g|svg)$/));

const imageKeys = Object.keys(images);

export default function Carrusel() {
  const { state } = useAuth();

  const { backend } = useVariables();

  const intervalo = state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? null : 2500) : 2500;

  const obtenerImagenes = async () => {
    try {
      const response = await fetch(`${backend}/api/obtenerImagenes`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error('Error en la solicitud:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error desconocido:', error);
      return null;
    }
  };

  const enviarImagen = async (archivo) => {
    try {
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('carpeta', "Imagenes carrusel");

      const response = await fetch(`${backend}/api/subirImagen`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      console.log(response)
    } catch (error) {
      console.error('Error al intentar subir la imagen:', error);
      return false;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    enviarImagen(file);
  };

  const eliminarImagen = async (archivo) => {
    try {
      const formData = new FormData();
      formData.append('imageName', archivo);
      formData.append('carpeta', "Imagenes carrusel");

      const response = await fetch(`${backend}/api/eliminarImagen`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      console.log(response)
    } catch (error) {
      console.error('Error al intentar subir la imagen:', error);
      return false;
    }
  };

  return (
    <div className="container">
      <Carousel interval={intervalo}>
        {imageKeys.map((imageName, index) => (
          <Carousel.Item key={index} >
            <img
              className="d-block w-100"
              src={images[imageName]}
              alt={`Slide ${index}`}
            />

            <div className="divSubirArchivoCarrusel storageCarrusel">
              <label htmlFor="subirImagen" className="boton-personalizado">+</label>
              <input id="subirImagen" type="file" onChange={handleFileUpload} style={{ display: "none" }} accept=".png, .jpg, .jpeg, .svg"/>
            </div>

            <div className="divEliminarArchivoCarrusel storageCarrusel">
              <label htmlFor="eliminarImagen" className="boton-personalizado">
                <svg xmlns="http://www.w3.org/2000/svg" width="4.5rem" height="4.5rem" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </label>
              <input id="eliminarImagen" onClick={()=> eliminarImagen(imageName)} style={{ display: "none" }} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
