# 🎬 Microfrontend Series - Angular (Netflix UI)

Microfrontend independiente desarrollado en **Angular 20** con **Webpack Module Federation** (`@angular-architects/module-federation`) para la visualización del catálogo de series de Netflix del taller de arquitectura de software.

## 📌 Características

- **Federación de Módulos (Classic Webpack MF)**: expone `./SeriesPage` a través de `remoteEntry.js` en el puerto **4205**.
- **Consumo exclusivo de API**: consume únicamente el `series-service` (Node.js en puerto 3005) mediante `HttpClient`. La URL base está configurada en `environments/environment.ts`.
- **Tipado estricto**: sin uso de `any`, con interfaces fuertemente tipadas (`Serie`, `PaginatedResponse`, `SeriesFilters`, `State`).
- **Diseño responsive con estética Netflix**: interfaz en fondo oscuro (`#141414`), acento rojo (`#e50914`), efectos hover en tarjetas, badges de calificación, filtros por género y vista modal de detalle.
- **Componentes**:
  - `SeriesPage`: contenedor principal expuesto al Host.
  - `SeriesCardComponent`: tarjeta de serie interactiva.
  - `SeriesDetailComponent`: modal con ficha técnica completa y reparto.
  - `GenreFilterComponent`: botones de filtro rápido por género.
  - `AlertComponent`: gestión visual de estados de carga (`loading`) y error (`error`).
- **Pruebas unitarias en Jest**: cobertura superior al **90%** en branches, statements, lines y functions (100% de líneas y funciones).
- **Documentación Compodoc**: cobertura de documentación del **100%** con comentarios TSDoc/JSDoc en todas las clases, métodos e interfaces.

---

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run start
```
El microfrontend estará disponible de forma autónoma en: `http://localhost:4205`  
El archivo de federación se sirve en: `http://localhost:4205/remoteEntry.js`

### 3. Compilar para producción
```bash
npm run build
```

---

## 🧪 Pruebas Unitarias y Cobertura

Para ejecutar las pruebas unitarias y verificar el reporte de cobertura:

```bash
npm run test:coverage
```

### Reporte de Cobertura Obtenido (`coverageThreshold >= 90%`):
- **Statements**: 100%
- **Branches**: 94.73%
- **Functions**: 100%
- **Lines**: 100%

---

## 📚 Documentación con Compodoc

Para verificar la cobertura de documentación y generar el sitio estático de documentación:

```bash
npm run docs
```

Para servir la documentación interactivamente en el navegador:
```bash
npm run docs:serve
```
Disponible en: `http://localhost:8080` (o el puerto asignado por Compodoc).
