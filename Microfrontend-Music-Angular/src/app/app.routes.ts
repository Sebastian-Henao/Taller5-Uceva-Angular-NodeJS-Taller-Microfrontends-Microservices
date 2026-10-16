import { Routes } from '@angular/router';
import { MusicPage } from './pages/music/music.page';

export const routes: Routes = [
  { path: '', component: MusicPage },
  { path: '**', redirectTo: '' },
];
