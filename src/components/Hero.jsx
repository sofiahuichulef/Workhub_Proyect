import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section
      id="heroCarousel"
      className="carousel slide hero-carousel carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      /* Quitamos el margen temporal y el fondo rojo de aquí */
    >
      <div className="carousel-inner">
        {/* Slide 1 - Coworking Principal */}
        <div
          className="carousel-item active hero-slide"
          style={{ backgroundImage: "url('/coworking.jpg')" }}
        >
          <div className="hero-overlay"></div>
          <div className="container hero-content text-white text-center">
            <h1 className="display-3 fw-bold">Work Hub Coworking</h1>
            <p className="lead">Donde las ideas se conectan y los proyectos cobran vida.</p>
            <a href="#" className="btn btn-outline-light btn-lg rounded-pill px-4">
              Reservar ahora
            </a>
          </div>
        </div>

        {/* Slide 2 - Espacios de Creación */}
        <div
          className="carousel-item hero-slide"
          style={{ backgroundImage: "url('/coworking2.jpg')" }}
        >
          <div className="hero-overlay"></div>
          <div className="container hero-content text-white text-center">
            <h1 className="display-3 fw-bold">Espacios diseñados para crear</h1>
            <p className="lead">Conecta con profesionales y aumenta tu productividad.</p>
            <a href="#" className="btn btn-outline-light btn-lg rounded-pill px-4"> 
              Explorar 
            </a>
          </div>
        </div>

        {/* Slide 3 - Comunidad */}
        <div
          className="carousel-item hero-slide"
          style={{ backgroundImage: "url('/coworking3.jpg')" }}
        >
          <div className="hero-overlay"></div>
          <div className="container hero-content text-white text-center">
            <h1 className="display-3 fw-bold">Trabaja en comunidad</h1>
            <p className="lead">Únete a nuestra red y expande tus horizontes.</p>
            <a href="#" className="btn btn-outline-light btn-lg rounded-pill px-4"> 
              Unirse 
            </a>
          </div>
        </div>
      </div>

      {/* Flechas de control */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </section>
  );
};

export default Hero;