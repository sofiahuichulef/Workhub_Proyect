import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Home.css';

const slides = [
  {
    bg: '/coworking.jpg',
    title: 'Work Hub Coworking',
    subtitle: 'Donde las ideas se conectan y los proyectos cobran vida.',
    btn: 'Reservar ahora',
  },
  {
    bg: '/coworking2.jpg',
    title: 'Espacios diseñados para crear',
    subtitle: 'Conecta con profesionales y aumenta tu productividad.',
    btn: 'Explorar',
  },
  {
    bg: '/coworking3.jpg',
    title: 'Trabaja en comunidad',
    subtitle: 'Conecta con profesionales y aumenta tu productividad.',
    btn: 'Unirse',
  },
];

const spaceCards = [
  { img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80', title: 'Dedicated Desks', price: 'Starting at $299/mo' },
  { img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80', title: 'Private Offices', price: 'Starting at $899/mo' },
  { img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', title: 'Hot Desking', price: 'Starting at $149/mo' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent(c => (c + 1) % slides.length);

  return (
    <>
      {/* HERO CAROUSEL */}
      <section className="hero-carousel">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === current ? 'hero-slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.bg})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Link to="/spaces" className="btn-outline">{slide.btn}</Link>
            </div>
          </div>
        ))}
        <button className="carousel-control prev" onClick={prev}>&#8249;</button>
        <button className="carousel-control next" onClick={next}>&#8250;</button>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="features-inner">
          <div className="features__stats">
            <div className="stat">
              <h2 className="stat__value">25+</h2>
              <span className="stat__label">LOCATIONS</span>
            </div>
            <div className="stat">
              <h2 className="stat__value">10K+</h2>
              <span className="stat__label">MEMBERS</span>
            </div>
            <div className="stat">
              <h2 className="stat__value">99%</h2>
              <span className="stat__label">SATISFACTION</span>
            </div>
          </div>

          <div className="features__header">
            <h2 className="features__title">Everything you need to succeed</h2>
            <p className="features__description">
              Our spaces are equipped with premium amenities to help you focus on
              what matters most to your business.
            </p>
          </div>

          <div className="features__cards">
            <article className="feature-card">
              <div className="card__icon">📶</div>
              <h3 className="card__title">High-Speed Wi-Fi</h3>
              <p className="card__text">Enterprise-grade fiber internet connectivity throughout the building.</p>
            </article>
            <article className="feature-card">
              <div className="card__icon">👥</div>
              <h3 className="card__title">Private Meeting Rooms</h3>
              <p className="card__text">Fully equipped spaces for team collaborations and client pitches.</p>
            </article>
            <article className="feature-card">
              <div className="card__icon">☕</div>
              <h3 className="card__title">Bottomless Coffee</h3>
              <p className="card__text">Stay fueled all day with our premium selection of artisan roasts.</p>
            </article>
          </div>
        </div>
      </section>

      {/* OUR SPACES */}
      <section className="spaces">
        <div className="spaces-container">
          <div className="spaces-header">
            <div>
              <h2>Our Spaces</h2>
              <p>Choose the environment that fits your workflow.</p>
            </div>
            <Link to="/spaces" className="view-link">View all spaces ›</Link>
          </div>
          <div className="spaces-grid">
            {spaceCards.map((card, i) => (
              <div key={i} className="space-card">
                <img src={card.img} alt={card.title} />
                <div className="card-info">
                  <h3>{card.title}</h3>
                  <p>{card.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to transform the way you work?</h2>
          <p>Join our thriving community of creatives and entrepreneurs today.</p>
          <Link to="/login" className="cta-btn">Get Started Today</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
