import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Home.css';

// ── Hook animación al entrar en pantalla ─────────
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ── Datos ────────────────────────────────────────
const slides = [
  { bg: '/coworking.jpg',  title: 'Work Hub Coworking',          subtitle: 'Where ideas connect and projects come to life.',              btn: 'Book now'  },
  { bg: '/coworking2.jpg', title: 'Spaces designed for creation', subtitle: 'Connect with professionals and boost your productivity.',     btn: 'Explore'   },
  { bg: '/coworking3.jpg', title: 'Work in community',            subtitle: 'Join thousands of professionals growing together.',           btn: 'Join'      },
  { bg: '/coworking4.png', title: 'Your productivity, our priority', subtitle: 'Premium spaces built so you can do your best work every day.', btn: 'Get started' },
];

const spaceCards = [
  { img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80', title: 'Dedicated Desks',   price: 'Starting at $299/mo' },
  { img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80', title: 'Private Offices',   price: 'Starting at $899/mo' },
  { img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', title: 'Hot Desking',       price: 'Starting at $149/mo' },
  { img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80', title: 'Meeting Rooms',     price: 'Starting at $49/hr'  },
  { img: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80', title: 'Open Workspaces',   price: 'Starting at $99/mo'  },
];

// ── Subcomponente animado ────────────────────────
function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`home-fade home-fade--${direction} ${inView ? 'home-fade--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // Hero carousel
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const heroPrev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const heroNext = () => setCurrent(c => (c + 1) % slides.length);

  // Spaces carousel — avanza solo cada 4 seg
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        setCardsVisible(3);
      } else if (window.matchMedia('(min-width: 600px)').matches) {
        setCardsVisible(2);
      } else {
        setCardsVisible(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxSpaceIndex = Math.max(0, spaceCards.length - cardsVisible);

  useEffect(() => {
    if (spaceIndex > maxSpaceIndex) {
      setSpaceIndex(maxSpaceIndex);
    }
  }, [cardsVisible, maxSpaceIndex, spaceIndex]);

  useEffect(() => {
    const t = setInterval(() => {
      setSpaceIndex(i => (i + 1) % (maxSpaceIndex + 1));
    }, 4000);
    return () => clearInterval(t);
  }, [maxSpaceIndex]);

  const spacePrev = () => setSpaceIndex(i => (i - 1 + maxSpaceIndex + 1) % (maxSpaceIndex + 1));
  const spaceNext = () => setSpaceIndex(i => (i + 1) % (maxSpaceIndex + 1));

  // Refs para animaciones de sección
  const statsRef    = useRef(null);
  const featuresRef = useRef(null);
  const statsInView    = useInView(statsRef, 0.2);
  const featuresInView = useInView(featuresRef, 0.15);

  return (
    <>
      {/* ══ HERO CAROUSEL ══════════════════════════ */}
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
        <button className="carousel-control prev" onClick={heroPrev}>&#8249;</button>
        <button className="carousel-control next" onClick={heroNext}>&#8250;</button>

        {/* Dots hero */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'hero-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════ */}
      <section className="features">
        <div className="features-inner">
          <div className="features__stats" ref={statsRef}>
            {[
              { value: '25+',  label: 'LOCATIONS'    },
              { value: '10K+', label: 'MEMBERS'      },
              { value: '99%',  label: 'SATISFACTION' },
            ].map((s, i) => (
              <div
                key={i}
                className={`stat ${statsInView ? 'stat--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <h2 className="stat__value">{s.value}</h2>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Features header ── */}
          <FadeIn direction="up" className="features__header">
            <h2 className="features__title">Everything you need to succeed</h2>
            <p className="features__description">
              Our spaces are equipped with premium amenities to help you focus on
              what matters most to your business.
            </p>
          </FadeIn>

          {/* ── Feature cards ── */}
          <div className="features__cards" ref={featuresRef}>
            {[
              { icon: 'fa-wifi',     title: 'High-Speed Wi-Fi',      text: 'Enterprise-grade fiber internet connectivity throughout the building.'     },
              { icon: 'fa-users',    title: 'Private Meeting Rooms',  text: 'Fully equipped spaces for team collaborations and client pitches.'         },
              { icon: 'fa-mug-hot',  title: 'Bottomless Coffee',      text: 'Stay fueled all day with our premium selection of artisan roasts.'         },
            ].map((card, i) => (
              <article
                key={i}
                className={`feature-card ${featuresInView ? 'feature-card--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="card__icon"><i className={`fa-solid ${card.icon}`}></i></div>
                <div>
                  <h3 className="card__title">{card.title}</h3>
                  <p className="card__text">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR SPACES ═════════════════════════════ */}
      <section className="spaces">
        <div className="spaces-container">

          {/* Header — título izq, link der */}
          <FadeIn direction="up" className="spaces-header">
            <div>
              <h2>Our Spaces</h2>
              <p>Choose the environment that fits your workflow.</p>
            </div>
            <Link to="/spaces" className="view-link">View all spaces ›</Link>
          </FadeIn>

          {/* Carrusel mobile/tablet */}
          <div className="spaces-carousel">
            <div
              className="spaces-track"
              style={{ '--space-index': spaceIndex }}
            >
              {spaceCards.map((card, i) => (
                <div key={i} className="space-card">
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <div className="card-info">
                    <h3>{card.title}</h3>
                    <p>{card.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="space-arrow space-arrow--prev" onClick={spacePrev} aria-label="Anterior">&#8592;</button>
            <button className="space-arrow space-arrow--next" onClick={spaceNext} aria-label="Siguiente">&#8594;</button>

            <div className="space-dots">
              {Array.from({ length: maxSpaceIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`space-dot ${i === spaceIndex ? 'space-dot--active' : ''}`}
                  onClick={() => setSpaceIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════ */}
      <FadeIn direction="up">
        <section className="cta">
          <div className="cta-content">
            <h2>Ready to transform the way you work?</h2>
            <p>Join our thriving community of creatives and entrepreneurs today.</p>
            <Link to="/login" className="cta-btn">Get Started Today</Link>
          </div>
        </section>
      </FadeIn>

      <Footer />
    </>
  );
}
