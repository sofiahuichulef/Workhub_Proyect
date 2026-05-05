import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Amenities.css';

// ── Hook: detecta cuando el elemento entra en pantalla ──
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

// ── Datos de amenidades ──────────────────────────────────
const categories = [
  {
    id: 'cafe',
    icon: '☕',
    title: 'Coffee & Drinks',
    description: 'Enjoy artisanal coffee, premium teas, and cold drinks throughout your day. Our barista prepares your favorite drink.',
    items: ['Specialty Coffee', 'Tea and Infusions', 'Natural Juices', 'Sparkling Water', 'Healthy Snacks'],
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    color: '#f59e0b',
    colorBg: '#fef3c7',
    colorBgDark: 'rgba(245,158,11,0.15)',
  },
  {
    id: 'lounge',
    icon: '🛋️',
    title: 'Lounge Areas',
    description: 'Comfortable and relaxed spaces with premium armchairs, where you can take breaks, have informal conversations, or simply breathe.',
    items: ['Ergonomic Armchairs', 'Natural Light', 'Reading Area', 'Ambient Music', 'Plants and Greenery'],
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    color: '#8b5cf6',
    colorBg: '#ede9fe',
    colorBgDark: 'rgba(139,92,246,0.15)',
  },
  {
    id: 'library',
    icon: '📚',
    title: 'Library & Reading',
    description: 'A curated collection of books on business, technology, design, and personal development. The perfect place to get inspired.',
    items: ['Over 300 titles', 'Specialized Magazines', 'Silent Zone', 'Individual Tables', 'Reading Light'],
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80',
    color: '#10b981',
    colorBg: '#d1fae5',
    colorBgDark: 'rgba(16,185,129,0.15)',
  },
  {
    id: 'games',
    icon: '🎮',
    title: 'Games Zone',
    description: 'Recharge your energy with a game of chess, ping pong, or video games. The best ideas are born after a good rest.',
    items: ['Ping Pong', 'Chess and Checkers', 'Board Games', 'Video Game Console', 'Billiards Area'],
    img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80',
    color: '#ef4444',
    colorBg: '#fee2e2',
    colorBgDark: 'rgba(239,68,68,0.15)',
  },
  {
    id: 'wellness',
    icon: '🧘',
    title: 'Wellness & Relax',
    description: 'Meditation and mindfulness room to disconnect between meetings. Your well-being is as important as your productivity.',
    items: ['Meditation Room', 'Zen Zone', 'Relaxing Music', 'Aromatherapy', 'Stretching Area'],
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    color: '#06b6d4',
    colorBg: '#cffafe',
    colorBgDark: 'rgba(6,182,212,0.15)',
  },
  {
    id: 'tech',
    icon: '⚡',
    title: 'Technology & Connectivity',
    description: '1GB fiber optic internet, printers, scanners, 4K screens, and charging stations for all your devices.',
    items: ['1GB Fiber Optic WiFi', 'Printing and Scanning', '4K Screens', 'Wireless Charging', 'Videoconference Rooms'],
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    color: '#1D76E2',
    colorBg: '#dbeafe',
    colorBgDark: 'rgba(29,118,226,0.15)',
  },
];

const stats = [
  { value: '6', label: 'Amenity Zones' },
  { value: '300+', label: 'Titles in Library' },
  { value: '24/7', label: 'Available Access' },
  { value: '100%', label: 'WiFi Coverage' },
];

// ── Componente card de amenidad ──────────────────────────
function AmenityCard({ amenity, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const isEven = index % 2 === 0;

  return (
    <article
      ref={ref}
      className={`amenity-card ${inView ? 'amenity-card--visible' : ''} ${isEven ? 'amenity-card--left' : 'amenity-card--right'}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Imagen */}
      <div className="amenity-card__img-wrap">
        <img src={amenity.img} alt={amenity.title} className="amenity-card__img" />
        <div
          className="amenity-card__icon-badge"
          style={{ background: amenity.color }}
        >
          {amenity.icon}
        </div>
      </div>

      {/* Contenido */}
      <div className="amenity-card__body">
        <span
          className="amenity-card__tag"
          style={{ background: amenity.colorBg, color: amenity.color,
            ['--tag-bg-dark']: amenity.colorBgDark }}
        >
          {amenity.icon} {amenity.title}
        </span>
        <h3 className="amenity-card__title">{amenity.title}</h3>
        <p className="amenity-card__desc">{amenity.description}</p>
        <ul className="amenity-card__list">
          {amenity.items.map((item, i) => (
            <li key={i} className="amenity-card__item" style={{ color: amenity.color }}>
              <span className="amenity-card__item-dot" style={{ background: amenity.color }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ── Página principal ─────────────────────────────────────
export default function Amenities() {
  const heroRef  = useRef(null);
  const statsRef = useRef(null);
  const heroInView  = useInView(heroRef, 0.1);
  const statsInView = useInView(statsRef, 0.2);

  return (
    <>
      <div className="amenities-page">

        {/* ── HERO ── */}
        <section className="amenities-hero" ref={heroRef}>
          <div className="amenities-hero__overlay" />
          <div className={`amenities-hero__content ${heroInView ? 'amenities-hero__content--visible' : ''}`}>
            <span className="amenities-hero__eyebrow">WorkHub Coworking</span>
            <h1 className="amenities-hero__title">Everything you need<br />to work better</h1>
            <p className="amenities-hero__subtitle">
              More than a workspace — a complete experience designed
              for your productivity, well-being, and creativity.
            </p>
            <Link to="/spaces" className="amenities-hero__btn">
              View available spaces
            </Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="amenities-stats" ref={statsRef}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`amenities-stat ${statsInView ? 'amenities-stat--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="amenities-stat__value">{stat.value}</span>
              <span className="amenities-stat__label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* ── INTRO ── */}
        <section className="amenities-intro">
          <h2 className="amenities-intro__title">Our Amenities</h2>
          <p className="amenities-intro__text">
            Every detail of WorkHub is designed so you can focus
            on what matters. From the first coffee in the morning to the
            last break of the day.
          </p>
        </section>

        {/* ── CARDS GRID ── */}
        <section className="amenities-grid">
          {categories.map((amenity, i) => (
            <AmenityCard key={amenity.id} amenity={amenity} index={i} />
          ))}
        </section>

        {/* ── CTA FINAL ── */}
        <section className="amenities-cta">
          <div className="amenities-cta__box">
            <h2>Ready to live the experience?</h2>
            <p>Join thousands of professionals who are already working better at WorkHub.</p>
            <div className="amenities-cta__btns">
              <Link to="/spaces" className="amenities-cta__btn-primary">
                Reserve a space
              </Link>
              <Link to="/login" className="amenities-cta__btn-outline">
                Create free account
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
