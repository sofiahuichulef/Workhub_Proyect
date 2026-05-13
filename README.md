# Workhub 🏢

Sistema web de reserva de espacios de coworking. Incluye un **frontend React + Vite** y un **backend Node.js + Express + MongoDB (Mongoose)**.

---

## 🧱 Estructura del repositorio

```
Workhub_Proyect/
├── backend/          # API REST (Express + Mongoose)
│   ├── src/
│   └── README.md     # Documentación detallada del backend
├── src/              # Aplicación React (Vite)
├── public/
├── index.html
├── package.json      # Frontend
└── README.md         # Este archivo
```

---

## 🚀 Levantar el proyecto en local

Necesitás **dos terminales**: una para el backend y otra para el frontend.

### 1️⃣ Backend

```bash
cd backend
npm install
cp .env.example .env       # configurar MONGO_URI dentro
npm run seed               # opcional: poblar la BD inicial
npm run dev                # arranca en http://localhost:3000
```

Más detalles, endpoints y modelo de datos en [`backend/README.md`](./backend/README.md).

### 2️⃣ Frontend

Desde la raíz del proyecto:

```bash
npm install
npm run dev                # arranca en http://localhost:5173
```

Crear un archivo `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🆕 Cambios del Sprint 3

Esta versión del proyecto migra el backend de **almacenamiento en memoria** (arrays) a **MongoDB con Mongoose**, e incorpora:

- **Conexión a MongoDB** centralizada en `backend/src/config/db.js`.
- **Tres modelos Mongoose** con validaciones a nivel de esquema:
  - `Usuario` — email único, validación de formato, roles.
  - `Espacio` — tipos enumerados, capacidad y precio con rangos.
  - `Reserva` — referencia a `Usuario` y `Espacio`, validación de horarios.
- **Relaciones reales** entre colecciones mediante `ObjectId` + `ref`.
- **`populate()`** en las consultas de reservas para devolver los datos completos del usuario y del espacio en una sola respuesta.
- **CRUD completo** para los tres modelos.
- **Variables de entorno** (`PORT`, `MONGO_URI`) gestionadas con `dotenv` y `.env.example` versionado.
- **Script de seed** (`npm run seed`) que pobla la base con los 8 espacios del catálogo, un usuario y una reserva de ejemplo.

El frontend se mantiene **funcional y responsivo**: el backend continúa devolviendo un campo `id` (mapeado desde `_id` mediante el `toJSON` de Mongoose), por lo que el `espacioService.js` y los componentes existentes (`Spaces.jsx`, `Reserva.jsx`) siguen funcionando sin modificaciones.

---

## 🛠️ Tecnologías

**Frontend:** React 18, Vite, React Router, CSS modular.
**Backend:** Node.js (ES Modules), Express 5, MongoDB, Mongoose, express-validator, dotenv, cors.

---

## 👨‍💻 Autores

Proyecto desarrollado por el equipo de Workhub — Generation Chile / Tripleten.
