import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MusicTrack } from '../../interfaces/music-track.interface';
import { MusicService } from './music.service';

describe('MusicService', () => {
  let service: MusicService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MusicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('requests tracks from the music microservice', () => {
    const tracks: MusicTrack[] = [
      {
        id: 1,
        title: 'Midnight Echo',
        artist: 'The Satellites',
        album: 'Night Signals',
        genre: 'Indie',
        releasedYear: 2021,
        durationSeconds: 212,
      },
    ];

    service.getTracks(12).subscribe((result) => expect(result).toEqual(tracks));

    const request = httpMock.expectOne('http://localhost:3004/api/music/tracks/12');
    expect(request.request.method).toBe('GET');
    request.flush(tracks);
  });

  it('propagates errors from the music microservice', () => {
    let receivedStatus = 0;
    service.getTracks(12).subscribe({
      error: (error: { status: number }) => {
        receivedStatus = error.status;
      },
    });

    httpMock
      .expectOne('http://localhost:3004/api/music/tracks/12')
      .flush({ message: 'Service unavailable' }, { status: 503, statusText: 'Service Unavailable' });

    expect(receivedStatus).toBe(503);
  });
});
