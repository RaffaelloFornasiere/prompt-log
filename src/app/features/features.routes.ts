import {Routes} from '@angular/router';
import promptResolve from '../services/resolvers/prompt.resolver';
import {HistoryComponent} from './history/history.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./prompt-list/prompt-list.component').then(m => m.PromptListComponent)
  },
  {
    path: 'prompt/:promptInfo',
    children: [
      {
        path: '',
        resolve:{
          prompt: promptResolve,
        },
        loadComponent: () => import('./prompt/prompt.component').then(m => m.PromptComponent)
      },
      {
        path: 'export',
        resolve:{
          prompt: promptResolve
        },
        loadComponent: () => import('./export/export.component').then(m => m.ExportComponent)
      },
      {
        path: 'examples',
        resolve:{
          prompt: promptResolve
        },

        loadComponent: () => import('./examples/examples.component').then(m => m.ExamplesComponent)
      },
      {
        path: 'tools',
        resolve:{
          prompt: promptResolve
        },
        loadComponent: () => import('./tools/tools.component').then(m => m.ToolsComponent)
      },
      {
        path: 'task-description',
        resolve:{
          prompt: promptResolve
        },
        loadComponent: () => import('./task-description/task-description.component').then(m => m.TaskDescriptionComponent)
      },

      {
        path: '',
        outlet: 'right-sidenav',
        loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent)
      }
    ]
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },

]
