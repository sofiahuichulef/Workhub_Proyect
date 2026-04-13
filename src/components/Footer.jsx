import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/Logo.png" alt="CoWork Logo" />
              <h2>CoWork</h2>
            </div>
            <p className="description-text">
              Espacios premium para la optimización del trabajo, diseñados para
              inspirar la innovación y optimizar el crecimiento de la comunidad.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">🌐</a>
              <a href="#" className="social-link">🔗</a>
              <a href="#" className="social-link">@</a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li>Pricing</li>
              <li>Locations</li>
              <li>Amenities</li>
              <li>Member Benefits</li>
            </ul>
          </div>

          <div className="footer-col footer-col--desktop">
            <h5>Support</h5>
            <ul>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="copyright-text">© 2024 CoWork Spaces Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
