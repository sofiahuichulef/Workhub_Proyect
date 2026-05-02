import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import espaciosRouter from './routes/espacios.routes.js';
import reservasRoutes from './routes/reservas.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import validateReserva from './middlewares/validateReserva.js';

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

app.use(notFound);
app.use(errorHandler);
app.use(validateReserva);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});