# Taller: Microfrontends y Microservicios con Angular y Node.js

Proyecto académico de arquitectura cliente-servidor con microfrontends Angular integrados en un Host y microservicios Node.js que exponen sus funcionalidades mediante API REST. Los módulos disponibles incluyen usuarios, productos, personajes, música y series.

El scaffolding de nuevos microfrontends debe seguir los comandos descritos en [CREAR_MF.md](./CREAR_MF.md).

## Requisitos previos

- Node.js y npm
- Angular CLI
- Git
- Visual Studio Code

Verifica Angular CLI con `ng version`.

## Instalar dependencias

Ejecuta `npm install` en cada uno de estos proyectos:

- `Client-Host-Angular`
- `Microfrontend-Users-Angular`
- `Microfrontend-Products-Angular`
- `Microfrontend-Personajes-Angular`
- `Microfrontend-Music-Angular`
- `Microfrontend-Series-Angular`
- `Microservice-Users-NodeJS`
- `Microservice-Products-NodeJS`
- `Microservice-Personajes-NodeJS`
- `Microservice-Music-NodeJS`
- `Microservice-Series-NodeJS`

## Ejecutar los proyectos

Inicia cada proyecto en una terminal independiente:

| Proyecto | Comando | Puerto |
| --- | --- | --- |
| `Microservice-Users-NodeJS` | `npm run start` | 3001 |
| `Microservice-Products-NodeJS` | `npm run start` | 3002 |
| `Microservice-Personajes-NodeJS` | `npm run start` | 3003 |
| `Microservice-Music-NodeJS` | `npm run dev` | 3004 |
| `Microservice-Series-NodeJS` | `npm run start` | 3005 |
| `Microfrontend-Users-Angular` | `npm run start` | 4201 |
| `Microfrontend-Products-Angular` | `npm run start` | 4202 |
| `Microfrontend-Personajes-Angular` | `npm run start` | 4203 |
| `Microfrontend-Music-Angular` | `npm run start` | 4204 |
| `Microfrontend-Series-Angular` | `npm run start` | 4205 |
| `Client-Host-Angular` | `npm run start` | 4200 |

## APIs y Module Federation

| Módulo | API REST / Swagger | Remote entry |
| --- | --- | --- |
| Usuarios | `http://localhost:3001/api/users/{countUsers}` · `/api/docs` | `http://localhost:4201/remoteEntry.js` |
| Productos | `http://localhost:3002/api/products/{countProducts}` · `/api/docs` | `http://localhost:4202/remoteEntry.js` |
| Personajes | `http://localhost:3003/api/personajes/{countPersonaje}` · `/api/docs` | `http://localhost:4203/remoteEntry.js` |
| Música | `http://localhost:3004/api/music/tracks/{count}` · `/api/docs` | `http://localhost:4204/remoteEntry.js` |
| Series | `http://localhost:3005/api/series` · `/api/docs` | `http://localhost:4205/remoteEntry.js` |

El Host está disponible en `http://localhost:4200`. Desde su navegación se accede a los microfrontends integrados.

## Microfront de Música

En `Microfrontend-Music-Angular`, ejecuta `npm test` para las pruebas unitarias, `npm run test:coverage` para comprobar cobertura y `npm run compodoc` para generar la documentación técnica.

El microservicio de música genera datos simulados con Faker.js y documenta su API con Swagger/OpenAPI.
