import mongoose from 'mongoose';

const { Schema } = mongoose;

// Validador para formato de hora HH:MM (24h)
const HORA_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

/**
 * Modelo Reserva
 * Representa la reserva de un espacio por parte de un usuario.
 * Referencia (relación) a Usuario y Espacio via ObjectId.
 * El populate() se aplica en el controlador al consultar.
 */
const reservaSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'La reserva debe estar asociada a un usuario'],
    },
    espacio: {
      type: Schema.Types.ObjectId,
      ref: 'Espacio',
      required: [true, 'La reserva debe estar asociada a un espacio'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha de la reserva es obligatoria'],
      validate: {
        validator: (v) => v instanceof Date && !Number.isNaN(v.getTime()),
        message: 'La fecha de la reserva no es válida',
      },
    },
    horaInicio: {
      type: String,
      required: [true, 'La hora de inicio es obligatoria'],
      match: [HORA_REGEX, 'La hora de inicio debe tener el formato HH:MM (24h)'],
    },
    horaFin: {
      type: String,
      required: [true, 'La hora de fin es obligatoria'],
      match: [HORA_REGEX, 'La hora de fin debe tener el formato HH:MM (24h)'],
    },
    estado: {
      type: String,
      enum: {
        values: ['pendiente', 'confirmada', 'cancelada', 'completada'],
        message: 'Estado inválido. Debe ser: pendiente, confirmada, cancelada o completada',
      },
      default: 'pendiente',
    },
    notas: {
      type: String,
      trim: true,
      maxlength: [300, 'Las notas no pueden superar los 300 caracteres'],
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

// Validación a nivel de documento: la hora de fin debe ser posterior a la de inicio.
reservaSchema.pre('validate', function () {
  if (this.horaInicio && this.horaFin && this.horaFin <= this.horaInicio) {
    this.invalidate('horaFin', 'La hora de fin debe ser posterior a la hora de inicio');
  }
});

const Reserva = mongoose.model('Reserva', reservaSchema);

export default Reserva;
