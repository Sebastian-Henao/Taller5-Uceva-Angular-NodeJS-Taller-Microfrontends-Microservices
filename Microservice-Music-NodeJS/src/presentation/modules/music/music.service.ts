import { faker } from '@faker-js/faker';
import { MusicTrack } from '../../../domain/interfaces/music-track.interface';

export class MusicService {
  getTracks(count: number): MusicTrack[] {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: faker.music.songName(),
      artist: faker.music.artist(),
      album: faker.music.album(),
      genre: faker.music.genre(),
      releasedYear: faker.number.int({ min: 1960, max: new Date().getFullYear() }),
      durationSeconds: faker.number.int({ min: 120, max: 360 }),
    }));
  }
}
