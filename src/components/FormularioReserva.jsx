import { useState } from 'react'

// Props: espacio (objeto), onConfirmar (fn), onCancelar (fn)
function FormularioReserva({ espacio, onConfirmar, onCancelar }) {
  const [form, setForm] = useState({
    usuario:    '',
    email:      '',
    fecha:      '',
    horaInicio: '',
    horaFin:    ''
  })
  const [errores, setErrores]   = useState({})
  const [enviando, setEnviando] = useState(false)

  // Manejo de cambios (formulario controlado)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpia el error del campo al escribir
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: '' }))
  }

  // Validación
  const validar = () => {
    const nuevosErrores = {}
    if (!form.usuario.trim())    nuevosErrores.usuario    = 'El nombre es obligatorio'
    if (!form.email.includes('@')) nuevosErrores.email    = 'Email inválido'
    if (!form.fecha)             nuevosErrores.fecha       = 'Selecciona una fecha'
    if (!form.horaInicio)        nuevosErrores.horaInicio = 'Indica hora de inicio'
    if (!form.horaFin)           nuevosErrores.horaFin    = 'Indica hora de fin'
    if (form.horaInicio && form.horaFin && form.horaInicio >= form.horaFin) {
      nuevosErrores.horaFin = 'La hora de fin debe ser mayor a la de inicio'
    }
    return nuevosErrores
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresVal = validar()
    if (Object.keys(erroresVal).length > 0) {
      setErrores(erroresVal)
      return
    }

    setEnviando(true)
    const reserva = {
      ...form,
      espacioId:     espacio.id,
      espacioNombre: espacio.nombre
    }
    await onConfirmar(reserva)
    setEnviando(false)
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.titulo}>Reservar: {espacio.nombre}</h2>
        <p style={styles.subtitulo}>
          Precio: <strong style={{ color: '#e94560' }}>
            ${espacio.precio.toLocaleString('es-CL')}/día
          </strong>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <Campo
            label="Nombre completo"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            error={errores.usuario}
            placeholder="Ej: Ana Martínez"
          />
          <Campo
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errores.email}
            placeholder="tu@email.com"
          />
          <Campo
            label="Fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            error={errores.fecha}
          />

          <div style={styles.fila}>
            <Campo
              label="Hora inicio"
              name="horaInicio"
              type="time"
              value={form.horaInicio}
              onChange={handleChange}
              error={errores.horaInicio}
            />
            <Campo
              label="Hora fin"
              name="horaFin"
              type="time"
              value={form.horaFin}
              onChange={handleChange}
              error={errores.horaFin}
            />
          </div>

          <div style={styles.acciones}>
            <button type="button" onClick={onCancelar} style={styles.btnCancelar}>
              Cancelar
            </button>
            <button type="submit" style={styles.btnConfirmar} disabled={enviando}>
              {enviando ? 'Enviando...' : 'Confirmar reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Subcomponente campo reutilizable
function Campo({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div style={{ marginBottom: '1rem', flex: 1 }}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...styles.input,
          borderColor: error ? '#e94560' : '#0f3460'
        }}
      />
      {error && <span style={styles.error}>{error}</span>}
    </div>
  )
}