import { useState } from "react";
import { Link } from "react-router-dom";


// ─── Data ────────────────────────────────────────────────────────────────────

const ROOM_TYPES = [
  { id: "hot-desk", label: "Hot Desk", baseRate: 52, icon: "🪑" },
  { id: "private-office", label: "Private Office", baseRate: 85, icon: "🚪" },
  { id: "meeting-room", label: "Meeting Room", baseRate: 120, icon: "🗣️" },
];

const ADDONS = [
  { id: "coffee", label: "Coffee Service", price: 8, icon: "☕" },
  { id: "av", label: "AV Equipment", price: 15, icon: "📽️" },
];

const PACKAGES = [
  { label: "Meeting Package", hours: 10, multiplier: 0.8, color: "#e8f4f8" },
  { label: "Focus Day", hours: 5, multiplier: 0.85, color: "#eef2ff" },
  { label: "Group Work", hours: 3, multiplier: 0.9, color: "#fef3e2" },
];

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    tagline: "Start building",
    price: 0,
    icon: "🌱",
    color: "#e8f7f0",
    accent: "#2ecc71",
    features: ["Limited space", "Basic access"],
    featured: false,
  },
  {
    id: "basic",
    name: "Basic Plan",
    tagline: "Grow",
    price: 15,
    icon: "📈",
    color: "#eef2ff",
    accent: "#5c7cfa",
    features: ["More space", "Basic amenities"],
    featured: false,
  },
  {
    id: "intermediate",
    name: "Intermediate Plan",
    tagline: "Empower",
    price: 35,
    icon: "📡",
    color: "#fff8e1",
    accent: "#f59f00",
    features: [
      "Full amenity access",
      "Advanced booking",
      "Intermediate space",
    ],
    featured: true,
  },
  {
    id: "advanced",
    name: "Advanced Plan",
    tagline: "Scaly",
    price: 65,
    icon: "🚀",
    color: "#0d3d56",
    accent: "#00c9a7",
    dark: true,
    features: [
      "Premium support",
      "All features",
      "Maximum space",
      "Private office access",
      "AV Equipment incl.",
    ],
    featured: false,
  },
];

// ─── Peak Chart (SVG) ─────────────────────────────────────────────────────────

function PeakChart() {
  return (
    <svg viewBox="0 0 120 50" className="peak-chart" aria-hidden="true">
      {/* Off-peak curve */}
      <path
        d="M0,45 C20,45 30,10 60,10 C90,10 100,45 120,45"
        fill="none"
        stroke="#5c7cfa"
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M0,45 C20,45 30,10 60,10 C90,10 100,45 120,45 L120,50 L0,50Z"
        fill="#5c7cfa"
        opacity="0.15"
      />
      {/* Peak curve */}
      <path
        d="M10,45 C30,45 40,5 60,5 C80,5 90,45 110,45"
        fill="none"
        stroke="#f59f00"
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        d="M10,45 C30,45 40,5 60,5 C80,5 90,45 110,45 L110,50 L10,50Z"
        fill="#f59f00"
        opacity="0.2"
      />
      <text x="10" y="49" fontSize="6" fill="#888">
        Peak
      </text>
      <text x="85" y="49" fontSize="6" fill="#888">
        Peak
      </text>
    </svg>
  );
}

// ─── Price Calculator ─────────────────────────────────────────────────────────

