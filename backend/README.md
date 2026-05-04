# Backend - README

## 📌 Descripción del proyecto
Este backend corresponde a una aplicación que permite gestionar información mediante una API REST. Proporciona endpoints para interactuar con los recursos del sistema, permitiendo operaciones como creación, lectura, actualización y eliminación de datos.

El objetivo principal del backend es servir como capa lógica que conecta el frontend con la base de datos, asegurando el manejo correcto de la información y la implementación de reglas de negocio.

---

## 🛠️ Tecnologías utilizadas
- Node.js
- Express.js
- JavaScript (ES6+)
- npm (gestor de paquetes)

---

## ⚙️ Instalación
Para instalar las dependencias del proyecto, ejecutar el siguiente comando dentro de la carpeta `backend/`:

```bash
npm install
```

---

## ▶️ Ejecución del proyecto
Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

El servidor se ejecutará normalmente en:

```
http://localhost:3000
```

---

## 📡 Endpoints de la API

| Método | Ruta | Descripción | Body requerido | Respuesta exitosa | Errores posibles |
|--------|------|------------|----------------|-------------------|------------------|
| GET | /api/resource | Obtiene todos los recursos | No | 200 OK - Lista de recursos | 500 Internal Server Error |
| GET | /api/resource/:id | Obtiene un recurso por ID | No | 200 OK - Recurso encontrado | 404 Not Found |
| POST | /api/resource | Crea un nuevo recurso | JSON con datos del recurso | 201 Created | 400 Bad Request |
| PUT | /api/resource/:id | Actualiza un recurso existente | JSON con datos actualizados | 200 OK | 400 Bad Request, 404 Not Found |
| DELETE | /api/resource/:id | Elimina un recurso | No | 200 OK | 404 Not Found |

---

## 📥 Ejemplos de Request y Response

### 🔹 GET /api/resource
**Request:**
```http
GET /api/resource
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Recurso 1",
    "description": "Descripción del recurso"
  }
]
```

---

### 🔹 GET /api/resource/:id
**Request:**
```http
GET /api/resource/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Recurso 1",
  "description": "Descripción del recurso"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Recurso no encontrado"
}
```

---

### 🔹 POST /api/resource
**Request:**
```http
POST /api/resource
Content-Type: application/json
```

```json
{
  "name": "Nuevo recurso",
  "description": "Descripción del nuevo recurso"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "name": "Nuevo recurso",
  "description": "Descripción del nuevo recurso"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Datos inválidos"
}
```

---

### 🔹 PUT /api/resource/:id
**Request:**
```http
PUT /api/resource/1
Content-Type: application/json
```

```json
{
  "name": "Recurso actualizado",
  "description": "Nueva descripción"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Recurso actualizado",
  "description": "Nueva descripción"
}
```

**Errores:**
```json
{
  "error": "Recurso no encontrado"
}
```

---

### 🔹 DELETE /api/resource/:id
**Request:**
```http
DELETE /api/resource/1
```

**Response (200 OK):**
```json
{
  "message": "Recurso eliminado correctamente"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Recurso no encontrado"
}
```

---

## ❗ Notas adicionales
- Asegúrate de tener instalado Node.js en tu sistema.
- Puedes usar herramientas como Postman o Thunder Client para probar los endpoints.
- Configura variables de entorno si el proyecto lo requiere (por ejemplo, puerto o conexión a base de datos).

---

## 👨‍💻 Autor
Proyecto desarrollado como parte de un trabajo académico.

