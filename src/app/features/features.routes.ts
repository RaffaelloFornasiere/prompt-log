import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./task-description/task-description.component').then(m => m.TaskDescriptionComponent)
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
    path: 'prompt',
    loadComponent: () => import('./prompt/prompt.component').then(m => m.PromptComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'export',
    loadComponent: () => import('./export/export.component').then(m => m.ExportComponent)
  }


]
