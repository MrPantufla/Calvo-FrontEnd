import React from 'react';
import './carrusel.css';
import carrusel1 from '../../../Imagenes/carrusel1.jpg';
import Carousel from 'react-bootstrap/Carousel';

export default function Carrusel() {
  return (
    <div className="container">
      <Carousel interval={3500}> {/* Cambia el valor de interval según tus necesidades */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carrusel1}
            alt="Primer slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carrusel1}
            alt="Segundo slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carrusel1}
            alt="Tercer slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
