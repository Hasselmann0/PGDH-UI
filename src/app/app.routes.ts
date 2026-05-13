import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'quest', loadComponent: () => import('./features/quest/quest.component').then(m => m.QuestComponent) },
  { path: 'forge', loadComponent: () => import('./features/forge/forge.component').then(m => m.ForgeComponent) },
  { path: '', redirectTo: 'quest', pathMatch: 'full' },
  { path: '**', redirectTo: 'quest' }
];
