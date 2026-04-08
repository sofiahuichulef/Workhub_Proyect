import React from 'react';
// 1. Importamos todos los componentes (Agregamos el Hero)
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import Hero from './components/Hero'; // <--- ESTE IMPORT TE FALTABA

function App() {
  return (
    <>
      {/* 2. El Navbar arriba de todo */}
      <Navbar />

      {/* 3. El Hero va justo después del Navbar */}
      {/* Ya no necesitamos el marginTop de 100px aquí porque el Hero lo maneja en su CSS */}
      <Hero />

      {/* 4. El contenido principal (Main) */}
      {/* Bajamos un poco el minHeight para que las secciones respiren */}
      <main style={{ minHeight: '40vh' }} className="container text-center my-5">
        <h2 className="display-5 fw-bold text-primary">Nuestros Servicios</h2>
        <p className="lead text-muted">Todo lo que necesitas para que tu proyecto despegue.</p>
        
        <div className="py-4">
           <button className="btn btn-success btn-lg shadow">Ver Disponibilidad 🚀</button>
        </div>
      </main>

      {/* 5. El Footer al final */}
      <Footer />
    </>
  );
}

export default App;