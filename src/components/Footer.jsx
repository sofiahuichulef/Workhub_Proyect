import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-custom mt-5">
      <div className="footer-container pt-5 px-5">
        <div className="row align-items-start">
          
          <div className="col-12 col-lg-3 text-center text-lg-start mb-4">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
              {/* Cargamos el logo directamente desde la carpeta public */}
              <img
                src="/logo.jpg" 
                alt="CoWork Logo"
                className="logo-img me-2"
                style={{ width: '45px', height: '45px', objectFit: 'cover' }}
              />
              <h2 className="h4 fw-bold mb-0">CoWork</h2>
            </div>
            <p id="parrafito" className="small mb-3 description-text text-center text-lg-start">
              Espacios premium para la optimización del trabajo, diseñados para
              inspirar la innovación y optimizar el crecimiento de la comunidad.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              <a href="#" className="social-link"><i className="bi bi-globe text-dark"></i></a>
              <a href="#" className="social-link"><i className="bi bi-browser-chrome text-dark"></i></a>
              <a href="#" className="social-link"><i className="bi bi-at text-dark"></i></a>
            </div>
          </div>

          <div className="col-6 col-lg-3 text-start mb-4 ps-lg-5">
            <h5 id="company" className="fw-bold mb-3 title-link">Company</h5>
            <ul className="list-unstyled ps-0 custom-list">
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>

          <div className="col-6 col-lg-3 text-start mb-4">
            <h5 id="product" className="fw-bold mb-3 title-link">Product</h5>
            <ul className="list-unstyled ps-0 custom-list">
              <li>Pricing</li>
              <li>Locations</li>
              <li>Amenities</li>
              <li>Member Benefits</li>
            </ul>
          </div>

          <div className="col-lg-3 d-none d-lg-block text-start mb-4">
            <h5 id="support" className="fw-bold mb-3 title-link">Support</h5>
            <ul className="list-unstyled ps-0 custom-list">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <hr className="mt-4 mb-4 opacity-25" />
        <p className="text-center small pb-5 copyright-text">
          © {new Date().getFullYear()} CoWork Spaces Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;