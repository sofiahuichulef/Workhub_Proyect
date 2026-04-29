import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import espaciosRouter from './routes/espacios.routes.js';
import reservasRoutes from './routes/reservas.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/reservas', reservasRoutes);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use('/espacios', espaciosRouter);

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});