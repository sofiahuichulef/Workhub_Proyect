import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom"; // ← agregá useSearchParams acá arriba

// ─── Data ─────────────────────────────────────────────────────────────────────

const TERMS_SECTIONS = [
  {
    id: 1,
    icon: "📋",
    title: "1. Definiciones",
    content:
      "En este documento se establecen las definiciones esenciales sobre términos familiares, proveedores y servicios utilizados en nuestra plataforma.",
  },
  {
    id: 2,
    icon: "🏢",
    title: "2. Uso de Espacios",
    content:
      "Al hacer uso de nuestros espacios, el usuario acepta las condiciones establecidas, incluyendo normas de convivencia y cancelaciones de reservas.",
  },
  {
    id: 3,
    icon: "💳",
    title: "3. Membresías y Pagos",
    content:
      "Los planes de membresía se facturan mensualmente. Los pagos son procesados de forma segura a través de nuestras plataformas certificadas.",
  },
  {
    id: 4,
    icon: "⚖️",
    title: "4. Responsabilidades",
    content:
      "El usuario asume plena responsabilidad por el uso adecuado de los espacios y el cumplimiento de las normas establecidas por CoWork.",
  },
  {
    id: 5,
    icon: "❌",
    title: "5. Cancelaciones",
    content:
      "Las cancelaciones realizadas con más de 24 horas de anticipación son elegibles para reembolso. Las cancelaciones tardías no aplican para devoluciones.",
  },
];

const PRIVACY_BULLETS = [
  "Política de información y datos almacenados",
  "Privacidad de datos personales",
  "Prohibición de compartir información con terceros",
  "Cookies y rastreo de navegación",
  "Derechos del usuario sobre sus datos",
];

const FAQ = [
  "¿Cómo reservar un espacio?",
  "¿Cómo cambiar mi plan?",
  "¿Cómo cancelar mi membresía?",
  "¿Cómo obtener factura?",
  "¿Puedo traer invitados?",
];

