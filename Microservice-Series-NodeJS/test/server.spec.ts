import { Router } from 'express';
import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';

describe('Server & Envs', () => {
  it('debe validar la configuración de variables de entorno', () => {
    expect(envs.PORT).toBeDefined();
    expect(typeof envs.PORT).toBe('number');
    expect(envs.PUBLIC_PATH).toBeDefined();
    expect(Array.isArray(envs.CORS_ORIGINS)).toBe(true);
  });

  it('debe iniciar y cerrar correctamente el servidor HTTP', async () => {
    const dummyRouter = Router();
    dummyRouter.get('/ping', (_req, res) => {
      res.send('pong');
    });

    const server = new Server({
      port: 0,
      publicPath: 'public',
      routes: dummyRouter,
      corsOrigins: ['*'],
    });

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await new Promise<void>((resolve, reject) => {
      const httpServer = server.start(() => {
        try {
          expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining('Microservice Series Running')
          );
          httpServer.close((err) => (err ? reject(err) : resolve()));
        } catch (e) {
          httpServer.close();
          reject(e);
        }
      });
    });

    logSpy.mockRestore();
  });
});
