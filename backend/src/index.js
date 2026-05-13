import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import espaciosRouter from './routes/espacios.routes.js';
import reservasRouter from './routes/reservas.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';

dotenv.config();

// Conectar a MongoDB antes de levantar el servidor
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Rutas
app.use('/espacios', espaciosRouter);
app.use('/reservas', reservasRouter);
app.use('/usuarios', usuariosRouter);

// Middlewares de error (siempre al final)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
