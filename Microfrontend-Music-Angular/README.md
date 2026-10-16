# Sonora: microfrontend de Música

Microfrontend independiente creado con Angular CLI `20.3.14`. Presenta una biblioteca musical consumida exclusivamente desde el microservicio `Microservice-Music-NodeJS`.

El proyecto usa Angular standalone, TypeScript estricto, SCSS y Module Federation clásico de Webpack. El scaffolding sigue los pasos de [`../CREAR_MF.md`](../CREAR_MF.md).

## Arquitectura y responsabilidades

| Parte | Responsabilidad |
| --- | --- |
| `MusicPage` | Carga y presenta canciones, estados de carga/error y búsqueda local. |
| `MusicService` | Realiza la petición HTTP tipada a la API de música. |
| `MusicTrack` | Define el contrato de los datos recibidos del backend. |
| `app.routes.ts` | Muestra la biblioteca en la ruta raíz y redirige rutas desconocidas. |
| `webpack.config.js` | Expone la página como `./MusicPage` para el Host. |

### Flujo de datos

1. Al iniciar `MusicPage`, `MusicService` solicita doce canciones.
2. El microservicio genera canciones simuladas con Faker.js y responde JSON.
3. La página presenta cada canción y actualiza el estado de carga.
4. La búsqueda filtra en el cliente por título, artista, álbum y género, sin distinguir mayúsculas.

El modelo `MusicTrack` contiene `id`, `title`, `artist`, `album`, `genre`, `releasedYear` y `durationSeconds`. La duración se recibe en segundos.

## Requisitos

- Node.js y npm compatibles con Angular 20.
- Dependencias instaladas con `npm install`.
- Microservicio disponible en `http://localhost:3004`.

## Ejecutar con el Host

Desde la raíz del repositorio, inicia primero el microservicio:

```powershell
cd Microservice-Music-NodeJS
npm install
npm run dev
```

En otra terminal, inicia el remote:

```powershell
cd Microfrontend-Music-Angular
npm install
npm start
```

Finalmente, inicia `Client-Host-Angular` con `npm start` y abre `http://localhost:4200/music`.

El microfrontend se sirve en `http://localhost:4204`. Su manifiesto de federación debe estar disponible en `http://localhost:4204/remoteEntry.js`.

## API consumida

`GET http://localhost:3004/api/music/tracks/12`

El parámetro de cantidad admitido por el microservicio es un entero entre 1 y 50. Las respuestas y errores de transporte se mantienen explícitos: si el backend no está disponible, la página muestra un mensaje y permite reintentar.

## Pruebas unitarias

```bash
npm test
npm run test:coverage
```

Jest cubre el componente, el filtrado de canciones, estados de error y reintento, y el servicio HTTP (respuesta y propagación de errores). Se exige cobertura global mínima del 90 % para líneas, sentencias, funciones y ramas.

## Documentación Compodoc

```bash
npm run compodoc
```

La documentación HTML se genera en `documentation/`; abre `documentation/index.html`. El reporte de `documentation/coverage.html` debe marcar 100 % de cobertura documental y el comando falla si un símbolo o archivo incluido carece de documentación. El contenido generado se excluye de Git; el código fuente y sus comentarios JSDoc son la fuente de verdad.
