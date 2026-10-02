import { envs } from "./config/env";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

function main(): void {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}

(async () => {
    main();
})();