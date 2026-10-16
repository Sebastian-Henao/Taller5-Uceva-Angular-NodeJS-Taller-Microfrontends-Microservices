import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

/**
 * Funcion principal que instancia y arranca el servidor
 */
function main(): void {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}

/**
 * Ejecucion inmediata de la funcion principal
 * 
 * @remarks
 * Se utiliza IIFE (Inmediately Invoked Function Expression)
 * para iniciar la aplicación automáticamente
 */
(async () => {
    main();
})();