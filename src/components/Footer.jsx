import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="CoWork Logo" />
              <h2>CoWork</h2>
            </div>
            <p className="description-text">
              Premium workspaces designed to inspire innovation and accelerate growth for your community.
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
              <li><Link to="/pricing">Pricing</Link></li>
              <li>Locations</li>
              <li>Amenities</li>
              <li>Member Benefits</li>
            </ul>
          </div>

          <div className="footer-col footer-col--desktop">
            <h5>Support</h5>
            <ul>
              <li><Link to="/legal?tab=contact">Contact Us</Link></li>
              <li><Link to="/legal?tab=help">Help Center</Link></li>
              <li><Link to="/legal?tab=privacy">Privacy Policy</Link></li>
              <li><Link to="/legal?tab=terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="copyright-text">© 2024 CoWork Spaces Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
