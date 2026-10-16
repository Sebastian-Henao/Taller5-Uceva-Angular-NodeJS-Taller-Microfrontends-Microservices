# 🎬 Microservice Series - NodeJS (Netflix Catalog)

Microservicio backend independiente desarrollado en **Node.js + Express + TypeScript** con arquitectura en capas para la gestión y consulta del catálogo de series de Netflix del taller de arquitectura de software.

## 📌 Características

- **Arquitectura en capas**: `domain/` (interfaces, errores personalizados), `config/` (variables de entorno, Swagger), `presentation/` (controladores, rutas, servicios, servidor).
- **Datos simulados con Faker.js**: catálogo consistente con semilla fija (`SERIES_SEED = 2025`).
- **Endpoints REST**: listado paginado con filtros de género y búsqueda por texto, detalle por ID y catálogo de géneros.
- **Documentación Swagger / OpenAPI 3.0**: disponible en `/api/docs` (y alias `/api-docs`).
- **Manejo de errores centralizado**: respuestas HTTP fuertemente tipadas (400, 404, 500).
- **CORS habilitado**: configurable para los microfrontends (`http://localhost:4205` y `http://localhost:4200`).
- **Pruebas unitarias e integración**: Jest + Supertest con cobertura superior al **90%** en branches, statements, lines y functions.

---

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Modo Desarrollo (con recarga automática)
```bash
npm run start
```
El servicio estará disponible en: `http://localhost:3005`

### 3. Compilar a JavaScript
```bash
npm run build
```

### 4. Modo Producción
```bash
npm run start:prod
```

---

## 📖 Documentación de la API (Swagger)

Con el servicio en ejecución, abre tu navegador en:
- **Swagger UI**: [http://localhost:3005/api/docs](http://localhost:3005/api/docs)
- **Bienvenida SPA**: [http://localhost:3005/](http://localhost:3005/)

---

## 📡 Endpoints Disponibles

| Método | Endpoint | Descripción | Parámetros |
|---|---|---|---|
| `GET` | `/api/series` | Listado paginado de series | `page` (int), `limit` (int), `genre` (string), `search` (string) |
| `GET` | `/api/series/genres` | Lista de géneros disponibles | Ninguno |
| `GET` | `/api/series/:id` | Detalle de una serie por ID | `id` (int en ruta) |

---

## 🧪 Pruebas Unitarias y Cobertura

Para ejecutar las pruebas y verificar el reporte de cobertura:

```bash
npm run test:coverage
```

### Umbral de Cobertura Configurado (`coverageThreshold >= 90%`):
- **Statements**: > 98%
- **Branches**: > 97%
- **Functions**: > 97%
- **Lines**: > 98%
