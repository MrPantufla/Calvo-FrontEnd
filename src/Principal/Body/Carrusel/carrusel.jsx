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

  const obtenerUsuarios = async () => {
    try {
        const response = await fetch(`${backend}/api/imagenes`, {
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
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
