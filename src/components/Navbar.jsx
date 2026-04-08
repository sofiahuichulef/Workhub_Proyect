import React from 'react';
import './Navbar.css'; 


import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg py-2 py-md-1 py-lg-3 shadow fixed-top bg-white">
        <div className="container-fluid">
          <a href="#" className="title d-flex align-items-center text-decoration-none">
            {/* Usamos la ruta directa desde public */}
            <img
              className="logo d-inline-block align-top"
              src="/logo.jpg" 
              alt="Logo WorkHub Coworking"
              style={{ width: '45px', height: '45px', objectFit: 'cover' }} 
            />
            <h2 className="title-text fw-bold fs-5 mb-0 ms-2 text-dark">CoWork</h2>
          </a>

          {/* Menú Móvil */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button className="btn btn-login rounded-pill fw-bold">Login</button>
            <button
              className="navbar-toggler border-0 shadow-none me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto gap-lg-5">
              <li className="nav-item"><a className="nav-link text-dark" href="#">Spaces</a></li>
              <li className="nav-item"><a className="nav-link text-dark" href="#">Amenities</a></li>
              <li className="nav-item"><a className="nav-link text-dark" href="#">Pricing</a></li>
              <li className="nav-item"><a className="nav-link text-dark" href="#">About</a></li>
            </ul>
            {/* Botón escritorio */}
            <button className="btn btn-login rounded-pill fw-bold d-none d-lg-inline-block ms-5 me-5">
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;