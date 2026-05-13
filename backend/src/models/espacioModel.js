import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Modelo Espacio
 * Representa un espacio reservable dentro del coworking
 * (sala de reunión, escritorio, oficina, open space, etc.)
 */
const espacioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del espacio es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
      maxlength: [100, 'El nombre no puede superar los 100 caracteres'],
    },
    tipo: {
      type: String,
      required: [true, 'El tipo de espacio es obligatorio'],
      enum: {
        values: ['sala_reunion', 'escritorio', 'oficina', 'open_space'],
        message: 'Tipo inválido. Debe ser: sala_reunion, escritorio, oficina u open_space',
      },
    },
    capacidad: {
      type: Number,
      required: [true, 'La capacidad es obligatoria'],
      min: [1, 'La capacidad mínima es 1'],
      max: [100, 'La capacidad máxima es 100'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede superar los 500 caracteres'],
      default: '',
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    imagen: {
      type: String,
      trim: true,
      default: '',
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

const Espacio = mongoose.model('Espacio', espacioSchema);

export default Espacio;
