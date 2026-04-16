import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { Absences } from './pages/absences/absences';
import { Settings } from './pages/settings/settings';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  {
    path: 'users',
    component: Users,
    canActivate: [authGuard]
  },
  {
    path: 'absences',
    component: Absences,
    canActivate: [authGuard]
  },

  { path: 'settings', component: Settings },

  { path: '**', redirectTo: 'users' }
];