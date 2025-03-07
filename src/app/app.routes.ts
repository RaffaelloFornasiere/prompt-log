import {Routes} from '@angular/router';
import {TaskDescriptionComponent} from './features/task-description/task-description.component';
import {AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToTravels = () => redirectLoggedInTo(['/']);
export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () => import('./features/features.routes').then(m => m.routes)
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToTravels
    },
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  }
];
