import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Spaces from './pages/Spaces';
import Reserva from './pages/Reserva';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';
import Amenities from './pages/Amenities';
import About from  './pages/About';
import './styles/global.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      localStorage.setItem('theme', nextTheme);
      setTheme(nextTheme);
    };

    if (!document.startViewTransition) {
      applyTheme();
    } else {
      document.startViewTransition(applyTheme);
    }
  };

  return (
    <BrowserRouter>
      <Navbar theme={theme} onToggleTheme={switchTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/reserva/:espacioId" element={<Reserva />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
