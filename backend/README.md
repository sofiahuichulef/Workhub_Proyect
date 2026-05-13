# Workhub — Backend

API REST para la gestión de un espacio de coworking: catálogo de **espacios** reservables, **usuarios** y **reservas** que relacionan ambos.

---

## 📌 Descripción

Este backend expone una API REST construida con **Node.js + Express** y persiste los datos en **MongoDB** a través de **Mongoose**.
Cubre el Sprint 3 del proyecto Workhub: definición del modelo de datos, conexión a base de datos, rutas, controladores, validaciones y operaciones CRUD.

---

## 🛠️ Tecnologías

- **Node.js** (ES Modules)
- **Express 5**
- **MongoDB** (local o Atlas)
- **Mongoose** — ODM, esquemas, validaciones y `populate()`
- **express-validator** — validación de entrada en las rutas
- **dotenv** — variables de entorno
- **cors** — habilitar peticiones desde el frontend

---

## 📂 Estructura del proyecto

```
backend/
├── .env                  # Variables de entorno (NO subir a Git)
├── .env.example          # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── src/
    ├── index.js                          # Punto de entrada del servidor
    ├── seed.js                           # Script para poblar la BD
    ├── config/
    │   └── db.js                         # Conexión a MongoDB
    ├── models/
    │   ├── usuarioModel.js               # Schema Usuario
    │   ├── espacioModel.js               # Schema Espacio
    │   └── reservaModel.js               # Schema Reserva (con referencias)
    ├── controllers/
    │   ├── usuariosController.js
    │   ├── espaciosController.js
    │   └── reservasController.js         # Usa populate()
    ├── routes/
    │   ├── usuarios.routes.js
    │   ├── espacios.routes.js
    │   └── reservas.routes.js
    └── middlewares/
        ├── validateReserva.js            # Validaciones express-validator
        ├── errorHandler.js
        └── notFound.js
```

---

## ⚙️ Instalación y ejecución

### 1. Instalar dependencias

Desde la carpeta `backend/`:

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar el archivo de ejemplo y editarlo:

```bash
cp .env.example .env
```

Editar `.env`:

```env
PORT=3000

# MongoDB local:
MONGO_URI=mongodb://localhost:27017/workhub

# O bien MongoDB Atlas:
# MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/workhub?retryWrites=true&w=majority
```

### 3. Poblar la base de datos (opcional, recomendado la primera vez)

```bash
npm run seed
```

Este script:
- Limpia las colecciones existentes.
- Inserta los **8 espacios** del catálogo original.
- Crea **1 usuario** de ejemplo.
- Crea **1 reserva** que referencia al usuario y a un espacio.

### 4. Levantar el servidor

```bash
npm start        # producción
npm run dev      # desarrollo (con --watch, recarga al modificar archivos)
```

El servidor queda en `http://localhost:3000`.

---

## 🗄️ Modelo de datos

### Usuario

| Campo      | Tipo    | Restricciones                                              |
|------------|---------|------------------------------------------------------------|
| `nombre`   | String  | Requerido, 2–80 caracteres                                  |
| `email`    | String  | Requerido, único, formato email, en minúsculas              |
| `telefono` | String  | Opcional, máx. 20 caracteres                                |
| `rol`      | String  | Enum: `cliente` (default) \| `admin`                        |
| timestamps | —       | `createdAt`, `updatedAt` automáticos                        |

### Espacio

| Campo         | Tipo    | Restricciones                                                                 |
|---------------|---------|--------------------------------------------------------------------------------|
| `nombre`      | String  | Requerido, 3–100 caracteres                                                    |
| `tipo`        | String  | Enum: `sala_reunion` \| `escritorio` \| `oficina` \| `open_space`              |
| `capacidad`   | Number  | Requerido, entre 1 y 100                                                       |
| `precio`      | Number  | Requerido, ≥ 0                                                                 |
| `descripcion` | String  | Opcional, máx. 500 caracteres                                                  |
| `disponible`  | Boolean | Default `true`                                                                 |
| `imagen`      | String  | URL (opcional)                                                                 |
| timestamps    | —       | `createdAt`, `updatedAt`                                                       |

### Reserva (con relaciones)

| Campo        | Tipo                  | Restricciones                                                       |
|--------------|-----------------------|----------------------------------------------------------------------|
| `usuario`    | ObjectId → `Usuario`  | Requerido. **Relación con Usuario**                                  |
| `espacio`    | ObjectId → `Espacio`  | Requerido. **Relación con Espacio**                                  |
| `fecha`      | Date                  | Requerido, fecha válida                                              |
| `horaInicio` | String                | Requerido, formato `HH:MM` (24h)                                     |
| `horaFin`    | String                | Requerido, formato `HH:MM` (24h), **debe ser posterior a horaInicio** |
| `estado`     | String                | Enum: `pendiente` (default) \| `confirmada` \| `cancelada` \| `completada` |
| `notas`      | String                | Opcional, máx. 300 caracteres                                        |
| timestamps   | —                     | `createdAt`, `updatedAt`                                             |

**Relación:** la `Reserva` referencia tanto a `Usuario` como a `Espacio` mediante `ObjectId`.
Las consultas usan `.populate('usuario').populate('espacio')` para devolver los datos completos de ambas entidades en una sola respuesta.

---

## 📡 Endpoints

### Espacios — `/espacios`

| Método | Ruta              | Descripción                          |
|--------|-------------------|--------------------------------------|
| GET    | `/espacios`       | Lista todos los espacios             |
| GET    | `/espacios/:id`   | Obtiene un espacio por ID            |
| POST   | `/espacios`       | Crea un nuevo espacio                |
| PUT    | `/espacios/:id`   | Actualiza un espacio                 |
| DELETE | `/espacios/:id`   | Elimina un espacio                   |

