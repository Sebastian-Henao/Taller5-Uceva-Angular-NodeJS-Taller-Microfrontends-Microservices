import { Router } from 'express';
import { MusicRoutes } from './modules/music/music.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/music', MusicRoutes.routes);
    return router;
  }
}
