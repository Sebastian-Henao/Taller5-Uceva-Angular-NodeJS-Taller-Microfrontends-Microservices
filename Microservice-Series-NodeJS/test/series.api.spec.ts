import request from 'supertest';
import { AppRoutes } from '../src/presentation/routes';
import { Server } from '../src/presentation/server';

describe('Series API (HTTP integration via Supertest)', () => {
  const server = new Server({
    port: 0,
    publicPath: 'public',
    routes: AppRoutes.routes,
    corsOrigins: ['http://localhost:4205', 'http://localhost:4200'],
  });
  const app = server.configure();

  describe('GET /api/series', () => {
    it('debe retornar 200 y una lista paginada de series', async () => {
      const response = await request(app).get('/api/series?limit=5');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit', 5);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(5);

      const first = response.body.data[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('genre');
      expect(first).toHaveProperty('synopsis');
      expect(first).toHaveProperty('posterUrl');
      expect(first).toHaveProperty('backdropUrl');
      expect(first).toHaveProperty('rating');
    });

    it('debe filtrar correctamente por género', async () => {
      const response = await request(app).get('/api/series?genre=Comedia');
      expect(response.status).toBe(200);
      expect(
        response.body.data.every((s: { genre: string }) => s.genre === 'Comedia')
      ).toBe(true);
    });

    it('debe filtrar correctamente por búsqueda de texto', async () => {
      const all = await request(app).get('/api/series?limit=5');
      const sample = all.body.data[0].title.split(' ')[0];

      const response = await request(app).get(`/api/series?search=${sample}`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('debe responder 400 si page es menor a 1', async () => {
      const response = await request(app).get('/api/series?page=-1');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debe responder 400 si el género no existe', async () => {
      const response = await request(app).get('/api/series?genre=Telenovela');
      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Género 'Telenovela' inválido");
    });
  });

  describe('GET /api/series/genres', () => {
    it('debe retornar la lista completa de géneros', async () => {
      const response = await request(app).get('/api/series/genres');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toContain('Drama');
      expect(response.body).toContain('Ciencia ficción');
    });
  });

  describe('GET /api/series/:id', () => {
    it('debe retornar 200 con la serie solicitada', async () => {
      const response = await request(app).get('/api/series/1');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('seasons');
      expect(response.body).toHaveProperty('episodes');
    });

    it('debe retornar 404 si la serie no existe', async () => {
      const response = await request(app).get('/api/series/99999');
      expect(response.status).toBe(404);
      expect(response.body.error).toContain('no encontrada');
    });

    it('debe retornar 400 si el ID no es numérico', async () => {
      const response = await request(app).get('/api/series/invalido');
      expect(response.status).toBe(400);
      expect(response.body.error).toContain("parámetro 'id'");
    });
  });

  describe('Rutas generales y Swagger', () => {
    it('debe retornar 404 para rutas bajo /api no registradas', async () => {
      const response = await request(app).get('/api/ruta-que-no-existe');
      expect(response.status).toBe(404);
      expect(response.body.error).toContain('no encontrada');
    });

    it('debe redirigir /api-docs hacia /api/docs', async () => {
      const response = await request(app).get('/api-docs');
      expect(response.status).toBe(302);
      expect(response.header.location).toBe('/api/docs');
    });

    it('debe servir Swagger UI en /api/docs/', async () => {
      const response = await request(app).get('/api/docs/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Swagger UI');
    });

    it('debe servir el index.html público en la raíz', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Microservicio de Series');
    });
  });
});
