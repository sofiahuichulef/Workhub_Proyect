import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './About.css';

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
const stats = [
  { value: '2019', label: 'Founded' },
  { value: '5K+',  label: 'Members' },
  { value: '12',   label: 'Locations' },
  { value: '98%',  label: 'Satisfaction' },
];

const team = [
  {
    name: 'Sofía Ramírez',
    role: 'CEO & Co-Founder',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'Passionate about building spaces where people do their best work.',
  },
  {
    name: 'Matías Soto',
    role: 'Head of Community',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    bio: 'Connects members and fosters a thriving professional community.',
  },
  {
    name: 'Valentina Torres',
    role: 'Head of Design',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    bio: 'Designs spaces and experiences that inspire creativity every day.',
  },
  {
    name: 'Diego Herrera',
    role: 'Head of Technology',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    bio: 'Ensures our infrastructure is seamless so members can focus on work.',
  },
];

const values = [
  { icon: '🤝', title: 'Community First',    desc: 'We believe great work happens when people connect. Everything we do is designed to bring professionals together.' },
  { icon: '✨', title: 'Quality Spaces',      desc: 'From ergonomic chairs to fiber internet — every detail is curated so you can do your best work.' },
  { icon: '🌱', title: 'Sustainable Future', desc: 'We are committed to eco-friendly spaces, reducing waste and supporting green initiatives in all our locations.' },
  { icon: '🔓', title: 'Accessibility',       desc: 'Flexible plans for freelancers, startups and enterprises. Great workspace should be available to everyone.' },
  { icon: '💡', title: 'Innovation',          desc: 'We continuously evolve our spaces and services based on member feedback to stay ahead of the curve.' },
  { icon: '❤️', title: 'Member Wellbeing',   desc: 'Lounges, coffee, games, wellness rooms — because we care about the whole person, not just the worker.' },
];

const milestones = [
  { year: '2019', title: 'Founded in Santiago',       desc: 'WorkHub opened its first location with 50 desks and a dream to change how people work.' },
  { year: '2020', title: 'Survived the pandemic',      desc: 'We adapted quickly, offering hybrid memberships and virtual community events to keep members connected.' },
  { year: '2021', title: 'Expanded to 5 locations',   desc: 'Demand surged as remote work became the norm. We grew to serve thousands of professionals.' },
  { year: '2023', title: 'Reached 5,000 members',     desc: 'A milestone that showed us the power of community. Our members are our greatest achievement.' },
  { year: '2025', title: '12 locations & counting',   desc: 'Now across Chile with plans to expand regionally, bringing the WorkHub experience to more cities.' },
];

// ── Subcomponentes animados ───────────────────────
function FadeSection({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`fade-section fade-section--${direction} ${inView ? 'fade-section--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ── Página ───────────────────────────────────────
export default function About() {
  const statsRef  = useRef(null);
  const statsInView = useInView(statsRef, 0.2);

  return (
    <>
      <div className="about-page">

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="about-hero__overlay" />
          <div className="about-hero__content">
            <FadeSection direction="up">
              <span className="about-hero__eyebrow">About WorkHub</span>
              <h1 className="about-hero__title">
                More than a workspace.<br />A community.
              </h1>
              <p className="about-hero__subtitle">
                We started with a simple belief: people do their best work
                when they're surrounded by the right environment, the right
                tools, and the right people.
              </p>
              <div className="about-hero__btns">
                <Link to="/spaces" className="about-btn-primary">Explore spaces</Link>
                <Link to="/amenities" className="about-btn-outline">Our amenities</Link>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="about-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={`about-stat ${statsInView ? 'about-stat--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="about-stat__value">{s.value}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── MISSION ── */}
        <section className="about-mission">
          <FadeSection direction="left" className="about-mission__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
              alt="WorkHub team"
              className="about-mission__img"
            />
          </FadeSection>
          <FadeSection direction="right" className="about-mission__text" delay={0.1}>
            <span className="about-section-tag">Our Mission</span>
            <h2 className="about-section-title">
              Empowering professionals<br />to work without limits
            </h2>
            <p className="about-section-desc">
              WorkHub was born from the idea that the traditional office was
              broken. Too rigid, too expensive, too isolating. We set out to
              create spaces that adapt to the way people actually work today —
              flexible, collaborative, and inspiring.
            </p>
            <p className="about-section-desc">
              Whether you're a freelancer looking for focus, a startup building
              a product, or a team that needs room to grow — WorkHub is your
              home base.
            </p>
            <Link to="/spaces" className="about-btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
              Find your space →
            </Link>
          </FadeSection>
        </section>

        {/* ── VALUES ── */}
        <section className="about-values">
          <FadeSection direction="up" className="about-values__header">
            <span className="about-section-tag">What we stand for</span>
            <h2 className="about-section-title">Our values</h2>
            <p className="about-section-desc" style={{ maxWidth: 520, margin: '0 auto' }}>
              Every decision we make comes back to these six principles.
            </p>
          </FadeSection>

          <div className="about-values__grid">
            {values.map((v, i) => (
              <FadeSection key={i} direction="up" delay={i * 0.07} className="about-value-card">
                <div className="about-value-card__icon">{v.icon}</div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="about-timeline">
          <FadeSection direction="up" className="about-timeline__header">
            <span className="about-section-tag">Our journey</span>
            <h2 className="about-section-title">How we got here</h2>
          </FadeSection>

          <div className="about-timeline__track">
            {milestones.map((m, i) => (
              <FadeSection
                key={i}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.1}
                className="about-milestone"
              >
                <div className="about-milestone__year">{m.year}</div>
                <div className="about-milestone__body">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="about-team">
          <FadeSection direction="up" className="about-team__header">
            <span className="about-section-tag">The people behind WorkHub</span>
            <h2 className="about-section-title">Meet our team</h2>
            <p className="about-section-desc" style={{ maxWidth: 480, margin: '0 auto' }}>
              A diverse group of builders, designers and community-lovers
              united by a passion for great work environments.
            </p>
          </FadeSection>

          <div className="about-team__grid">
            {team.map((member, i) => (
              <FadeSection key={i} direction="up" delay={i * 0.1} className="about-team-card">
                <div className="about-team-card__img-wrap">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="about-team-card__body">
                  <h3 className="about-team-card__name">{member.name}</h3>
                  <span className="about-team-card__role">{member.role}</span>
                  <p className="about-team-card__bio">{member.bio}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta">
          <FadeSection direction="up">
            <div className="about-cta__box">
              <h2>Ready to join the community?</h2>
              <p>Thousands of professionals already call WorkHub their home base.</p>
              <div className="about-cta__btns">
                <Link to="/spaces" className="about-btn-primary">Get started today</Link>
                <Link to="/login"  className="about-btn-outline">Create free account</Link>
              </div>
            </div>
          </FadeSection>
        </section>

      </div>
      <Footer />
    </>
  );
}