### Usuarios — `/usuarios`

| Método | Ruta              | Descripción                          |
|--------|-------------------|--------------------------------------|
| GET    | `/usuarios`       | Lista todos los usuarios             |
| GET    | `/usuarios/:id`   | Obtiene un usuario por ID            |
| POST   | `/usuarios`       | Crea un nuevo usuario                |
| PUT    | `/usuarios/:id`   | Actualiza un usuario                 |
| DELETE | `/usuarios/:id`   | Elimina un usuario                   |

### Reservas — `/reservas`

| Método | Ruta              | Descripción                                                              |
|--------|-------------------|---------------------------------------------------------------------------|
| GET    | `/reservas`       | Lista todas las reservas **con usuario y espacio populados**              |
| GET    | `/reservas/:id`   | Obtiene una reserva por ID **populada**                                   |
| POST   | `/reservas`       | Crea una reserva (acepta `usuario` por ID o bien `email` + `nombre`)      |
| PUT    | `/reservas/:id`   | Actualiza una reserva                                                     |
| DELETE | `/reservas/:id`   | Elimina una reserva                                                       |

### Otros

| Método | Ruta     | Descripción              |
|--------|----------|--------------------------|
| GET    | `/ping`  | Healthcheck (pong)       |

---

## 📥 Ejemplos de uso

### Crear un espacio

```http
POST /espacios
Content-Type: application/json
```

```json
{
  "nombre": "Sala Brainstorming",
  "tipo": "sala_reunion",
  "capacidad": 6,
  "precio": 10000,
  "descripcion": "Sala con pizarra y post-its",
  "disponible": true
}
```

### Crear una reserva (usuario nuevo al vuelo)

El backend crea el usuario automáticamente si no existe ese email.

```http
POST /reservas
Content-Type: application/json
```

```json
{
  "espacio": "65f0a8c1b2e4d3a1c9f8b7e6",
  "nombre": "Miguel Falcón",
  "email": "miguel@email.com",
  "fecha": "2026-06-15",
  "horaInicio": "09:00",
  "horaFin": "12:00",
  "notas": "Reunión con cliente"
}
```

### Crear una reserva (usuario ya registrado)

```json
{
  "usuario": "65f0a8c1b2e4d3a1c9f8b7e6",
  "espacio": "65f0a8c1b2e4d3a1c9f8b7e7",
  "fecha": "2026-06-15",
  "horaInicio": "14:00",
  "horaFin": "16:00"
}
```

### Listar reservas (respuesta con populate)

```http
GET /reservas
```

```json
[
  {
    "id": "65f0a8c1b2e4d3a1c9f8b7e8",
    "usuario": {
      "id": "65f0a8c1b2e4d3a1c9f8b7e6",
      "nombre": "Miguel Falcón",
      "email": "miguel@email.com",
      "rol": "cliente"
    },
    "espacio": {
      "id": "65f0a8c1b2e4d3a1c9f8b7e7",
      "nombre": "Room A - Reunion room",
      "tipo": "sala_reunion",
      "capacidad": 8,
      "precio": 15000,
      "imagen": "https://...",
      "disponible": true
    },
    "fecha": "2026-06-15T00:00:00.000Z",
    "horaInicio": "09:00",
    "horaFin": "12:00",
    "estado": "pendiente",
    "notas": "Reunión con cliente",
    "createdAt": "2026-05-13T18:22:10.123Z",
    "updatedAt": "2026-05-13T18:22:10.123Z"
  }
]
```

### Errores típicos

**400 — Validación fallida**

```json
{
  "message": "Datos inválidos",
  "errores": [
    "La hora de fin debe ser posterior a la hora de inicio",
    "El email es obligatorio"
  ]
}
```

**404 — No encontrado**

```json
{ "message": "Reserva no encontrada" }
```

**409 — Email duplicado**

```json
{ "message": "Ya existe un usuario registrado con ese email" }
```

---

## ✅ Cumplimiento del Sprint 3

| Requerimiento                                        | Dónde se cumple                                              |
|------------------------------------------------------|---------------------------------------------------------------|
| Conectar MongoDB con Mongoose                        | `src/config/db.js` + `src/index.js`                           |
| Modelo Usuario                                       | `src/models/usuarioModel.js`                                  |
| Modelo Espacio                                       | `src/models/espacioModel.js`                                  |
| Modelo Reserva                                       | `src/models/reservaModel.js`                                  |
| Reserva referencia a Usuario y Espacio               | Campos `usuario` y `espacio` como `ObjectId` con `ref`        |
| `populate()`                                         | `getReservas`, `getReservaById`, `crearReserva`, `actualizarReserva` |
| Validaciones de esquema                              | `required`, `min/max`, `enum`, `match`, `unique`, hook `pre('validate')` |
| Variables de entorno                                 | `.env` + `.env.example` (PORT, MONGO_URI)                     |
| CRUD completo                                        | Espacios, Usuarios y Reservas                                 |
| Manejo de errores                                    | `errorHandler.js`, `notFound.js`, validaciones por controlador |

---

## 🧪 Probar la API

Recomendado con **Postman**, **Thunder Client** o `curl`.

```bash
# Healthcheck
curl http://localhost:3000/ping

# Listar espacios
curl http://localhost:3000/espacios

# Listar reservas con populate
curl http://localhost:3000/reservas
```

---

## 👨‍💻 Autor

Proyecto Workhub — Sprint 3 — Generation Chile / Tripleten.
