import './carrusel.css';
import carrusel1 from '../../../Imagenes/carrusel1.jpg';
import carrusel2 from '../../../Imagenes/carrusel2.jpg';
import carrusel3 from '../../../Imagenes/carrusel3.jpg';

export default function Carrusel() {
    return (
        <div className="contenedorPrincipalCarrusel">
  <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={carrusel1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrusel2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carrusel3} className="d-block w-100" alt="..." />
                    </div>
                    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>
    );
}
