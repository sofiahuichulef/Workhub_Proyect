
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage     from './views/HomePage'
import LoginPage    from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import EspaciosPage from './views/EspaciosPage'
import ReservasPage from './views/ReservasPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />}     />
        <Route path="/login"    element={<LoginPage />}    />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/espacios" element={<EspaciosPage />} />
        <Route path="/reservas" element={<ReservasPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