function PriceCalculator() {
  const [selectedRoom, setSelectedRoom] = useState(ROOM_TYPES[0]);
  const [hours, setHours] = useState(1);
  const [addons, setAddons] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addonTotal = ADDONS.reduce(
    (acc, a) => acc + (addons[a.id] ? a.price : 0),
    0
  );
  const total = selectedRoom.baseRate + addonTotal;

  const toggleAddon = (id) =>
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="calculator-section">
      <div className="section-header">
        <h2 className="section-title">Price Calculator</h2>
        <p className="section-subtitle">Calculadora de Precios</p>
      </div>

      {/* Room visual banner */}
      <div className="room-banner">
        <div className="room-icon-step">
          <span className="room-step-icon">📐</span>
          <span className="room-step-label">Square footage</span>
        </div>
        <span className="arrow">→</span>
        <div className="room-icon-step">
          <span className="room-step-icon">🪟</span>
          <span className="room-step-label">Window size (28")</span>
        </div>
        <span className="plus">+</span>
        <div className="room-icon-step">
          <span className="room-step-icon">☕</span>
          <span className="room-step-label">Amenities (womeanisx)</span>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-grid">
        {/* Room Type */}
        <div className="control-group">
          <label className="control-label">Room Type</label>
          <div className="dropdown-wrapper">
            <button
              className="dropdown-btn"
              onClick={() => setDropdownOpen((o) => !o)}
            >
              <span>{selectedRoom.icon} {selectedRoom.label}</span>
              <span className="chevron">{dropdownOpen ? "▲" : "▼"}</span>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-list">
                {ROOM_TYPES.map((r) => (
                  <li
                    key={r.id}
                    className={`dropdown-item ${r.id === selectedRoom.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedRoom(r);
                      setDropdownOpen(false);
                    }}
                  >
                    {r.icon} {r.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="control-group">
          <label className="control-label">Duration (Hours)</label>
          <div className="stepper">
            <button
              className="stepper-btn"
              onClick={() => setHours((h) => Math.max(1, h - 1))}
            >
              −
            </button>
            <span className="stepper-value">{hours}</span>
            <button
              className="stepper-btn"
              onClick={() => setHours((h) => h + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Add-ons */}
        <div className="control-group">
          <label className="control-label">Add-ons</label>
          <div className="addons-list">
            {ADDONS.map((a) => (
              <label key={a.id} className="addon-toggle">
                <span>{a.icon} {a.label}</span>
                <div
                  className={`toggle ${addons[a.id] ? "on" : ""}`}
                  onClick={() => toggleAddon(a.id)}
                >
                  <div className="toggle-thumb" />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Peak chart */}
        <div className="control-group">
          <label className="control-label">Peak vs. Off-Peak Hours</label>
          <div className="peak-legend">
            <span className="legend-dot peak" /> Peak
            <span className="legend-dot off" style={{ marginLeft: 12 }} /> Off
          </div>
          <PeakChart />
        </div>
      </div>

      {/* Total bar */}
      <div className="total-bar">
        <div className="total-main">
          <span className="total-label">Total</span>
          <span className="total-price">${total.toFixed(2)}<span className="per-hour"> / hour</span></span>
        </div>
        <div className="total-breakdown">
          <div className="breakdown-item">
            <span className="bd-label">Base Rate</span>
            <span className="bd-value">${selectedRoom.baseRate.toFixed(2)}</span>
          </div>
          <span className="bd-op">+</span>
          <div className="breakdown-item">
            <span className="bd-label">Add-ons</span>
            <span className="bd-value accent">${addonTotal.toFixed(2)}</span>
          </div>
          <span className="bd-op">×</span>
          <div className="breakdown-item">
            <span className="bd-label">Duration</span>
            <span className="bd-value accent">${(total * hours).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Suggested Packages */}
      <div className="packages-section">
        <h3 className="packages-title">Suggested Packages</h3>
        <div className="packages-grid">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.label}
              className="package-card"
              style={{ background: pkg.color }}
            >
              <span className="pkg-icon">📦</span>
              <p className="pkg-label">{pkg.label} ({pkg.hours} hrs)</p>
              <p className="pkg-price">
                ${(selectedRoom.baseRate * pkg.hours * pkg.multiplier).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Subscription Plans ───────────────────────────────────────────────────────

function SubscriptionPlans() {
  return (
    <section className="plans-section">
      <div className="section-header">
        <h2 className="section-title">Subscription Plans</h2>
        <p className="section-subtitle">Planes de Suscripción</p>
      </div>

      <div className="plans-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.featured ? "featured" : ""} ${plan.dark ? "dark" : ""}`}
            style={{
              background: plan.dark ? plan.color : plan.color,
              "--accent": plan.accent,
            }}
          >
            {plan.featured && (
              <div className="featured-badge">
                <span>Most Popular / Más Popular</span>
              </div>
            )}
            <div className="plan-icon">{plan.icon}</div>
            <h3 className="plan-name" style={{ color: plan.dark ? "#fff" : "#1a1a2e" }}>
              {plan.name}
            </h3>
            <div className="plan-price">
              <span className="price-amount" style={{ color: plan.dark ? "#fff" : "#1a1a2e" }}>
                ${plan.price}
              </span>
              <span className="price-period" style={{ color: plan.dark ? "#aaa" : "#666" }}>
                /month
              </span>
            </div>
            <p className="plan-tagline" style={{ color: plan.dark ? "#ccc" : "#555" }}>
              {plan.tagline}
            </p>
            <ul className="plan-features">
              {plan.features.map((f) => (
                <li key={f} style={{ color: plan.dark ? "#ddd" : "#333" }}>
                  <span className="check" style={{ color: plan.accent }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className="plan-btn"
              style={{
                background: plan.accent,
                color: "#fff",
              }}
            >
              Sign up
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Pricing() {
  return (
    <>
      <style>{`
        /* ── Reset & Tokens ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pricing-page {
          font-family: 'Nunito', 'Segoe UI', sans-serif;
          background: #f4f6fa;
          min-height: 100vh;
          color: #1a1a2e;
        }

        /* ── Section Headers ── */
        .section-header { text-align: center; margin-bottom: 2rem; }
        .section-title  { font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; }
        .section-subtitle { font-size: 0.9rem; color: #888; margin-top: 0.25rem; }

        /* ── Calculator Section ── */
        .calculator-section {
          max-width: 820px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        /* Room Banner */
        .room-banner {
          background: linear-gradient(135deg, #d4a76a 0%, #c8935a 100%);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .room-icon-step {
          display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.25);
          border-radius: 12px; padding: 0.75rem 1.25rem;
          gap: 0.4rem;
        }
        .room-step-icon  { font-size: 1.8rem; }
        .room-step-label { font-size: 0.72rem; color: #fff; font-weight: 600; text-align: center; }
        .arrow, .plus { font-size: 1.4rem; color: rgba(255,255,255,0.8); font-weight: 700; }

        /* Controls Grid */
        .controls-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 600px) { .controls-grid { grid-template-columns: 1fr; } }

        .control-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .control-label { font-size: 0.8rem; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 0.5px; }

        /* Dropdown */
        .dropdown-wrapper { position: relative; }
        .dropdown-btn {
          width: 100%; background: #1a6b5e; color: #fff;
          border: none; border-radius: 10px; padding: 0.65rem 1rem;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
        }
        .chevron { font-size: 0.7rem; opacity: 0.8; }
        .dropdown-list {
          position: absolute; top: calc(100% + 4px); left: 0; right: 0;
          background: #fff; border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          list-style: none; z-index: 100; overflow: hidden;
        }
        .dropdown-item {
          padding: 0.65rem 1rem; cursor: pointer; font-size: 0.9rem;
          transition: background 0.15s;
        }
        .dropdown-item:hover { background: #f0faf8; }
        .dropdown-item.active { background: #e6f7f4; font-weight: 700; }

        /* Stepper */
        .stepper {
          display: flex; align-items: center; gap: 0.75rem;
          background: #fff; border-radius: 10px; padding: 0.5rem 0.75rem;
          width: fit-content; border: 1px solid #e2e8f0;
        }
        .stepper-btn {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid #e2e8f0; background: #f8fafc;
          font-size: 1.1rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .stepper-btn:hover { background: #e2e8f0; }
        .stepper-value { font-size: 1.1rem; font-weight: 700; min-width: 24px; text-align: center; }

        /* Add-ons toggles */
        .addons-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .addon-toggle {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border-radius: 10px; padding: 0.55rem 0.85rem;
          font-size: 0.9rem; font-weight: 500; cursor: pointer;
          border: 1px solid #e2e8f0;
        }
        .toggle {
          width: 42px; height: 24px; border-radius: 12px;
          background: #e2e8f0; position: relative; transition: background 0.2s; cursor: pointer;
        }
        .toggle.on { background: #1a6b5e; }
        .toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 18px; height: 18px; border-radius: 50%; background: #fff;
          transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .toggle.on .toggle-thumb { transform: translateX(18px); }

        /* Peak chart */
        .peak-legend { display: flex; align-items: center; font-size: 0.8rem; margin-bottom: 0.25rem; }
        .legend-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
        .legend-dot.peak { background: #f59f00; }
        .legend-dot.off  { background: #5c7cfa; }
        .peak-chart { width: 100%; max-width: 200px; }

        /* Total Bar */
        .total-bar {
          background: #fff; border-radius: 14px;
          padding: 1.25rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          margin-bottom: 2rem;
        }
        .total-label  { font-size: 0.8rem; color: #888; font-weight: 600; text-transform: uppercase; }
        .total-price  { font-size: 2rem; font-weight: 800; color: #1a1a2e; }
        .per-hour     { font-size: 0.9rem; font-weight: 500; color: #888; }
        .total-breakdown { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .breakdown-item { display: flex; flex-direction: column; }
        .bd-label  { font-size: 0.72rem; color: #aaa; font-weight: 600; text-transform: uppercase; }
        .bd-value  { font-size: 1rem; font-weight: 700; color: #1a1a2e; }
        .bd-value.accent { color: #f59f00; }
        .bd-op     { font-size: 1.2rem; color: #ccc; font-weight: 700; }

        /* Packages */
        .packages-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; }
        .packages-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 600px) { .packages-grid { grid-template-columns: 1fr; } }

        .package-card {
          border-radius: 14px; padding: 1.25rem;
          display: flex; flex-direction: column; gap: 0.4rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .pkg-icon  { font-size: 1.5rem; }
        .pkg-label { font-size: 0.85rem; font-weight: 600; color: #444; }
        .pkg-price { font-size: 1.4rem; font-weight: 800; color: #1a1a2e; }

        /* ── Plans Section ── */
        .plans-section {
          background: #eef2ff;
          padding: 3rem 1.5rem;
        }
        .plans-grid {
          max-width: 1000px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 860px) { .plans-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .plans-grid { grid-template-columns: 1fr; } }

        .plan-card {
          border-radius: 20px; padding: 1.75rem 1.25rem;
          display: flex; flex-direction: column; gap: 0.75rem;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .plan-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
        .plan-card.featured {
          border: 3px solid var(--accent);
          transform: scale(1.03);
        }
        .plan-card.featured:hover { transform: scale(1.03) translateY(-4px); }

        .featured-badge {
          background: var(--accent); color: #fff;
          font-size: 0.7rem; font-weight: 700; text-align: center;
          padding: 0.35rem 0.5rem; border-radius: 8px;
          letter-spacing: 0.3px;
        }
        .plan-icon  { font-size: 2rem; }
        .plan-name  { font-size: 1rem; font-weight: 800; }
        .plan-price { display: flex; align-items: baseline; gap: 0.1rem; }
        .price-amount { font-size: 2rem; font-weight: 900; }
        .price-period { font-size: 0.85rem; }
        .plan-tagline { font-size: 0.8rem; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .plan-features li { font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; }
        .check { font-weight: 700; }

        .plan-btn {
          margin-top: 0.5rem; padding: 0.65rem; border: none; border-radius: 10px;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }
        .plan-btn:hover { opacity: 0.88; transform: scale(0.98); }
      `}</style>

      <div className="pricing-page">
        <PriceCalculator />
        <SubscriptionPlans />
      </div>
    </>
  );
}
