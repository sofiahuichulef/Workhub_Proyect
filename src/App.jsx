import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Spaces from './pages/Spaces';
import Reserva from './pages/Reserva';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/reserva/:espacioId" element={<Reserva />} />
      </Routes>
    </BrowserRouter>
  );
}
