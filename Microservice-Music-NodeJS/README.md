# Microservicio de Música

API REST independiente que genera canciones de muestra usando Faker.js y las entrega al microfrontend Sonora.

## Requisitos y ejecución

Se requiere Node.js. Desde esta carpeta:

```bash
npm install
npm run dev
```

El servicio inicia en `http://localhost:3003`. Se puede cambiar el puerto con la variable de entorno `PORT`.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/music/tracks/:count` | Genera entre 1 y 50 canciones con Faker.js. |
| `GET` | `/api/health` | Comprueba que el servicio esté activo. |
| `GET` | `/api/docs` | Abre la documentación Swagger/OpenAPI. |

Ejemplo:

```bash
curl http://localhost:3003/api/music/tracks/12
```

Cada canción incluye `id`, `title`, `artist`, `album`, `genre`, `releasedYear` y `durationSeconds`.

## Build de producción

```bash
npm run build
npm start
```
