import { useState } from 'react';
import Footer from '../components/Footer';
import './Spaces.css';

const allSpaces = [
  {
    id: 1, type: 'private',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    title: 'Executive Suite 402', meta: 'Oficina Privada · 4 Personas',
    price: 45, amenities: ['📶 Alta velocidad', '☕ Bebidas gratis', '🖨 Impresión'],
    badge: 'available',
  },
  {
    id: 2, type: 'hot-desk',
    img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=600&q=80',
    title: 'Open Area Desk 12', meta: 'Hot Desk · 1 Persona',
    price: 5, amenities: ['🖨 Impresión', '⚡ Carga rápida'],
    badge: null,
  },
  {
    id: 3, type: 'meeting',
    img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80',
    title: 'Conference Room B', meta: 'Sala de reunión · 10 Personas',
    price: 80, amenities: ['📹 Video conf.', '📊 Kit presentación'],
    badge: null,
  },
  {
    id: 4, type: 'pod',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    title: 'Solo Pod 05', meta: 'Oficina Privada · 1 Persona',
    price: 15, amenities: ['🔊 Insonorizado', '💡 Luz ajustable'],
    badge: 'popular',
  },
  {
    id: 5, type: 'private',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    title: 'Team Office 101', meta: 'Oficina Privada · 6 Personas',
    price: 60, amenities: ['🖥 Pantalla', '❄ Clima'],
    badge: null,
  },
  {
    id: 6, type: 'hot-desk',
    img: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80',
    title: 'Lounge Hot Desk', meta: 'Hot Desk · 1 Persona',
    price: 4, amenities: ['🤛 Zona tranquila', '☕ Café incluido'],
    badge: null,
  },
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Hot Desk', value: 'hot-desk' },
  { label: 'Private Office', value: 'private' },
  { label: 'Meeting Room', value: 'meeting' },
  { label: 'Pod', value: 'pod' },
];

export default function Spaces() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [reserved, setReserved] = useState([]);

  const toggleFav = (id) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const reserve = (id) => {
    setReserved(r => [...r, id]);
    setTimeout(() => setReserved(r => r.filter(x => x !== id)), 2200);
  };

  const visible = allSpaces.filter(s => activeFilter === 'all' || s.type === activeFilter);

  return (
    <>
      <div className="spaces-layout" style={{ paddingTop: '56px' }}>
        {/* Sidebar filters */}
        <aside className="filters-panel">
          <h4>Filters</h4>

          <section className="filter-block">
            <h6>When</h6>
            <div className="filter-field">
              <label>Date</label>
              <input type="date" className="custom-input" />
            </div>
            <div className="filter-field">
              <label>Start time</label>
              <select className="custom-input">
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
              </select>
            </div>
            <div className="filter-field">
              <label>Duration</label>
              <select className="custom-input">
                <option>2 hours</option>
                <option>1 hour</option>
                <option>3 hours</option>
                <option>Half day</option>
                <option>Full day</option>
              </select>
            </div>
          </section>

          <section className="filter-block">
            <h6>Space type</h6>
            <div className="chip-group">
              {['Hot Desk','Private Office','Meeting Room','Lounge'].map(t => (
                <button key={t} className="filter-chip">{t}</button>
              ))}
            </div>
          </section>

          <section className="filter-block">
            <h6>Capacity</h6>
            <div className="chip-group">
              {['1 person','2–4','5–10','10+'].map(t => (
                <button key={t} className="filter-chip">{t}</button>
              ))}
            </div>
          </section>

          <section className="filter-block">
            <h6>Amenities</h6>
            <div className="amenities-grid">
              {['WiFi rápido','Monitor','Pizarra','Café','Videoconferencia','Aire acondicionado','Luz ajustable','Soundproof'].map(a => (
                <label key={a} className="check-label">
                  <input type="checkbox" /> {a}
                </label>
              ))}
            </div>
          </section>

          <section className="filter-block">
            <div className="price-header">
              <h6>Price</h6>
              <span>$80/hr</span>
            </div>
            <input type="range" min="0" max="100" defaultValue="80" className="price-range" />
            <div className="price-inputs">
              <input type="number" placeholder="Min" className="custom-input" />
              <input type="number" placeholder="Max" className="custom-input" />
            </div>
          </section>

          <div className="filter-actions">
            <button className="btn-secondary">Clear filters</button>
            <button className="btn-primary">Apply filters</button>
          </div>
        </aside>

        {/* Main grid */}
        <main className="grid-section">
          <div className="mobile-toolbar">
            <p>{visible.length} spaces available</p>
          </div>

          <div className="type-filters">
            {filters.map(f => (
              <button
                key={f.value}
                className={`type-filter-btn ${activeFilter === f.value ? 'type-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {visible.map((space, i) => (
              <article key={space.id} className="space-card-item" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="card-img-wrap">
                  <img src={space.img} alt={space.title} />
                  {space.badge === 'available' && <span className="badge badge--available">Disponible hoy</span>}
                  {space.badge === 'popular' && <span className="badge badge--popular">Más popular</span>}
                  <button
                    className={`fav-btn ${favorites.includes(space.id) ? 'fav-btn--active' : ''}`}
                    onClick={() => toggleFav(space.id)}
                  >
                    {favorites.includes(space.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-top">
                    <div>
                      <h2 className="card-title">{space.title}</h2>
                      <p className="card-meta">{space.meta}</p>
                    </div>
                    <div className="card-price">
                      <span className="price-amount">${space.price}</span>
                      <span className="price-unit">/hr</span>
                    </div>
                  </div>
                  <ul className="amenities-list">
                    {space.amenities.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                  <button
                    className={`reserve-btn ${reserved.includes(space.id) ? 'reserve-btn--done' : ''}`}
                    onClick={() => reserve(space.id)}
                    disabled={reserved.includes(space.id)}
                  >
                    {reserved.includes(space.id) ? '✓ ¡Reservado!' : 'Reservar espacio'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}