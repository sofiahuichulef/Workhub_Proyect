import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Spaces.css';
import { getEspacios } from '../services/espacioService';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Hot Desk', value: 'hot-desk' },
  { label: 'Private Office', value: 'private' },
  { label: 'Meeting Room', value: 'meeting' },
  { label: 'Pod', value: 'pod' },
];

export default function Spaces() {
  const navigate = useNavigate();

  const [allSpaces, setAllSpaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [reserved, setReserved] = useState([]);

  useEffect(() => {
    const cargarEspacios = async () => {
      try {
        const data = await getEspacios();
        setAllSpaces(data);
      } catch (error) {
        console.error('Error cargando espacios:', error);
      }
    };

    cargarEspacios();
  }, []);

  const toggleFav = (id) => {
    setFavorites(f =>
      f.includes(id)
        ? f.filter(x => x !== id)
        : [...f, id]
    );
  };

  const reserve = (id) => {
    setReserved(r => [...r, id]);

    setTimeout(() => {
      setReserved(r => r.filter(x => x !== id));
    }, 2200);
  };

  const visible = allSpaces.filter(
    s => activeFilter === 'all' || s.type === activeFilter
  );

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
                <button key={t} className="filter-chip">
                  {t}
                </button>
              ))}
            </div>
          </section>

          <section className="filter-block">
            <h6>Capacity</h6>

            <div className="chip-group">
              {['1 person','2–4','5–10','10+'].map(t => (
                <button key={t} className="filter-chip">
                  {t}
                </button>
              ))}
            </div>
          </section>

          <section className="filter-block">
            <h6>Amenities</h6>

            <div className="amenities-grid">
              {[
                'Fast WiFi',
                'Monitor',
                'Whiteboard',
                'Coffee',
                'Video conference',
                'Air conditioning',
                'Adjustable lighting',
                'Soundproof'
              ].map(a => (
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

            <input
              type="range"
              min="0"
              max="100"
              defaultValue="80"
              className="price-range"
            />

            <div className="price-inputs">
              <input type="number" placeholder="Min" className="custom-input" />
              <input type="number" placeholder="Max" className="custom-input" />
            </div>
          </section>

          <div className="filter-actions">
            <button className="btn-secondary">
              Clear filters
            </button>

            <button className="btn-primary">
              Apply filters
            </button>
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
                className={`type-filter-btn ${
                  activeFilter === f.value
                    ? 'type-filter-btn--active'
                    : ''
                }`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {visible.map((space, i) => (
              <article
                key={space.id}
                className="space-card-item"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="card-img-wrap">
                  <img src={space.img} alt={space.title} />

                  {space.badge === 'available' && (
                    <span className="badge badge--available">
                      Available today
                    </span>
                  )}

                  {space.badge === 'popular' && (
                    <span className="badge badge--popular">
                      Most popular
                    </span>
                  )}

                  <button
                    className={`fav-btn ${
                      favorites.includes(space.id)
                        ? 'fav-btn--active'
                        : ''
                    }`}
                    onClick={() => toggleFav(space.id)}
                  >
                    {favorites.includes(space.id) ? '♥' : '♡'}
                  </button>
                </div>

                <div className="card-body">

                  <div className="card-top">
                    <div>
                      <h2 className="card-title">
                        {space.title}
                      </h2>

                      <p className="card-meta">
                        {space.meta}
                      </p>
                    </div>

                    <div className="card-price">
                      <span className="price-amount">
                        ${space.price}
                      </span>

                      <span className="price-unit">
                        /hr
                      </span>
                    </div>
                  </div>

                  <ul className="amenities-list">
                    {space.amenities?.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>

                  <button
                    className={`reserve-btn ${
                      reserved.includes(space.id)
                        ? 'reserve-btn--done'
                        : ''
                    }`}
                    onClick={() => navigate(`/reserva/${space.id}`)}
                    disabled={reserved.includes(space.id)}
                  >
                    {reserved.includes(space.id)
                      ? '✓ Reserved!'
                      : 'Reserve space'}
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