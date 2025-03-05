import {Routes} from '@angular/router';
import promptResolve from './prompt/resolve.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./prompt-list/prompt-list.component').then(m => m.PromptListComponent)
  },
  {
    path: 'prompt/:promptId',
    children: [
      {
        path: '',
        resolve:{
          prompt: promptResolve
        },
        loadComponent: () => import('./prompt/prompt.component').then(m => m.PromptComponent)
      },
      {
        path: 'export',
        loadComponent: () => import('./export/export.component').then(m => m.ExportComponent)
      },
      {
        path: 'examples',
        loadComponent: () => import('./examples/examples.component').then(m => m.ExamplesComponent)
      },
      {
        path: 'actions',
        loadComponent: () => import('./actions/actions.component').then(m => m.ActionsComponent)
      },
      {
        path: 'task-description',
        loadComponent: () => import('./task-description/task-description.component').then(m => m.TaskDescriptionComponent)
      }
    ]
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },

]
