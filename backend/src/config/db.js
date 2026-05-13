import mongoose from 'mongoose';

/**
 * Conecta la aplicación a MongoDB usando Mongoose.
 * La URI se toma de la variable de entorno MONGO_URI (.env).
 * Soporta tanto Atlas (mongodb+srv://...) como instancia local (mongodb://localhost:27017/workhub).
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está definida en el archivo .env');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de conexión MongoDB:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB desconectado');
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