const TABS = [
  { id: "terms", label: "Términos y Condiciones" },
  { id: "privacy", label: "Política de Privacidad" },
  { id: "help", label: "Centro de Ayuda" },
  { id: "contact", label: "Contáctanos" },
];

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function TermsPanel() {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className="legal-panel">
      <div className="terms-grid">
        {TERMS_SECTIONS.map((s) => (
          <div key={s.id} className="term-card">
            <span className="term-icon">{s.icon}</span>
            <div>
              <p className="term-title">{s.title}</p>
              <p className="term-body">{s.content}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`accept-btn ${accepted ? "accepted" : ""}`}
        onClick={() => setAccepted(true)}
      >
        {accepted ? "✓ Términos aceptados" : "He leído y acepto los Términos"}
      </button>
    </div>
  );
}

function PrivacyPanel() {
  return (
    <div className="legal-panel privacy-panel">
      <div className="privacy-card">
        <h3>Política de Privacidad</h3>
        <p className="privacy-summary">
          Resumen de información que recopilamos y cómo la utilizamos para
          brindarte una mejor experiencia.
        </p>
        <ul className="privacy-list">
          {PRIVACY_BULLETS.map((b) => (
            <li key={b}>
              <span className="bullet-dot" />
              {b}
            </li>
          ))}
        </ul>
        <button className="ver-mas-btn">Ver más</button>
      </div>
    </div>
  );
}

function HelpPanel() {
  const [search, setSearch] = useState("");
  const filtered = FAQ.filter((q) =>
    q.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="legal-panel help-panel">
      <div className="help-card">
        <h3>Centro de Ayuda</h3>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar de ayuda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p className="faq-title">Preguntas Frecuentes</p>
        <ul className="faq-list">
          {filtered.map((q) => (
            <li key={q} className="faq-item">
              <span>{q}</span>
              <span className="faq-arrow">›</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ContactPanel() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="legal-panel contact-panel">
      <div className="contact-card">
        <h3>Contáctanos</h3>
        <div className="contact-info">
          <p>
            <span>✉️</span> soporte@colwork.com
          </p>
          <p>
            <span>📞</span> +1 800 123 4567
          </p>
        </div>
        <div className="email-form">
          <input
            type="email"
            placeholder="Tu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="send-btn"
            onClick={() => email && setSent(true)}
          >
            {sent ? "✓" : "›"}
          </button>
        </div>
        {sent && (
          <p className="sent-msg">¡Mensaje enviado! Te contactamos pronto.</p>
        )}
        <div className="map-placeholder">
          <span>📍</span>
          <p>CoWork HQ — Santiago, Chile</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Legal() {                            
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'terms';
  const [activeTab, setActiveTab] = useState(defaultTab);    
  return (
    <>
      <style>{`
        .legal-page {
          font-family: 'Nunito', 'Segoe UI', sans-serif;
          background: #f4f6fa;
          min-height: 100vh;
          padding: 3rem 1.5rem;
        }

        .legal-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .legal-header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #1a1a2e;
          letter-spacing: -0.5px;
        }

        /* Tabs */
        .legal-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .tab-btn {
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: #e2e8f0;
          color: #555;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          background: #1a6b5e;
          color: #fff;
        }
        .tab-btn:hover:not(.active) {
          background: #cbd5e1;
        }

        /* Container */
        .legal-container {
          max-width: 860px;
          margin: 0 auto;
        }

        /* Panel base */
        .legal-panel {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Terms */
        .terms-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 580px) { .terms-grid { grid-template-columns: 1fr; } }

        .term-card {
          background: #fff;
          border-radius: 14px;
          padding: 1.1rem 1.25rem;
          display: flex;
          gap: 0.75rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .term-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
        .term-title { font-size: 0.9rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.3rem; }
        .term-body  { font-size: 0.8rem; color: #666; line-height: 1.5; }

        .accept-btn {
          display: block;
          margin: 0 auto;
          padding: 0.75rem 2.5rem;
          background: #1a6b5e;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .accept-btn:hover    { background: #155a4e; transform: scale(0.98); }
        .accept-btn.accepted { background: #2ecc71; }

        /* Privacy */
        .privacy-card {
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          max-width: 540px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .privacy-card h3  { font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem; color: #1a1a2e; }
        .privacy-summary  { font-size: 0.85rem; color: #666; margin-bottom: 1rem; line-height: 1.6; }
        .privacy-list     { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
        .privacy-list li  { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #444; }
        .bullet-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #1a6b5e; flex-shrink: 0;
        }
        .ver-mas-btn {
          padding: 0.6rem 1.75rem;
          background: #1a6b5e; color: #fff;
          border: none; border-radius: 8px;
          font-size: 0.9rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .ver-mas-btn:hover { background: #155a4e; }

        /* Help */
        .help-card {
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          max-width: 540px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .help-card h3 { font-size: 1.2rem; font-weight: 800; margin-bottom: 1rem; color: #1a1a2e; }
        .search-bar {
          display: flex; align-items: center; gap: 0.5rem;
          background: #f4f6fa; border-radius: 10px;
          padding: 0.55rem 0.9rem; margin-bottom: 1.25rem;
          border: 1px solid #e2e8f0;
        }
        .search-icon { font-size: 0.9rem; }
        .search-bar input {
          border: none; background: transparent;
          font-size: 0.9rem; outline: none; width: 100%;
          color: #333;
        }
        .faq-title { font-size: 0.8rem; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.6rem; }
        .faq-list  { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
        .faq-item  {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.65rem 0.75rem; border-radius: 8px;
          font-size: 0.88rem; color: #333; cursor: pointer;
          transition: background 0.15s;
        }
        .faq-item:hover { background: #f4f6fa; }
        .faq-arrow { color: #1a6b5e; font-size: 1.2rem; font-weight: 700; }

        /* Contact */
        .contact-card {
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          max-width: 400px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          display: flex; flex-direction: column; gap: 1rem;
        }
        .contact-card h3 { font-size: 1.2rem; font-weight: 800; color: #1a1a2e; }
        .contact-info p {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.9rem; color: #444; margin-bottom: 0.4rem;
        }
        .email-form {
          display: flex; gap: 0.5rem;
        }
        .email-form input {
          flex: 1; padding: 0.6rem 0.9rem;
          border: 1px solid #e2e8f0; border-radius: 8px;
          font-size: 0.9rem; outline: none;
          transition: border 0.15s;
        }
        .email-form input:focus { border-color: #1a6b5e; }
        .send-btn {
          width: 40px; height: 40px; border-radius: 8px;
          background: #1a6b5e; color: #fff; border: none;
          font-size: 1.2rem; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .send-btn:hover { background: #155a4e; }
        .sent-msg { font-size: 0.82rem; color: #2ecc71; font-weight: 600; }
        .map-placeholder {
          background: #f4f6fa; border-radius: 12px;
          padding: 1.25rem; display: flex; align-items: center;
          gap: 0.75rem; color: #555; font-size: 0.88rem;
          border: 1px dashed #cbd5e1;
        }
        .map-placeholder span { font-size: 1.5rem; }
      `}</style>

      <div className="legal-page">
        <div className="legal-header">
          <h1>Centro de Información Legal y Soporte</h1>
        </div>

        <div className="legal-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="legal-container">
          {activeTab === "terms"   && <TermsPanel />}
          {activeTab === "privacy" && <PrivacyPanel />}
          {activeTab === "help"    && <HelpPanel />}
          {activeTab === "contact" && <ContactPanel />}
        </div>
      </div>
    </>
  );
}
