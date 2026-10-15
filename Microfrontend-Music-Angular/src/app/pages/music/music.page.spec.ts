import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MusicTrack } from '../../interfaces/music-track.interface';
import { MusicService } from '../../services/music/music.service';
import { MusicPage } from './music.page';

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
  {
    id: 2,
    title: 'Golden Hour',
    artist: 'Luna Vale',
    album: 'Soft Light',
    genre: 'Pop',
    releasedYear: 2023,
    durationSeconds: 187,
  },
];

describe('MusicPage', () => {
  let fixture: ComponentFixture<MusicPage>;
  let page: MusicPage;
  let musicService: { getTracks: jest.Mock };

  beforeEach(async () => {
    musicService = { getTracks: jest.fn().mockReturnValue(of(tracks)) };
    await TestBed.configureTestingModule({
      imports: [MusicPage],
      providers: [{ provide: MusicService, useValue: musicService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicPage);
    page = fixture.componentInstance;
  });

  it('loads the track list when initialized', () => {
    fixture.detectChanges();

    expect(musicService.getTracks).toHaveBeenCalledWith(12);
    expect(page.tracks).toEqual(tracks);
    expect(page.state).toBe('success');
  });

  it('shows loaded songs in the library', () => {
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent as string;
    expect(content).toContain('Midnight Echo');
    expect(content).toContain('The Satellites');
  });

  it('filters tracks by title, artist, album, and genre without case sensitivity', () => {
    fixture.detectChanges();

    for (const query of ['midnight', 'LUNA', 'soft light', 'indie']) {
      page.searchTerm = query;
      expect(page.filteredTracks).toHaveLength(1);
    }
    expect(page.filteredTracks[0]).toEqual(tracks[0]);
  });

  it('returns every track when the search term is empty or whitespace', () => {
    fixture.detectChanges();

    page.searchTerm = '';
    expect(page.filteredTracks).toEqual(tracks);
    page.searchTerm = '   ';
    expect(page.filteredTracks).toEqual(tracks);
  });

  it('returns an empty list when no track matches the search term', () => {
    fixture.detectChanges();

    page.searchTerm = 'not in the library';
    expect(page.filteredTracks).toEqual([]);
  });

  it('shows an empty-search result when no tracks match', () => {
    fixture.detectChanges();
    page.searchTerm = 'not in the library';
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('No encontramos canciones');
  });

  it('shows an error and allows the user to retry when loading fails', () => {
    const failure = new Error('API unavailable');
    musicService.getTracks.mockReturnValueOnce(throwError(() => failure));
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fixture.detectChanges();

    expect(page.state).toBe('error');
    expect(console.error).toHaveBeenCalledWith(
      'No se pudo cargar la biblioteca musical.',
      failure,
    );

    musicService.getTracks.mockReturnValueOnce(of(tracks));
    const retry = (fixture.nativeElement as HTMLElement).querySelector('button');
    retry?.click();
    fixture.detectChanges();

    expect(musicService.getTracks).toHaveBeenCalledTimes(2);
    expect(page.state).toBe('success');
  });
});
