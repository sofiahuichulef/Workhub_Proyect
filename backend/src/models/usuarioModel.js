import mongoose from 'mongoose';

const { Schema } = mongoose;

// Expresión regular básica para validar emails
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Modelo Usuario
 * Representa al usuario que realiza reservas en el coworking.
 * El email es único: no se permiten usuarios duplicados.
 */
const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del usuario es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [80, 'El nombre no puede superar los 80 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, 'El formato del email no es válido'],
    },
    telefono: {
      type: String,
      trim: true,
      default: '',
      maxlength: [20, 'El teléfono no puede superar los 20 caracteres'],
    },
    rol: {
      type: String,
      enum: {
        values: ['cliente', 'admin'],
        message: 'Rol inválido. Debe ser: cliente o admin',
      },
      default: 'cliente',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
