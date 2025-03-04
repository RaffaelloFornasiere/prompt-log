import { Routes } from '@angular/router';
import {TaskDescriptionComponent} from './features/task-description/task-description.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/features.routes').then(m => m.routes)
  }
  // {
  //   path: '',
  //   loadChildren: () => import('./features/features.routes').then(m => m.routes)
  // }
];
