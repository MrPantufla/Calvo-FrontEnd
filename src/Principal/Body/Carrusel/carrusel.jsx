import React from 'react';
import './carrusel.css';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../../../contextLogin';

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../../Imagenes/ImagenesCarrusel/', false, /\.(png|jpe?g|svg)$/));

const imageKeys = Object.keys(images);

export default function Carrusel() {
  const { state } = useAuth();

  return (
    <div className="container">
      <Carousel interval={3500}>
        {imageKeys.map((imageName, index) => (
          <Carousel.Item key={index}>
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
