import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    company: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword]     = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [agreed, setAgreed]                 = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8)            score++;
    if (/[A-Z]/.test(pwd))         score++;
    if (/[0-9]/.test(pwd))         score++;
    if (/[^A-Za-z0-9]/.test(pwd))  score++;
    return score;
  };

  const strength      = getStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strength];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      alert('Please complete all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!agreed) {
      alert('Please accept the Terms of Service.');
      return;
    }
    alert('Account created successfully! Welcome to CoWork Hub!');
  };

  return (
    <>
      <div className="reg-page-wrapper">
        <div className="reg-split">

          {/* Panel izquierdo – solo desktop */}
          <div className="reg-coworking-side">
            <div className="reg-overlay" />
            <div className="reg-side-card">
              <h2>Join CoWork Hub</h2>
              <p>The place where ideas connect and projects come to life. Book desks, private offices and meeting rooms today.</p>
              <div className="reg-side-stats">
                <div><strong>10K+</strong><span>Members</span></div>
                <div><strong>25+</strong><span>Locations</span></div>
                <div><strong>99%</strong><span>Satisfaction</span></div>
              </div>
            </div>
          </div>

          {/* Panel derecho – formulario */}
          <div className="reg-form-side">
            <div className="reg-form-container">
              <div className="reg-hero">
                <h1>Create Account</h1>
                <p>Fill in your details to get started with CoWork Hub.</p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Nombre + Apellido */}
                <div className="reg-row">
                  <div className="reg-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Alex"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="reg-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Johnson"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="reg-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="reg-input-wrap">
                    <span className="reg-icon">✉</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Empresa */}
                <div className="reg-group">
                  <label htmlFor="company">Company <span className="reg-optional">(optional)</span></label>
                  <div className="reg-input-wrap">
                    <span className="reg-icon">🏢</span>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="reg-group">
                  <label htmlFor="password">Password *</label>
                  <div className="reg-input-wrap">
                    <span className="reg-icon">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button type="button" className="reg-eye" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? '🙈' : '👁'}
                    </button>
                  </div>
                  {/* Barra de fortaleza */}
                  {form.password.length > 0 && (
                    <div className="reg-strength">
                      <div className="reg-strength-bars">
                        {[1,2,3,4].map(n => (
                          <div
                            key={n}
                            className="reg-strength-bar"
                            style={{ background: n <= strength ? strengthColor : '#e2e8f0' }}
                          />
                        ))}
                      </div>
                      <span style={{ color: strengthColor }}>{strengthLabel}</span>
                    </div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div className="reg-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="reg-input-wrap">
                    <span className="reg-icon">🔒</span>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    <button type="button" className="reg-eye" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? '🙈' : '👁'}
                    </button>
                  </div>
                  {form.confirmPassword.length > 0 && form.password !== form.confirmPassword && (
                    <p className="reg-mismatch">Passwords do not match</p>
                  )}
                </div>

                {/* Términos */}
                <div className="reg-terms">
                  <input
                    type="checkbox"
                    id="agreed"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="agreed">
                    I agree to the <Link to="/legal">Terms of Service</Link> and Privacy Policy
                  </label>
                </div>

                <button type="submit" className="reg-submit-btn">Create Account</button>
              </form>

              <div className="reg-divider"><span>OR CONTINUE WITH</span></div>

              <div className="reg-social">
                <button className="reg-google-btn">G&nbsp;&nbsp;Google</button>
                <button className="reg-github-btn">⬡&nbsp;&nbsp;GitHub</button>
              </div>

              <div className="reg-signin">
                <span>Already have an account?</span>
                <Link to="/login">Sign in</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}