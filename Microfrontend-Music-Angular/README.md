# Sonora - Microfrontend de Música

Microfrontend independiente de Angular para explorar una biblioteca de canciones generadas por el microservicio de música. Fue creado con Angular CLI `20.3.14` y configurado con Module Federation clásico de Webpack, siguiendo la guía [`../CREAR_MF.md`](../CREAR_MF.md).

## Requisitos

- Node.js y npm compatibles con Angular 20.
- Microservicio de música ejecutándose en `http://localhost:3003`.

## Ejecución independiente

Desde esta carpeta, instala dependencias y ejecuta:

```bash
npm install
npm start
```

Abre `http://localhost:4203/`. La página consume `GET http://localhost:3003/api/music/tracks/12`.

## Module Federation

El Host obtiene la página expuesta como `./MusicPage` desde `http://localhost:4203/remoteEntry.js`. Inicia este microfrontend y el Host para navegar desde `/music`.

## Pruebas y cobertura

```bash
npm test
npm run test:coverage
```

La configuración de Jest exige más del 90 % de cobertura global para líneas, sentencias, funciones y ramas.

## Documentación técnica

```bash
npm run compodoc
```

Compodoc genera la documentación en `documentation/`.
