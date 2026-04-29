import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Reserva.css';

const mockReservasAnteriores = [
  {
    id: 1,
    espacio: 'Executive Suite 402',
    fecha: '2025-04-15',
    hora: '09:00 - 12:00',
    estado: 'confirmada',
    precio: 135,
  },
  {
    id: 2,
    espacio: 'Conference Room B',
    fecha: '2025-04-18',
    hora: '14:00 - 16:00',
    estado: 'completada',
    precio: 160,
  },
  {
    id: 3,
    espacio: 'Solo Pod 05',
    fecha: '2025-04-20',
    hora: '10:00 - 11:00',
    estado: 'cancelada',
    precio: 15,
  },
];

const allSpaces = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    title: 'Executive Suite 402',
    meta: 'Oficina Privada · 4 Personas',
    price: 45,
    amenities: ['📶 Alta velocidad', '☕ Bebidas gratis', '🖨 Impresión'],
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=600&q=80',
    title: 'Open Area Desk 12',
    meta: 'Hot Desk · 1 Persona',
    price: 5,
    amenities: ['🖨 Impresión', '⚡ Carga rápida'],
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80',
    title: 'Conference Room B',
    meta: 'Sala de reunión · 10 Personas',
    price: 80,
    amenities: ['📹 Video conf.', '📊 Kit presentación'],
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    title: 'Solo Pod 05',
    meta: 'Oficina Privada · 1 Persona',
    price: 15,
    amenities: ['🔊 Insonorizado', '💡 Luz ajustable'],
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    title: 'Team Office 101',
    meta: 'Oficina Privada · 6 Personas',
    price: 60,
    amenities: ['🖥 Pantalla', '❄ Clima'],
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80',
    title: 'Lounge Hot Desk',
    meta: 'Hot Desk · 1 Persona',
    price: 4,
    amenities: ['🤛 Zona tranquila', '☕ Café incluido'],
  },
];

export default function Reserva() {
  const { espacioId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reservar');
  const [formData, setFormData] = useState({
    fecha: '',
    horaInicio: '09:00',
    horaFin: '11:00',
    nombre: '',
    email: '',
    notas: '',
  });
  const [reservaEnviada, setReservaEnviada] = useState(false);

  const espacio = allSpaces.find(s => s.id === parseInt(espacioId));

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservaEnviada(true);
    setTimeout(() => {
      setReservaEnviada(false);
      navigate('/spaces');
    }, 2500);
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      confirmada: { label: 'Confirmada', class: 'badge--confirmed' },
      completada: { label: 'Completada', class: 'badge--completed' },
      cancelada: { label: 'Cancelada', class: 'badge--cancelled' },
      pendiente: { label: 'Pendiente', class: 'badge--pending' },
    };
    return estados[estado] || estados.pendiente;
  };

  if (!espacio) {
    return (
      <div className="reserva-page" style={{ paddingTop: '70px' }}>
        <div className="reserva-not-found">
          <h2>Espacio no encontrado</h2>
          <button onClick={() => navigate('/spaces')}>Volver a espacios</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reserva-page" style={{ paddingTop: '56px' }}>
      {/* Hero Header */}
      <header className="reserva-hero">
        <div className="reserva-hero-bg">
          <img src={espacio.img} alt={espacio.title} />
          <div className="reserva-hero-overlay"></div>
        </div>
        <div className="reserva-hero-content">
          <button className="back-btn" onClick={() => navigate('/spaces')}>
            ← Volver a espacios
          </button>
          <h1>{espacio.title}</h1>
          <p className="reserva-hero-meta">{espacio.meta}</p>
          <div className="reserva-hero-price">
            <span className="price-amount">${espacio.price}</span>
            <span className="price-unit">/hora</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="reserva-tabs">
        <button
          className={`tab-btn ${activeTab === 'reservar' ? 'tab-btn--active' : ''}`}
          onClick={() => setActiveTab('reservar')}
        >
          📅 Nueva Reserva
        </button>
        <button
          className={`tab-btn ${activeTab === 'historial' ? 'tab-btn--active' : ''}`}
          onClick={() => setActiveTab('historial')}
        >
          📋 Mis Reservas
        </button>
      </div>

      {/* Content */}
      <div className="reserva-container">
        {activeTab === 'reservar' ? (
          <div className="reserva-form-section">
            {reservaEnviada ? (
              <div className="reserva-success">
                <div className="success-icon">✓</div>
                <h2>¡Reserva enviada!</h2>
                <p>Recibirás un correo de confirmación pronto.</p>
              </div>
            ) : (
              <form className="reserva-form" onSubmit={handleSubmit}>
                <h3>Detalles de la reserva</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      required
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Hora de inicio</label>
                    <select
                      value={formData.horaInicio}
                      onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                    >
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Hora de fin</label>
                    <select
                      value={formData.horaFin}
                      onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                    >
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Notas adicionales (opcional)</label>
                  <textarea
                    placeholder="Alguna necesidad especial..."
                    rows={3}
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  ></textarea>
                </div>

                <div className="resumen-reserva">
                  <h4>Resumen</h4>
                  <div className="resumen-item">
                    <span>Espacio</span>
                    <span>{espacio.title}</span>
                  </div>
                  <div className="resumen-item">
                    <span>Tarifa por hora</span>
                    <span>${espacio.price}</span>
                  </div>
                  <div className="resumen-total">
                    <span>Total estimado</span>
                    <span>${espacio.price * 2}</span>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Confirmar Reserva
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="historial-section">
            <h3>Historial de reservas</h3>
            {mockReservasAnteriores.length > 0 ? (
              <div className="reservas-list">
                {mockReservasAnteriores.map((reserva) => {
                  const estado = getEstadoBadge(reserva.estado);
                  return (
                    <div key={reserva.id} className="reserva-card">
                      <div className="reserva-card-header">
                        <h4>{reserva.espacio}</h4>
                        <span className={`estado-badge ${estado.class}`}>
                          {estado.label}
                        </span>
                      </div>
                      <div className="reserva-card-body">
                        <div className="reserva-info">
                          <span className="info-label">📅 Fecha</span>
                          <span>{reserva.fecha}</span>
                        </div>
                        <div className="reserva-info">
                          <span className="info-label">🕐 Horario</span>
                          <span>{reserva.hora}</span>
                        </div>
                        <div className="reserva-info">
                          <span className="info-label">💰 Total</span>
                          <span>${reserva.precio}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-reservas">
                <p>No tienes reservas anteriores.</p>
                <button onClick={() => setActiveTab('reservar')}>
                  Hacer una reserva
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}