import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Pricing.css';

// ── Hook animación ───────────────────────────────
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

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`pricing-fade pricing-fade--${direction} ${inView ? 'pricing-fade--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ── Data ─────────────────────────────────────────
const ROOM_TYPES = [
  { id: 'hot-desk',       label: 'Hot Desk',       baseRate: 52,  icon: '🪑' },
  { id: 'private-office', label: 'Private Office',  baseRate: 85,  icon: '🚪' },
  { id: 'meeting-room',   label: 'Meeting Room',    baseRate: 120, icon: '🗣️' },
];

const ADDONS = [
  { id: 'coffee', label: 'Coffee Service', price: 8,  icon: '☕' },
  { id: 'av',     label: 'AV Equipment',   price: 15, icon: '📽️' },
];

const PACKAGES = [
  { label: 'Meeting Package', hours: 10, multiplier: 0.8,  icon: '🤝', color: 'var(--color-blue-soft)',  accent: 'var(--color-primary)' },
  { label: 'Focus Day',       hours: 5,  multiplier: 0.85, icon: '🎯', color: '#ede9fe',                  accent: '#7c3aed' },
  { label: 'Group Work',      hours: 3,  multiplier: 0.9,  icon: '👥', color: '#fef3c7',                  accent: '#d97706' },
];

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    tagline: 'Perfect to get started',
    price: 0,
    icon: '🌱',
    accent: '#10b981',
    accentBg: '#d1fae5',
    features: ['1 hot desk / day', 'Community access', 'Basic WiFi', 'Kitchen access'],
    featured: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'For growing freelancers',
    price: 15,
    icon: '📈',
    accent: '#1D76E2',
    accentBg: '#dbeafe',
    features: ['5 hot desks / month', 'All amenities', 'High-speed WiFi', 'Printing included', 'Member events'],
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Most popular choice',
    price: 35,
    icon: '⚡',
    accent: '#f59e0b',
    accentBg: '#fef3c7',
    features: ['Unlimited hot desks', 'Meeting room (4h/mo)', 'Priority booking', 'Lounge access', 'Coffee included', 'Guest passes (2/mo)'],
    featured: true,
  },
  {
    id: 'advanced',
    name: 'Enterprise',
    tagline: 'For teams that mean business',
    price: 65,
    icon: '🚀',
    accent: '#00c9a7',
    accentBg: '#ccfbf1',
    features: ['Private office access', 'Unlimited meeting rooms', 'Dedicated desk', 'AV equipment incl.', 'Premium support', 'Custom invoicing'],
    featured: false,
  },
];

// ── Calculadora ──────────────────────────────────
function PriceCalculator() {
  const [selectedRoom, setSelectedRoom] = useState(ROOM_TYPES[0]);
  const [hours, setHours]               = useState(2);
  const [addons, setAddons]             = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addonTotal = ADDONS.reduce((acc, a) => acc + (addons[a.id] ? a.price : 0), 0);
  const baseTotal  = selectedRoom.baseRate + addonTotal;
  const grandTotal = baseTotal * hours;

  const toggleAddon = (id) => setAddons(p => ({ ...p, [id]: !p[id] }));

  return (
    <section className="pricing-calc">
      <FadeIn direction="up" className="pricing-section-header">
        <span className="pricing-tag">Interactive tool</span>
        <h2 className="pricing-section-title">Price Calculator</h2>
        <p className="pricing-section-sub">
          Configure your ideal workspace and see the cost in real time.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.1} className="pricing-calc__card">
        <div className="pricing-calc__grid">

          {/* Room type */}
          <div className="pricing-ctrl">
            <label className="pricing-ctrl__label">Space type</label>
            <div className="pricing-dropdown">
              <button
                className="pricing-dropdown__btn"
                onClick={() => setDropdownOpen(o => !o)}
              >
                <span>{selectedRoom.icon} {selectedRoom.label}</span>
                <span className="pricing-dropdown__chevron">{dropdownOpen ? '▲' : '▼'}</span>
              </button>
              {dropdownOpen && (
                <ul className="pricing-dropdown__list">
                  {ROOM_TYPES.map(r => (
                    <li
                      key={r.id}
                      className={`pricing-dropdown__item ${r.id === selectedRoom.id ? 'active' : ''}`}
                      onClick={() => { setSelectedRoom(r); setDropdownOpen(false); }}
                    >
                      {r.icon} {r.label}
                      <span className="pricing-dropdown__rate">${r.baseRate}/hr</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Duration */}
          <div className="pricing-ctrl">
            <label className="pricing-ctrl__label">Duration (hours)</label>
            <div className="pricing-stepper">
              <button className="pricing-stepper__btn" onClick={() => setHours(h => Math.max(1, h - 1))}>−</button>
              <div className="pricing-stepper__display">
                <span className="pricing-stepper__value">{hours}</span>
                <span className="pricing-stepper__unit">hrs</span>
              </div>
              <button className="pricing-stepper__btn" onClick={() => setHours(h => Math.min(24, h + 1))}>+</button>
            </div>
          </div>

          {/* Add-ons */}
          <div className="pricing-ctrl pricing-ctrl--full">
            <label className="pricing-ctrl__label">Add-ons</label>
            <div className="pricing-addons">
              {ADDONS.map(a => (
                <button
                  key={a.id}
                  className={`pricing-addon ${addons[a.id] ? 'pricing-addon--on' : ''}`}
                  onClick={() => toggleAddon(a.id)}
                >
                  <span className="pricing-addon__icon">{a.icon}</span>
                  <span className="pricing-addon__label">{a.label}</span>
                  <span className="pricing-addon__price">+${a.price}</span>
                  <span className="pricing-addon__check">{addons[a.id] ? '✓' : '+'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="pricing-total">
          <div className="pricing-total__breakdown">
            <div className="pricing-total__row">
              <span>Base rate ({selectedRoom.label})</span>
              <span>${selectedRoom.baseRate}/hr</span>
            </div>
            {ADDONS.filter(a => addons[a.id]).map(a => (
              <div key={a.id} className="pricing-total__row">
                <span>{a.icon} {a.label}</span>
                <span>+${a.price}/hr</span>
              </div>
            ))}
            <div className="pricing-total__row">
              <span>Duration</span>
              <span>× {hours} hrs</span>
            </div>
          </div>
          <div className="pricing-total__result">
            <span className="pricing-total__label">Estimated total</span>
            <span className="pricing-total__amount">${grandTotal.toFixed(2)}</span>
          </div>
          <Link to="/spaces" className="pricing-total__btn">Book this space →</Link>
        </div>
      </FadeIn>

      {/* Packages */}
      <FadeIn direction="up" delay={0.15} className="pricing-packages">
        <h3 className="pricing-packages__title">Suggested packages</h3>
        <div className="pricing-packages__grid">
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.08} className="pricing-pkg">
              <div className="pricing-pkg__icon" style={{ background: pkg.color, color: pkg.accent }}>
                {pkg.icon}
              </div>
              <div className="pricing-pkg__body">
                <p className="pricing-pkg__name">{pkg.label}</p>
                <p className="pricing-pkg__hours">{pkg.hours} hours · {Math.round((1 - pkg.multiplier) * 100)}% off</p>
              </div>
              <span className="pricing-pkg__price" style={{ color: pkg.accent }}>
                ${(selectedRoom.baseRate * pkg.hours * pkg.multiplier).toFixed(2)}
              </span>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ── Planes ───────────────────────────────────────
function SubscriptionPlans() {
  return (
    <section className="pricing-plans">
      <FadeIn direction="up" className="pricing-section-header">
        <span className="pricing-tag">Memberships</span>
        <h2 className="pricing-section-title">Choose your plan</h2>
        <p className="pricing-section-sub">
          Flexible memberships for freelancers, startups and teams. Cancel anytime.
        </p>
      </FadeIn>

      <div className="pricing-plans__grid">
        {PLANS.map((plan, i) => (
          <FadeIn key={plan.id} direction="up" delay={i * 0.08}
            className={`pricing-plan ${plan.featured ? 'pricing-plan--featured' : ''}`}
            style={{ '--accent': plan.accent }}
          >
            {plan.featured && (
              <div className="pricing-plan__badge" style={{ background: plan.accent }}>
                ⭐ Most Popular
              </div>
            )}
            <div className="pricing-plan__icon" style={{ background: plan.accentBg }}>
              {plan.icon}
            </div>
            <h3 className="pricing-plan__name">{plan.name}</h3>
            <p className="pricing-plan__tagline">{plan.tagline}</p>
            <div className="pricing-plan__price">
              <span className="pricing-plan__amount">${plan.price}</span>
              <span className="pricing-plan__period">/month</span>
            </div>
            <ul className="pricing-plan__features">
              {plan.features.map((f, j) => (
                <li key={j}>
                  <span className="pricing-plan__check" style={{ color: plan.accent }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/login"
              className="pricing-plan__btn"
              style={{ background: plan.accent }}
            >
              Get started
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────
const FAQS = [
  { q: 'Can I cancel my plan anytime?',         a: 'Yes, all plans are month-to-month. You can cancel or upgrade at any time from your account settings.' },
  { q: 'Do unused hours roll over?',             a: 'Meeting room hours do not roll over, but hot desk days are available throughout the calendar month.' },
  { q: 'Can I bring guests?',                    a: 'Pro and Enterprise plans include guest passes. Starter and Basic members can purchase day passes for guests.' },
  { q: 'Is there a setup fee?',                  a: 'No setup fees, ever. You only pay your monthly membership. Your first day is always on us.' },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="pricing-faq">
      <FadeIn direction="up" className="pricing-section-header">
        <span className="pricing-tag">Got questions?</span>
        <h2 className="pricing-section-title">Frequently asked questions</h2>
      </FadeIn>
      <div className="pricing-faq__list">
        {FAQS.map((faq, i) => (
          <FadeIn key={i} direction="up" delay={i * 0.06} className="pricing-faq__item">
            <button
              className={`pricing-faq__q ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
              <span className="pricing-faq__arrow">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="pricing-faq__a">{faq.a}</p>}
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Página principal ─────────────────────────────
export default function Pricing() {
  const heroRef  = useRef(null);
  const heroInView = useInView(heroRef, 0.1);

  return (
    <>
      <div className="pricing-page">

        {/* HERO */}
        <section className="pricing-hero" ref={heroRef}>
          <div className="pricing-hero__overlay" />
          <div className={`pricing-hero__content ${heroInView ? 'pricing-hero__content--visible' : ''}`}>
            <span className="pricing-hero__eyebrow">Transparent pricing</span>
            <h1 className="pricing-hero__title">
              Pay only for what<br />you actually use
            </h1>
            <p className="pricing-hero__sub">
              No hidden fees. No lock-in contracts. Just flexible workspace
              that scales with you.
            </p>
            <div className="pricing-hero__btns">
              <a href="#plans" className="about-btn-primary">See plans</a>
              <a href="#calculator" className="about-btn-outline">Try calculator</a>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <div id="calculator">
          <PriceCalculator />
        </div>

        {/* PLANS */}
        <div id="plans">
          <SubscriptionPlans />
        </div>

        {/* FAQ */}
        <FAQ />

        {/* CTA */}
        <section className="pricing-cta">
          <FadeIn direction="up">
            <div className="pricing-cta__box">
              <h2>Not sure which plan fits you?</h2>
              <p>Book a free tour and our team will help you find the perfect setup.</p>
              <div className="pricing-cta__btns">
                <Link to="/spaces"    className="about-btn-primary">Browse spaces</Link>
                <Link to="/amenities" className="about-btn-outline">See amenities</Link>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>
      <Footer />
    </>
  );
}
