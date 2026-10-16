import { Request, Response } from 'express';
import { MusicService } from './music.service';

const MAX_TRACKS_PER_REQUEST = 50;

export class MusicController {
  private readonly musicService = new MusicService();

  getTracks = (req: Request, res: Response): void => {
    const count = Number(req.params.count);
    if (!Number.isInteger(count) || count < 1 || count > MAX_TRACKS_PER_REQUEST) {
      res.status(400).json({
        message: `count debe ser un entero entre 1 y ${MAX_TRACKS_PER_REQUEST}.`,
      });
      return;
    }

    res.status(200).json(this.musicService.getTracks(count));
  };
}
