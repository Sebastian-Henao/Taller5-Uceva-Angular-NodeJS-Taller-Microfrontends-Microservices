import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

/**
 * Función principal que instancia y arranca el servidor.
 */
export function main(): Server {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
    corsOrigins: envs.CORS_ORIGINS,
  });
  server.start();
  return server;
}

/**
 * Ejecución inmediata de la función principal.
 */
main();
